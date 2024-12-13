"use client";
import React from "react";
import { motion, MotionValue, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
    products,
    header,
}: {
    header: React.ReactNode;
    products: {
        title: string;
        link: string;
        thumbnail: string | undefined;
    }[];
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);

    // Static tilt and other values for the initial state
    const rotateX = useMotionValue(15); // Fixed tilt
    const opacity = useMotionValue(0.2); // Fixed initial opacity
    const rotateZ = useMotionValue(20); // Fixed rotation on Z-axis
    const translateY = useMotionValue(-700); // Fixed upward position
    const translateX = useMotionValue(0); // No movement on scroll
    const translateXReverse = useMotionValue(0); // No reverse movement on scroll

    return (
        <div className="relative flex h-[100vh] flex-col self-auto overflow-hidden py-40 antialiased [perspective:1000px] [transform-style:preserve-3d]">
            {header}
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="mb-20 flex flex-row space-x-20">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
                    {thirdRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const ProductCard = ({
    product,
    translate,
}: {
    product: {
        title: string;
        link: string;
        thumbnail: string | undefined;
    };
    translate: MotionValue<number>; // Ensure translate is a MotionValue
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product relative h-96 w-[30rem] flex-shrink-0"
        >
            <Link
                href={product.link}
                className="block group-hover/product:shadow-2xl"
            >
                {product.thumbnail ? (
                    <Image
                        src={product.thumbnail}
                        height={600}
                        width={600}
                        className="absolute inset-0 h-full w-full object-cover object-left-top"
                        alt={product.title}
                    />
                ) : (
                    "No image has been provided for this question."
                )}
            </Link>
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80"></div>
            <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100">
                {product.title}
            </h2>
        </motion.div>
    );
};
