'use client';

import { trpc } from '@/trpc/client';
import { useState } from 'react';

export default function ArticleTest() {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ coverImageUrl, setCoverImageUrl ] = useState('');
    const createArticle = trpc.create.useMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createArticle.mutate(
            { title, content, coverImageUrl },
            {
                onSuccess: (data) => {
                    console.log("✅ Artículo creado:", data);
                },
                onError: (error) => {
                    console.error("❌ Error al crear artículo:", error.message);
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2"
            />
            <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2"
            />
            <input
                placeholder="URL de la imagen de portada"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                Crear artículo
            </button>
        </form>
    );
}
