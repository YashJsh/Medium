import z from "zod";

export const signUpInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
})

export type SignUpInput = z.infer<typeof signUpInput>

export const createBlog = z.object({
    title : z.string(),
    content : z.string()
})

export type CeateBlog  = z.infer<typeof createBlog>

export const updateBlog = z.object({
    title : z.string(),
    content : z.string(),
    id : z.number()
})

export type UpdateBlog  = z.infer<typeof updateBlog>