/* eslint-disable no-unused-vars */
import MDEditor from "@uiw/react-md-editor";
import TagsInput from "./TagsInput.component";
import { useRouter } from "next/navigation";

interface Props {
    title: string;
    setTitle: (title: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    coverImage: string;
    setCoverImage: (url: string) => void;
    content: string;
    setContent: (content: string) => void;
    isFormValid: boolean;
    isLoading: boolean;
    segments: string[];
}

export default function EditArticleBody({
    title,
    setTitle,
    tags,
    setTags,
    coverImage,
    setCoverImage,
    content,
    setContent,
    isFormValid,
    isLoading,
    segments,
}: Props) {
    const router = useRouter();

    return (
        <>
            <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Título del Artículo
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-colors duration-200"
                    required
                />
            </div>
        
            <TagsInput tags={tags} setTags={setTags} maxTags={5} />
        
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
            </div>
        
            <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                            Contenido del Artículo
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                    <MDEditor
                        value={content}
                        onChange={(val) => setContent(val || "")}
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
            </div>
        
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="cursor-pointer flex-1 sm:flex-none px-6 py-3 bg-black text-white rounded-md hover:bg-white hover:text-black border-2 border-black transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Guardando..." : "Guardar Cambios"}
                </button>
        
                <button
                    type="button"
                    onClick={() => router.push(`/articles/${segments[segments.length - 3]}`)}
                    className="cursor-pointer flex-1 sm:flex-none px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
                >
                    Cancelar
                </button>
            </div>
        </>
    )
}