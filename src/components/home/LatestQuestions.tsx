import QuestionCard from "@/components/QuestionCard";
import {
    answerCollection,
    db,
    questionCollection,
    voteCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { unstable_noStore } from "next/cache";
import { Query } from "node-appwrite";
import React from "react";

const LatestQuestions = async () => {
    unstable_noStore(); // to disable catching and fetch data in real time
    const questions = await databases.listDocuments(db, questionCollection, [
        Query.limit(5),
        Query.orderDesc("$createdAt"),
    ]);
    questions.documents = await Promise.all(
        questions.documents.map(async (ques) => {
            const [author, answers, votes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId),
                databases.listDocuments(db, answerCollection, [
                    Query.equal("questionId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", "question"),
                    Query.equal("typeId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
            ]);

            return {
                ...ques,
                totalAnswers: answers.total,
                totalVotes: votes.total,
                author: {
                    $id: author.$id,
                    reputation: author.prefs.reputation,
                    name: author.name,
                },
            };
        })
    );
    return (
        <div className="space-y-6">
            <span className="text-2xl">Latest Questions</span>
            {questions &&
                questions.documents.map((question) => (
                    <QuestionCard key={question.$id} ques={question} />
                ))}
        </div>
    );
};

export default LatestQuestions;
