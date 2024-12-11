import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";
type DatabasesType = typeof databases | null;
let dbInstance: DatabasesType = null;
export default async function getOrCreateDB() {
    try {
        if (dbInstance) {
            console.log("Already Connected");
            return dbInstance; // Return cached instance
        }
        await databases.get(db);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        try {
            await databases.create(db, db);
            console.log("database created");
            //create collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),
            ]);
            console.log("Collection created");
            console.log("Database connected");
        } catch (error) {
            console.log("Error creating databases or collection", error);
        }
    }
    dbInstance = databases; // Cache the instance
    return databases;
}
