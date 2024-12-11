import Particles from "@/components/magicui/particles";
import QuestionForm from "@/components/QuestionForm";
import React from "react";

const page = () => {
    return (
        <div className="block pb-20 pt-32">
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
            <div className="container mx-auto px-4">
                <h1 className="mb-10 mt-4 text-2xl">Ask a public question</h1>

                <div className="flex flex-wrap md:flex-row-reverse">
                    <div className="w-full md:w-1/3"></div>
                    <div className="w-full md:w-2/3">
                        <QuestionForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
