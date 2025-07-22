"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import MDEditor from "@uiw/react-md-editor"
import Navbar from "@/components/Navbar.component"

export default function CreateArticlePage() {
    const router = useRouter()

    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")

    const handleSubmit = async () => {
        console.log("Crear artículo:", { title, content })
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            <Navbar currentRoute="Nuevo Artículo" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Crear nuevo artículo</h1>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título del artículo"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-6" data-color-mode="light">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contenido (Markdown)</label>
                    <MDEditor value={content} onChange={(value) => setContent(value ?? "")} height={400} />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        Guardar artículo
                    </button>
                </div>
            </div>
        </div>
    )
}
