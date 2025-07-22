"use client"

import { useState, useEffect } from "react"
import { Article } from "@/models/Article.model"
import ArticleSkeleton from "@/components/ArticleSkeleton.component"
import NotFoundMessage from "@/components/NotFoundMessage.component"
import ArticleHeader from "@/components/ArticleHeader.component"
import ArticleMeta from "@/components/ArticleMeta.component"
import MarkdownContent from "@/components/MarkdownContent.component"

const mockArticle: Article = {
    _id: "1",
    title: "Getting Started with Next.js 14: A Complete Guide",
    content: `# Introduction

Next.js 14 brings exciting new features and improvements that make building React applications even more powerful and efficient. In this comprehensive guide, we'll explore everything you need to know to get started.

## What's New in Next.js 14

Next.js 14 introduces several groundbreaking features:

- **Turbopack**: A new bundler that's significantly faster than Webpack
- **Server Actions**: Simplified server-side logic handling
- **Improved App Router**: Better performance and developer experience
- **Enhanced Image Optimization**: Faster loading and better SEO

### Installation

Getting started with Next.js 14 is straightforward. Run the following command:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

### Project Structure

Your Next.js 14 project will have the following structure:

\`\`\`bash
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── next.config.js
└── package.json
\`\`\`

## Key Features

### 1. App Router

The App Router is now stable and provides:

- **File-based routing**: Create routes by adding files to the \`app\` directory
- **Layouts**: Shared UI components that persist across routes
- **Loading states**: Built-in loading UI support
- **Error handling**: Automatic error boundaries

### 2. Server Components

Server Components allow you to:

- Render components on the server
- Reduce client-side JavaScript bundle size
- Access backend resources directly
- Improve initial page load performance

Here's a simple example:

\`\`\`tsx
// This component runs on the server
export default async function ServerComponent() {
  const data = await fetch('https://api.example.com/data')
  const result = await data.json()
  
  return <div>{result.message}</div>
}
\`\`\`

### 3. Server Actions

Server Actions simplify form handling and server-side logic:

\`\`\`tsx
async function createPost(formData: FormData) {
  'use server'
  
  const title = formData.get('title')
  // Handle form submission
}

export default function Form() {
  return (
    <form action={createPost}>
      <input name="title" type="text" />
      <button type="submit">Submit</button>
    </form>
  )
}
\`\`\`

## Best Practices

When working with Next.js 14, keep these best practices in mind:

1. **Use Server Components by default**: Only use Client Components when you need interactivity
2. **Optimize images**: Always use the \`next/image\` component for better performance
3. **Implement proper error boundaries**: Handle errors gracefully in your application
4. **Use TypeScript**: Take advantage of type safety for better development experience

## Performance Optimization

Next.js 14 offers several performance optimizations out of the box:

- **Automatic code splitting**: Only load the JavaScript needed for each page
- **Image optimization**: Automatic image resizing and format conversion
- **Font optimization**: Automatic font loading optimization
- **Bundle analysis**: Built-in tools to analyze your bundle size

## Conclusion

Next.js 14 represents a significant step forward in React development. With its improved performance, developer experience, and new features like Server Actions and Turbopack, it's an excellent choice for building modern web applications.

Whether you're building a simple blog or a complex enterprise application, Next.js 14 provides the tools and performance you need to succeed.

Happy coding! 🚀`,
    coverImageUrl: "/placeholder.svg?height=400&width=800",
    authorId: "user1",
    createdAt: new Date("2024-01-15").toString(),
    views: 1250,
    likes: [ "user2", "user3", "user4", "user5", "user6" ],
    tags: [ "nextjs", "react", "web-development", "javascript", "tutorial" ],
}

export default function ArticlePage() {
    const [ article, setArticle ] = useState<Article | null>(null)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        const fetchArticle = async () => {
            setIsLoading(true)
            await new Promise(res => setTimeout(res, 1500))
            setArticle(mockArticle)
            setIsLoading(false)
        }

        fetchArticle()
    }, [])

    if (isLoading) return <ArticleSkeleton />
    if (!article) return <NotFoundMessage />

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-12">
            <div className="max-w-4xl mx-auto">
                <ArticleHeader article={article} />
                <ArticleMeta article={article} />
                <MarkdownContent content={article.content} />
            </div>
        </div>
    )
}