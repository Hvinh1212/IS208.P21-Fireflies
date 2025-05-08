"use client";
import Image from 'next/image';
import TagLabel from './TagLabel';

interface BlogCardProps {
    imageSrc: string;
    tag: string;
    author: string;
    date: string;
    title: string;
    excerpt: string;
    href: string;
}

export default function BlogCard({
    imageSrc,
    tag,
    author,
    date,
    title,
    excerpt,
    href,
}: BlogCardProps) {
    return (
        <div className="rounded-3xl relative shadow-md hover:shadow-lg transition ">
            <div className="relative">
                <Image
                    src={imageSrc}
                    alt={title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-[230px] sm:h-[250px] md:h-[300px] rounded-3xl"
                />
                <div className="absolute bottom-3 -left-4 z-10">
                    <TagLabel text={tag} />
                </div>
            </div>
            <div className="p-4 sm:p-6">
                <p className="text-xl md:text-sm text-gray-500">
                    {author} &nbsp;<span className="text-green-400 text-xl">●</span>&nbsp; {date}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold mt-2 mb-3">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                    {excerpt}
                </p>
                <a href={href} className="text-green-600 font-medium hover:underline text-sm">
                    Read More
                </a>
            </div>
        </div>
    );
}