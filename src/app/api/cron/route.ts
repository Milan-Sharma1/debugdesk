//cron job to avoid web socket backend server to spin down due to inactivity
import type { NextRequest } from "next/server";
export const revalidate = 0;
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }
    try {
        const apiUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;
        if (!apiUrl)
            return Response.json({
                success: false,
                message: "URL not present",
            });
        const response = await fetch(`${apiUrl}hello`);
        const jsonResponse = await response.json();
        if (!jsonResponse.success) return Response.json({ success: false });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false });
    }
    return Response.json({ success: true });
}
