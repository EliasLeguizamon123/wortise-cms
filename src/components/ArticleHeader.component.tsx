import { useState } from "react"
import { Article } from "@/models/Article.model"

export default function ArticleHeader({ article }: { article: Article }) {
    const [ imageError, setImageError ] = useState(false)

    return (
        <div className="relative w-full h-64 sm:h-96 rounded-md shadow-md overflow-hidden mb-8">
            {!imageError && article.coverImageUrl ? (
                <img
                    src={article.coverImageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                </div>
            )}

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-white text-3xl font-bold text-center px-4">{article.title}</h1>
            </div>
        </div>
    )
}
