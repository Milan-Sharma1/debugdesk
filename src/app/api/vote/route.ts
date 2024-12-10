import {
    answerCollection,
    db,
    questionCollection,
    voteCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        //grab the data
        const { votedById, voteStatus, type, typeId } = await request.json();
        //list documents
        const response = await databases.listDocuments(db, voteCollection, [
            Query.equal("type", type),
            Query.equal("typeId", typeId),
            Query.equal("votedById", votedById),
        ]);
        if (response.documents.length > 0) {
            //in this case we are removing the existing vote
            await databases.deleteDocument(
                db,
                voteCollection,
                response.documents[0].$id
            );
            //now decrease the reputation of the question or answer author
            const QuestionOrAnswer = await databases.getDocument(
                db,
                type === "question" ? questionCollection : answerCollection,
                typeId
            );
            const authorPrefs = await users.getPrefs<UserPrefs>(
                QuestionOrAnswer.authorId
            );
            await users.updatePrefs(QuestionOrAnswer.authorId, {
                reputation:
                    response.documents[0].voteStatus === "upvoted"
                        ? Number(authorPrefs.reputation) - 1
                        : Number(authorPrefs.reputation) + 1,
            });
        }
        //this means that previous vote does not match or vote status is changed
        if (response.documents[0]?.voteStatus !== voteStatus) {
            const doc = await databases.createDocument(
                db,
                voteCollection,
                ID.unique(),
                {
                    type,
                    typeId,
                    voteStatus,
                    votedById,
                }
            );
            //now increase the reputation
            //we have to check wheather the vote is given to question or answer
            const QuestionOrAnswer = await databases.getDocument(
                db,
                type === "question" ? questionCollection : answerCollection,
                typeId
            );
            //now getting the author id of the particular question or answer
            const authorPrefs = await users.getPrefs<UserPrefs>(
                QuestionOrAnswer.authorId
            );

            //if vote was present, this means that the vote status is changed from previous time
            if (response.documents[0]) {
                await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId, {
                    reputation:
                        //this means prev vote is "upvoted" and new value is "downvoted" so we
                        // have to decrease the reputation
                        response.documents[0].voteStatus === "upvoted"
                            ? Number(authorPrefs.reputation) - 1
                            : Number(authorPrefs.reputation) + 1,
                });
            } else {
                //this means that user is voting first time
                await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId, {
                    reputation:
                        voteStatus === "upvoted"
                            ? Number(authorPrefs.reputation) + 1
                            : Number(authorPrefs.reputation) - 1,
                });
            }
            //this is when the vote is handled
            const [upvotes, downvotes] = await Promise.all([
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", type),
                    Query.equal("typeId", typeId),
                    Query.equal("voteStatus", "upvoted"),
                    Query.equal("votedById", votedById),
                    Query.limit(1), // for optimization as we only need total
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", type),
                    Query.equal("typeId", typeId),
                    Query.equal("voteStatus", "downvoted"),
                    Query.equal("votedById", votedById),
                    Query.limit(1), // for optimization as we only need total
                ]),
            ]);

            return NextResponse.json(
                {
                    data: {
                        document: doc,
                        voteResult: upvotes.total - downvotes.total,
                    },
                    message: response.documents[0]
                        ? "Vote Status Updated"
                        : "Voted",
                },
                {
                    status: 201,
                }
            );
        }
        //This is sitution where the frontend is only fetching the votes number
        const [upvotes, downvotes] = await Promise.all([
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "upvoted"),
                Query.equal("votedById", votedById),
                Query.limit(1),
            ]),
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "downvoted"),
                Query.equal("votedById", votedById),
                Query.limit(1),
            ]),
        ]);
        return NextResponse.json(
            {
                data: {
                    document: null,
                    voteResult: upvotes.total - downvotes.total,
                },
                message: "Vote Withdrawn",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: error || "Error in voting",
            },
            {
                status: 500,
            }
        );
    }
}
