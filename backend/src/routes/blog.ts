import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

interface User {
  id: string; 
  publishDate : number;// Adjust this according to the actual structure of the user object
  // Add other properties if necessary
}

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


  
blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];
  const user = await verify(token, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", user.id as string);
    await next();
  } else {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  try {
    // Parse the request body\
    const body = await c.req.json();
    const userId = c.get("userId");
    // Initialize Prisma Client with data source
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Validate input data
    if (!body.title || !body.content) {
      c.status(400);
      return c.json({ message: "Missing required fields: title or content." });
    }

    // Create a new post in the database
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        publishDate : new Date()
      }
    });

    // Return success response with the created post ID
    return c.json({
      message: "Post created successfully",
      id: post.id,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

blogRouter.put("/", async (c) => {
  try {
    // Parse the request body
    const body = await c.req.json();

    // Initialize Prisma Client with data source
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Update the post in the database
    const post = await prisma.post.update({
      where: {
        id : body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    // Return the updated post ID
    return c.json({
      message: "Post updated successfully",
      id: post.id,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

blogRouter.get("/", async (c) => {
  try {
    // Parse the request body
    const body = await c.req.json();

    // Initialize Prisma Client with data source
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Find the post in the database
    const post = await prisma.post.findFirst({
      where: {
        id: body.id,
      },
    });

    // Check if the post exists
    if (!post) {
      c.status(404);
      return c.json({ message: "Post not found." });
    }

    // Return the found post
    return c.json({ post });
  } catch (error) {
    console.error("Error retrieving post:", error);
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});
//add pagination
blogRouter.get("/bulk", async (c) => {
  // Initialize Prisma Client with data source
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //
  try {
    const blogs = await prisma.post.findMany({
      select:{
        content : true,
        title : true,
        id : true,
        author : {
          select : {
            name : true,
          }
        },
        publishDate : true
      }
    });

    const formattedPosts = blogs.map(p => ({
      ...p,
      publishDate: p.publishDate.toISOString().split('T')[0], // Keeps only the date portion (YYYY-MM-DD)
    }));

    return c.json({
      blogs : formattedPosts,  // Rename `post` to `blogs`
    });
  } catch (err) {
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

blogRouter.get('/:id', async (c)=>{
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const blog = await prisma.post.findFirst({
      where : { 
        id : String(id)
      },
      select : {
        content : true,
        title : true,
        id : true,
        author : {
          select : {
            name : true,
          }
        },
        publishDate : true
      }
    })
    if (!blog) {
      return c.json({ error: "Blog not found" }, 404);
    }
    const responseBlog = {
      ...blog,
      publishDate: blog.publishDate.toISOString().split('T')[0]  
    };
    return c.json({
      blog : responseBlog
    });
  }catch(err){
  }
})