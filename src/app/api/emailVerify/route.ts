import { NextRequest, NextResponse } from "next/server";
import { account } from "@/models/client/config";

export async function PUT(request: NextRequest) {
    const { userId, secret } = await request.json();
    try {
        const result = await account.updateVerification(
            userId, // userId
            secret // secret
        );
        if (!result) {
            NextResponse.json({ success: false }, { status: 500 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, error: error },
            { status: 500 }
        );
    }
}
