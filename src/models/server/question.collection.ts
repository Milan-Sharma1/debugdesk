import { IndexType, Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
    //create collection
    await databases.createCollection(
        db,
        questionCollection,
        questionCollection,
        [
            Permission.read("any"),
            Permission.create("users"),
            Permission.read("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
    );
    console.log("Question Collection Created");

    //creating attributes and indexes
    await Promise.all([
        databases.createStringAttribute(
            db,
            questionCollection,
            "title",
            100,
            true
        ),
        databases.createStringAttribute(
            db,
            questionCollection,
            "content",
            10000,
            true
        ),
        databases.createStringAttribute(
            db,
            questionCollection,
            "authorid",
            50,
            true
        ),
        databases.createStringAttribute(
            db,
            questionCollection,
            "tags",
            50,
            true,
            undefined,
            true
        ),
        databases.createStringAttribute(
            db,
            questionCollection,
            "attachmentid",
            50,
            false
        ),
    ]);
    console.log("Question Attributes Created");

    //create indexes
    //some error will fix it later for now we are creating keys manully in appwrite website
    // await Promise.all([
    //     databases.createIndex(
    //         db,
    //         questionCollection,
    //         "title",
    //         IndexType.Fulltext,
    //         ["title"],
    //         ["asc"]
    //     ),
    //     databases.createIndex(
    //         db,
    //         questionCollection,
    //         "content",
    //         IndexType.Fulltext,
    //         ["content"],
    //         ["asc"]
    //     ),
    // ]);
}