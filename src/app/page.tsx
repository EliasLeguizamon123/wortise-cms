"use client";

import AuthorCard from "@/components/AuthorCard.component";
import Navbar from "@/components/Navbar.component";
import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function AuthorsPage() {
    const { data: authors, isLoading } = trpc.getAuthorsWithArticlesCount.useQuery();
    const [ currentUsername, setCurrentUsername ] = useState<string | null>(null);

    useEffect(() => {
        const user = getCookie("user");

        if (typeof user === "string") {
            setCurrentUsername(JSON.parse(user).name || "Desconocido");
        }
    }, []);

    const currentAuthor = authors?.find((author) => author.name === currentUsername);
    const otherAuthors = authors?.filter((author) => author.name !== currentUsername);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar currentRoute="Dashboard" />
            <div className="max-w-4xl mx-auto pt-12">
                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="w-full h-20 rounded-md bg-gray-200 animate-pulse" />
                        ))}
                    </div>
                ) : authors && authors.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {currentAuthor && (
                            <>
                                <h2 className="text-xl font-semibold text-gray-700">Tu perfil</h2>
                                <AuthorCard key={currentAuthor.id} author={currentAuthor} />
                            </>
                        )}

                        {otherAuthors && otherAuthors.length > 0 && (
                            <>
                                {currentAuthor && (
                                    <div className="border-t border-gray-300 my-6" />
                                )}
                                <h2 className="text-xl font-semibold text-gray-700">Otros autores</h2>
                                <div className="flex flex-col gap-4">
                                    {otherAuthors.map((author) => (
                                        <AuthorCard key={author.id} author={author} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No se encontraron autores</p>
                    </div>
                )}
            </div>
        </div>
    );
}
