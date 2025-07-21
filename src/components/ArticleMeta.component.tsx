import { Heart } from "lucide-react"
import { Article } from "@/models/Article.model"

export default function ArticleMeta({ article }: { article: Article }) {
    return (
        <div className="mb-8">
            <div className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                <Heart className="h-4 w-4" />
                <span>{article.likes?.length || 0} likes</span>
            </div>

            {article.tags && article.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {article.tags.map((tag, index) => (
                        <span key={index} className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}
