"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheckIcon, User2Icon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/store/Auth";

const formSchema = z.object({
    Name: z
        .string()
        .min(4, "Name must be 4 char")
        .max(20, "Name must be under 20 char"),
});

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateName } = useAuthStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Name: "",
        },
    });
    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const response = await updateName(data.Name);
            if (!response.success) {
                toast.error("Error");
            }
            toast.success("Name updated");
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
            <Card className="w-full max-w-md dark:bg-black border-none dark:text-neutral-200">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                        <ShieldCheckIcon className="w-6 h-6 text-primary" />
                        <CardTitle className="text-2xl dark:text-neutral-200">
                            Secure Login
                        </CardTitle>
                    </div>
                    <p className="text-center text-sm text-muted-foreground dark:text-neutral-200">
                        Name is required and must be between 4 and 20
                        characters.
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-8 "
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="Name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Enter Your Name
                                            </FormLabel>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <User2Icon className="w-5 h-5 text-muted-foreground" />
                                                    <Input
                                                        placeholder="Alex"
                                                        {...field}
                                                        className="border-white/30"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Continue"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
