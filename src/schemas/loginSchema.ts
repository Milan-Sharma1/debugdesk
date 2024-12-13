import { z } from "zod";

export const loginValidation = z.object({
    identifier: z.string(),
    password: z
        .string()
        .min(8, "Password must be 8 char long minimum")
        .max(50, "Password must be shorter than 50 chars"),
});
