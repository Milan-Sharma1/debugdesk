import { databases } from "@/models/server/config";
import { db, msg } from "@/models/name";
import { Query } from "node-appwrite";
import Chat, { Message } from "./Chat";

const fetchOldMessages = async (
    id: string,
    userid?: string
): Promise<Message[]> => {
    try {
        const query = [Query.equal("sentTo", id)];
        const queryTwo = [
            Query.or([
                Query.and([
                    Query.equal("userid", userid || ""),
                    Query.equal("sentTo", id),
                ]),
                Query.and([
                    Query.equal("userid", id),
                    Query.equal("sentTo", userid || ""),
                ]),
            ]),
        ];
        const data = await databases.listDocuments(
            db,
            msg,
            userid ? queryTwo : query
        );
        return data.documents.map((message: any) => ({
            username: message.username,
            userid: message.userid,
            content: message.content,
            sentTo: message.sentTo,
        }));
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

const Page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ privateChat?: string; userid?: string }>;
}) => {
    const { id } = await params;
    const { userid } = await searchParams;
    // Fetch old messages
    const messages = await fetchOldMessages(id, userid);

    return <Chat oldMessages={messages} />;
};

export default Page;
