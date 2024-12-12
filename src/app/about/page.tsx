// AboutPage.tsx
import React from "react";

const AboutPage: React.FC = () => {
    return (
        <div className="mt-10 bg-background min-h-screen flex items-center justify-center py-12 px-6">
            <div className="max-w-4xl w-full bg-background rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-white text-center mb-6">
                    Welcome to Debug Desk
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                    Debug Desk is a cutting-edge Q&A platform designed to
                    connect developers and tech enthusiasts. Whether you&apos;re
                    tackling complex coding problems, looking for innovative
                    solutions, or sharing your knowledge, Debug Desk is here to
                    empower you to collaborate, learn, and grow.
                </p>

                <h2 className="text-2xl font-semibold text-white mb-4">
                    Why Debug Desk?
                </h2>
                <ul className="space-y-4 text-gray-300">
                    <li className="flex items-center space-x-3">
                        <span className="text-green-400">✔</span>
                        <p>
                            Ask detailed questions and provide in-depth answers
                            to help the community.
                        </p>
                    </li>
                    <li className="flex items-center space-x-3">
                        <span className="text-blue-400">✔</span>
                        <p>
                            Upvote and downvote to highlight the best content
                            and help others find the most valuable insights.
                        </p>
                    </li>
                    <li className="flex items-center space-x-3">
                        <span className="text-yellow-400">✔</span>
                        <p>
                            Powerful search functionality and smart tagging to
                            easily discover relevant content.
                        </p>
                    </li>
                    <li className="flex items-center space-x-3">
                        <span className="text-purple-400">✔</span>
                        <p>
                            Personalized user profiles with reputation tracking,
                            activity history, and badges.
                        </p>
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    Built with Modern Tech
                </h2>
                <p className="text-gray-300 mb-6">
                    Debug Desk is powered by <strong>Next.js</strong> for a fast
                    and efficient full-stack experience, while{" "}
                    <strong>Appwrite</strong> ensures secure user authentication
                    and reliable database management. The platform&apos;s smooth
                    and responsive UI is built using{" "}
                    <strong>Tailwind CSS</strong> for a modern and elegant look.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
                    Join the Debug Desk Community
                </h2>
                <p className="text-gray-300 mb-6">
                    Whether you&apos;re a developer seeking help or an expert
                    ready to share your knowledge, Debug Desk is the place to
                    connect, grow, and elevate the way we collaborate in the
                    tech community. Join us today and start contributing!
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
