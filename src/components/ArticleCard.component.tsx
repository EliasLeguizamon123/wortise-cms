/* eslint-disable @next/next/no-img-element */
"use client";
import { Article } from "@/models/Article.model"
import { trpc } from "@/trpc/client";
import { Pencil, Trash } from "lucide-react"
import { ObjectId } from "mongodb";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";

export interface Props {
    article: Article
}

export default function ArticleCard({ article }: Props) {
    const [ imageErrors, setImageErrors ] = useState<Set<string>>(new Set())

    const router = useRouter();
    const pathname = usePathname();

    const deleteArticle = trpc.deleteArticleById.useMutation()


    const handleImageError = (articleId: string | ObjectId) => {
        setImageErrors((prev) => new Set(prev).add(articleId.toString()))
    }

    const handleEditArticle = (e: React.MouseEvent, articleId: string | ObjectId) => {
        e.stopPropagation()
        router.push(`${pathname}/${articleId}/edit`)
    }

    const handleDeleteArticle = async (e: React.MouseEvent, articleId: string | ObjectId) => {
        e.stopPropagation()
        await deleteArticle.mutateAsync(String(articleId));

        toast.success("Artículo eliminado correctamente");

        window.location.reload();
    }

    const handleCardClick = (articleId: string | ObjectId) => {
        router.push(`${pathname}/${articleId}`)
    }

    return (
        <div
            onClick={() => handleCardClick(article._id)}
            className="group flex flex-col bg-white rounded-md shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 relative h-64"
        >
            {/* Hover Buttons */}
            <div className="absolute top-2 right-2 hidden group-hover:flex gap-2 z-10">
                <button
                    onClick={(e) => handleEditArticle(e, article._id)}
                    className="cursor-pointer h-8 w-8 bg-white shadow rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                    <Pencil className="h-4 w-4 text-gray-600" />
                </button>
                <button
                    onClick={(e) => handleDeleteArticle(e, article._id)}
                    className="cursor-pointer h-8 w-8 bg-white shadow rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-200"
                >
                    <Trash className="h-4 w-4 text-red-600" />
                </button>
            </div>

            {/* Cover Image - 90% height */}
            <div className="flex-1 relative" style={{ height: "90%" }}>
                {!imageErrors.has(article._id.toString()) && article.coverImageUrl ? (
                    <img
                        src={article.coverImageUrl || "/placeholder.svg"}
                        alt={article.title}
                        width={500}
                        height={400}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg"
                            handleImageError(article._id)
                        }}
                    />
                ) : (
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                )}
            </div>

            <div className="px-2" style={{ height: "15%" }}>
                <h3 className="text-base font-semibold text-gray-900 truncate">{article.title}</h3>
            </div>
        </div>
    )
}