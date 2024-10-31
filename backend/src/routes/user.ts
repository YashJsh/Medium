import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign , verify} from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();

userRouter.post("/signup", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name :  body.name
        }
      });
  
                                //Payload    , //SecretKey
      const token = await sign({id : user.id}, c.env.JWT_SECRET);
      console.log(token);
  
      return c.json({
        message: "User created successfully",
        JWT : token,
      });
    } catch (error) {
      console.error("Error during signup:", error);
      return c.status(500);
    }
  }); 
  
  
  
userRouter.post("signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try{
      const body = await c.req.json();
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password : body.password
        }
      });
      if (!user){
        c.status(403);
        return  c.json({message : "Invalid credentials"});
      }
      const jwt = await sign({id : user.id}, c.env.JWT_SECRET);
      return c.json({jwt});
    }
    catch (error) {
      console.log(error);
      c.status(411);
      return c.text("Invalid")
    }
  });

  