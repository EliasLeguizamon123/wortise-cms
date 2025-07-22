"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { trpc } from "@/trpc/client"
import { Article } from "@/models/Article.model"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"

interface ArticleMetaProps {
  article: Article
  userId?: string | null
}

export default function ArticleMeta({ article, userId }: ArticleMetaProps) {
    const [ isLiked, setIsLiked ] = useState(false)
    const [ likesCount, setLikesCount ] = useState(article.likes?.length || 0)
    
    const utils = trpc.useContext();
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        if (userId) {
            const likes = article.likes ?? []
            const isLiked = likes.includes(userId)
            setIsLiked(isLiked)
        }
    }, [ article.likes, userId ])

    const likeMutation = trpc.likeArticle.useMutation({
        onSuccess: () => {
            setIsLiked(true)
            setLikesCount((count) => count + 1)
            utils.invalidate()
        },
    })

    const unlikeMutation = trpc.unlikeArticle.useMutation({
        onSuccess: () => {
            setIsLiked(false)
            setLikesCount((count) => Math.max(count - 1, 0))
            utils.invalidate()
        },
    })

    const handleToggleLike = () => {
        if (!userId) {
            toast.error("Debes registrarte para poder interactuar con los artículos")

            return
        }

        if (isLiked) {
            unlikeMutation.mutate(article._id.toString())
        } else {
            likeMutation.mutate(article._id.toString())
        }
    }

    const handleEditArticle = () => {
        router.push(`${pathname}/edit`)
    }

    return (
        <div className="mb-8">
            <div
                className="text-sm text-gray-600 flex items-center gap-1 mb-2 cursor-pointer select-none"
                onClick={handleToggleLike}
                title={userId ? (isLiked ? "Quitar like" : "Dar like") : "Debes iniciar sesión para dar like"}
            >
                <motion.div
                    key={isLiked ? "liked" : "unliked"}
                    initial={{ scale: 1 }}
                    animate={{ scale: isLiked ? 1.3 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className={isLiked ? "text-red-500" : "text-gray-400"}
                >
                    <Heart className="h-5 w-5" />
                </motion.div>
                <span>{likesCount} {likesCount === 1 ? "like" : "likes"}</span>
                {userId === article.authorId && (
                    <Button className="cursor-pointer mx-4" onClick={handleEditArticle}>
                    Editar tu artículo
                    </Button>
                )}
            </div>

            {article.tags && article.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {article.tags.map((tag, index) => (
                        <span key={index} className="cursor-default text-sm bg-zinc-300 text-zinc-700 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            
        </div>
    )
}
