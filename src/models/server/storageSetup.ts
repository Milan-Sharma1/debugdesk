import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";
let bucketExists: boolean | null = null;
export default async function getOrCreateStorage() {
    try {
        if (bucketExists !== null) {
            // Avoid repeated calls if the state is already determined
            console.log("Storage status already resolved");
            return;
        }
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage Connected");
        bucketExists = true;
    } catch (error) {
        console.log(error);
        try {
            await storage.createBucket(
                questionAttachmentBucket,
                questionAttachmentBucket,
                [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,
                undefined,
                undefined,
                ["jpg", "png", "gif", "jpeg", "webp", "heic"]
            );

            console.log("Storage Created");
            bucketExists = true;
        } catch (error) {
            console.error("Error creating storage:", error);
            bucketExists = false;
        }
    }
}
