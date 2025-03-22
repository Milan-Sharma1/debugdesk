"use client"; 
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CanonicalTag() {
    const pathname = usePathname();
    const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;

    useEffect(() => {
        const link = document.querySelector("link[rel='canonical']");
        if (!link) {
            const newLink = document.createElement("link");
            newLink.setAttribute("rel", "canonical");
            newLink.setAttribute("href", canonicalUrl);
            document.head.appendChild(newLink);
        } else {
            link.setAttribute("href", canonicalUrl);
        }
    }, [canonicalUrl]);

    return null;
}
