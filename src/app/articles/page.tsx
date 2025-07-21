"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import ArticleCard from "@/components/ArticleCard.component"
import Navbar from "@/components/Navbar.component"
import { trpc } from "@/trpc/client"

export default function MyArticlesPage() {
    const [ searchQuery, setSearchQuery ] = useState("")
    
    const { data: articles, isLoading } = trpc.getAllMyArticles.useQuery();

    const filteredArticles = articles?.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar currentRoute="Mis Artículos" />

            <div className="py-12 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 max-w-md mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search articles by title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className="bg-white rounded-md shadow-md overflow-hidden animate-pulse">
                                    <div className="bg-gray-200 h-48 w-full" />
                                    <div className="p-2">
                                        <div className="bg-gray-200 h-4 rounded w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {articles && articles.map((article) => (
                                <ArticleCard key={article._id} article={article} />
                            ))}
                        </div>
                    )}

                    {!isLoading && filteredArticles.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                {searchQuery ? "No articles found matching your search" : "No articles found"}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Limpiar búsqueda
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
