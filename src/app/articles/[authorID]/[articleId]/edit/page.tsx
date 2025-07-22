"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { trpc } from "@/trpc/client"
import Navbar from "@/components/Navbar.component"
import EditArticleBody from "@/components/EditArticleBody.component"

export default function EditArticleView() {
    const router = useRouter()
    const pathname = usePathname()
    const segments = pathname?.split("/") || []
    const articleId = segments[segments.length - 2]

    const [ title, setTitle ] = useState("")
    const [ tags, setTags ] = useState<string[]>([])
    const [ content, setContent ] = useState("")
    const [ coverImage, setCoverImage ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)

    const { data: article, isLoading: isFetching } = trpc.getArticleById.useQuery(articleId!, {
        enabled: !!articleId,
    })

    const updateArticle = trpc.updateArticle.useMutation()

    useEffect(() => {
        if (article) {
            setTitle(article.title)
            setTags(article.tags || [])
            setContent(article.content)
            setCoverImage(article.coverImageUrl || "")
        }
    }, [ article ])

    const isFormValid =
        title.trim() !== "" &&
        content.trim() !== "" &&
        (coverImage === "" || /\.(jpg|jpeg|png|webp|gif)$/i.test(coverImage))

    const handleSave = async () => {
        if (!isFormValid || !articleId) return
        setIsLoading(true)

        try {
            await updateArticle.mutateAsync({
                id: articleId,
                data: {
                    title,
                    content,
                    coverImageUrl: coverImage,
                    tags,
                },
            })

            router.push(`/articles/${segments[segments.length - 3]}`)
        } catch (err) {
            console.error("Error al actualizar el artículo", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar currentRoute="Editar Artículo" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Editar Artículo</h1>
                    <p className="text-gray-600 mt-2">Modificá tu artículo y guardá los cambios</p>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSave()
                    }}
                    className="space-y-6"
                >
                    {isFetching ? (
                        <div className="space-y-6 animate-pulse">
                            <div className="h-10 bg-gray-200 rounded w-3/4" />
                            <div className="h-10 bg-gray-200 rounded w-1/2" />
                            <div className="h-10 bg-gray-200 rounded w-full" />
                            <div className="h-[400px] bg-gray-200 rounded" />
                        </div>
                    ) : (
                        <EditArticleBody
                            title={title}
                            setTitle={setTitle}
                            tags={tags}
                            setTags={setTags}
                            coverImage={coverImage}
                            setCoverImage={setCoverImage}
                            content={content}
                            setContent={setContent}
                            isFormValid={isFormValid}
                            isLoading={isLoading}
                            segments={segments}
                        />
                    )}
                </form>
            </div>
        </div>
    )
}
