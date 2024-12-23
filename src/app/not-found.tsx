import { Button } from "@/components/ui/button";
import { CloudOff, MoveLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen w-full flex mt-4 justify-center bg-background">
            <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
                <div className="space-y-2">
                    <CloudOff className="h-24 w-24 mx-auto text-muted-foreground animate-pulse" />
                    <h1 className="text-4xl md:text-6xl font-bold text-primary">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground max-w-[600px] md:text-lg">
                        Oops! The page you&apos;re looking for seems to have
                        vanished into the digital void. Let&apos;s get you back
                        on track.
                    </p>
                </div>
                <Link href="/" className="inline-block">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="mt-2 gap-2 hover:scale-105 transition-transform"
                    >
                        <MoveLeft className="h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
