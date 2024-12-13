import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(3, "name must be 3 letter minimum")
        .max(15, "Name must no longer than 15 chars"),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z
        .string()
        .min(8, "Password must be 8 char long minimum")
        .max(50, "Password must be shorter than 50 chars"),
});
