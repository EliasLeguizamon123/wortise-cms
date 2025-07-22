"use client"

import { useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import { useRouter } from "next/navigation"
import { trpc } from "@/trpc/client"
import TagsInput from "@/components/TagsInput.component"
import Navbar from "@/components/Navbar.component"

export default function ArticleForm() {
    const router = useRouter()

    const [ title, setTitle ] = useState("")
    const [ tags, setTags ] = useState<string[]>([])
    const [ content, setContent ] = useState("")
    const [ coverImage, setCoverImage ] = useState<string>("");
    const [ isLoading, setIsLoading ] = useState(false)

    const createArticle = trpc.create.useMutation();

    const isFormValid =
    title.trim() !== "" &&
    content.trim() !== "" &&
    (coverImage === "" || /\.(jpg|jpeg|png|webp|gif)$/i.test(coverImage))

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (value: string | undefined) => {
        if (value !== undefined) {
            setContent(value)
        }
    }

    const handleSaveArticle = async () => {
        if (!isFormValid) return
        setIsLoading(true)

        try {
            const result = await createArticle.mutateAsync({
                title,
                content,
                coverImageUrl: coverImage,
                tags,
                views: 0,
                likes: [],
            })

            router.push(`/articles/${result.id}`)
        } catch (err) {
            console.error("Error al crear artículo", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar currentRoute="Nuevo Artículo"/>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Crear Nuevo Artículo</h1>
                    <p className="text-gray-600 mt-2">Escribe y publica tu nuevo artículo usando Markdown</p>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSaveArticle()
                    }}
                    className="space-y-6"
                >
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Título del Artículo
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            autoFocus
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Ingresa el título de tu artículo..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-colors duration-200"
                            required
                        />
                    </div>

                    <TagsInput tags={tags} setTags={setTags} maxTags={5}/>

                    <div className="mb-6">
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                            URL de la Imagen de Portada
                        </label>
                        <input
                            type="url"
                            id="coverImage"
                            name="coverImage"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            placeholder="https://mi-sitio.com/imagen.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-colors duration-200"
                            pattern="https?://.*\.(?:png|jpg|jpeg|webp|svg)"
                            title="Debe ser una URL válida que termine en .png, .jpg, .jpeg, .webp o .svg"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Opcional. Si se especifica, debe ser una URL válida de una imagen (ej. .jpg, .png).
                        </p>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Contenido del Artículo
                        </label>
                        <div className="border border-gray-300 rounded-md overflow-hidden">
                            <MDEditor
                                value={content}
                                onChange={handleContentChange}
                                textareaProps={{
                                    placeholder: "Escribe el contenido de tu artículo usando Markdown...",
                                    style: {
                                        fontSize: 14,
                                        lineHeight: 1.5,
                                    },
                                }}
                                height={400}
                                data-color-mode="light"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Puedes usar Markdown para formatear tu contenido. Usa la pestaña &quot;Preview&quot; para ver cómo se verá.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className="cursor-pointer flex-1 sm:flex-none px-6 py-3 bg-black text-white rounded-md hover:bg-white hover:text-black border-2 border-black transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                        >
                            {isLoading ? "Guardando..." : "Guardar Artículo"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setTitle("")
                                setContent("")
                            }}
                            className="cursor-pointer flex-1 sm:flex-none px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
                        >
                            Limpiar Formulario
                        </button>
                    </div>

                    {!isFormValid && (title !== "" || content !== "") && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                            Por favor, completa tanto el título como el contenido del artículo.
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
