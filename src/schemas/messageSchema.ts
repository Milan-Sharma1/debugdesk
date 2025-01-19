import { z } from "zod";

export const messageValidation = z.object({
    username: z.string().nullable(),
    userid: z.string().nullable(),
    content: z
        .string()
        .min(2, "Message should me min 2 char long")
        .max(15000, "Msg is too large"),
    sentTo: z.string().min(1),
});
