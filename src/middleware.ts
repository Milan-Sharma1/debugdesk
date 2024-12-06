import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

export async function middleware(request: NextRequest) {
    await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    //the matcher below means that middleware run every path expect for the api or static path
    //for this we are using regex expression to state that middleware run every path starting with "/"
    //The regular expression /((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)
    // "/" matches any URL path except for the ones specified inside the negative lookahead (?! ...) part.
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
