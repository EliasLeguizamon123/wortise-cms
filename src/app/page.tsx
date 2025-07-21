"use client";

import AuthorCard from "@/components/AuthorCard.component";
import Navbar from "@/components/Navbar.component";
import { trpc } from "@/trpc/client";

export default function AuthorsPage() {
    const { data: authors, isLoading } = trpc.getAuthorsWithArticlesCount.useQuery();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar currentRoute="Dashboard" />
            <div className="max-w-4xl mx-auto pt-12">
                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        {/* Loading skeletons */}
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="w-full h-20 rounded-md bg-gray-200 animate-pulse" />
                        ))}
                    </div>
                ) : authors && authors.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {authors.map((author) => (
                            <AuthorCard key={author.id} author={author} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No authors found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
