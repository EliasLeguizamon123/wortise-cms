"use client"

import AuthorCard from "@/components/AuthorCard.component"
import Navbar from "@/components/Navbar.component"
import { useState, useEffect } from "react"

interface Author {
  id: number
  name: string
  email: string
  articleCount: number
}

// Mock data - replace with your actual API call
const mockAuthors: Author[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        articleCount: 24,
    },
    {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@example.com",
        articleCount: 18,
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        articleCount: 31,
    },
    {
        id: 4,
        name: "David Thompson",
        email: "david.thompson@example.com",
        articleCount: 12,
    },
    {
        id: 5,
        name: "Lisa Wang",
        email: "lisa.wang@example.com",
        articleCount: 27,
    },
    {
        id: 6,
        name: "James Miller",
        email: "james.miller@example.com",
        articleCount: 15,
    },
    {
        id: 6,
        name: "James Miller",
        email: "james.miller@example.com",
        articleCount: 15,
    },
    {
        id: 6,
        name: "James Miller",
        email: "james.miller@example.com",
        articleCount: 15,
    },
    {
        id: 6,
        name: "James Miller",
        email: "james.miller@example.com",
        articleCount: 15,
    },
    {
        id: 6,
        name: "James Miller",
        email: "james.miller@example.com",
        articleCount: 15,
    },
    {
        id: 6,
        name: "James Miller",
        email: "james.miller@example.com",
        articleCount: 15,
    },

]

export default function AuthorsPage() {
    const [ authors, setAuthors ] = useState<Author[]>([])
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
    // Simulate async data fetching
        const fetchAuthors = async () => {
            setIsLoading(true)

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 2000))

            setAuthors(mockAuthors)
            setIsLoading(false)
        }

        fetchAuthors()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar currentRoute="Dashboard" userName="Elias Leguizamon" />
            <div className="max-w-4xl mx-auto pt-12">

                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        {/* Loading skeletons */}
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="w-full h-20 rounded-md bg-gray-200 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {authors.map((author) => (
                            <AuthorCard key={author.id} author={author} />
                        ))}
                    </div>
                )}

                {!isLoading && authors.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No authors found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
