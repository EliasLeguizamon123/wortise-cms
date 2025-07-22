"use client"

import { usePathname } from "next/navigation"
import { trpc } from "@/trpc/client"

import ArticleSkeleton from "@/components/ArticleSkeleton.component"
import NotFoundMessage from "@/components/NotFoundMessage.component"
import ArticleHeader from "@/components/ArticleHeader.component"
import ArticleMeta from "@/components/ArticleMeta.component"
import MarkdownContent from "@/components/MarkdownContent.component"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar.component"

export default function ArticlePage() {
    const [ showNavbar, setShowNavbar ] = useState(false)
    const [ userId, setUserId ] = useState<string | null>(null)
    
    const pathname = usePathname()
    const segments = pathname?.split("/") || []
    const articleId = segments[segments.length - 1]


    useEffect(() => {
        const cookieString = document.cookie
            .split("; ")
            .find(row => row.startsWith("user="))

        if (!cookieString) {
            setShowNavbar(false)
            setUserId(null)

            return
        }

        try {
            const cookieValue = cookieString.split("=")[1]
            const user = JSON.parse(decodeURIComponent(cookieValue))

            if (user?.id) {
                setUserId(user.id)
                setShowNavbar(true)
            } else {
                setShowNavbar(false)
                setUserId(null)
            }
        } catch (e) {
            console.error("Error al parsear cookie:", e)
            setShowNavbar(false)
            setUserId(null)
        }
    }, [])



    const { data: article, isLoading, error } = trpc.getArticleById.useQuery(articleId, {
        enabled: !!articleId,
    })

    if (isLoading) return <ArticleSkeleton />
    if (error || !article) return <NotFoundMessage />

    return (
        <>
            {showNavbar && (
                <Navbar currentRoute={`Articulo: ${articleId}`} />
            )}
            <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <ArticleHeader article={article} />
                    <ArticleMeta article={article} userId={userId} />
                    <MarkdownContent content={article.content} />
                </div>
            </div>
        </>
    )
}
