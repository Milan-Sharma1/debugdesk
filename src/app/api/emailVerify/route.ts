import { NextRequest, NextResponse } from "next/server";
import { account } from "@/models/client/config";

export async function PUT(request: NextRequest) {
    try {
        const { userId, secret } = await request.json();
        if (!userId || !secret) {
            return NextResponse.json(
                { success: false, error: "Missing required parameters" },
                { status: 400 }
            );
        }
        const result = await account.updateVerification(userId, secret);
        if (!result) {
            return NextResponse.json(
                { success: false, error: "Verification failed" },
                { status: 500 }
            );
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error in email verification:", error);
        return NextResponse.json(
            { success: false, error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
