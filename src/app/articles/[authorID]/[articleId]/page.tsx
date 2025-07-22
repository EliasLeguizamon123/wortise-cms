"use client"

import { usePathname } from "next/navigation"
import { trpc } from "@/trpc/client"

import ArticleSkeleton from "@/components/ArticleSkeleton.component"
import NotFoundMessage from "@/components/NotFoundMessage.component"
import ArticleHeader from "@/components/ArticleHeader.component"
import ArticleMeta from "@/components/ArticleMeta.component"
import MarkdownContent from "@/components/MarkdownContent.component"

export default function ArticlePage() {
    const pathname = usePathname()
    const segments = pathname?.split("/") || []
    const articleId = segments[segments.length - 1]

    const { data: article, isLoading, error } = trpc.getArticleById.useQuery(articleId, {
        enabled: !!articleId,
    })

    if (isLoading) return <ArticleSkeleton />
    if (error || !article) return <NotFoundMessage />

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-12">
            <div className="max-w-4xl mx-auto">
                <ArticleHeader article={article} />
                <ArticleMeta article={article} />
                <MarkdownContent content={article.content} />
            </div>
        </div>
    )
}
