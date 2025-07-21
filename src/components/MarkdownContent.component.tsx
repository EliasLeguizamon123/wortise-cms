/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown"
import { Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function MarkdownContent({ content }: { content: string }) {
    const components: Components = {
        p: ({ children }) => <p className="mb-4 text-gray-800">{children}</p>,
        h1: ({ children }) => <h1 className="mt-8 mb-4 text-3xl font-semibold text-gray-900">{children}</h1>,
        h2: ({ children }) => <h2 className="mt-6 mb-3 text-2xl font-semibold text-gray-900">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-900">{children}</h3>,
        h4: ({ children }) => <h4 className="mt-4 mb-2 text-lg font-semibold text-gray-900">{children}</h4>,
        h5: ({ children }) => <h5 className="mt-4 mb-2 text-base font-semibold text-gray-900">{children}</h5>,
        h6: ({ children }) => <h6 className="mt-4 mb-2 text-sm font-semibold text-gray-900">{children}</h6>,
        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");

            if (match) {
                return (
                    <SyntaxHighlighter
                        language={match[1]}
                        style={prism}
                    >
                        {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                );
            } else {
                return (
                    <code className={className} {...props}>
                        {children}
                    </code>
                );
            }
        },
        pre: ({ children }) => <div className="mb-4">{children}</div>,
        ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-gray-800">{children}</li>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4">
                {children}
            </blockquote>
        ),
        a: ({ children, href }) => (
            <a href={href} className="text-blue-600 hover:text-blue-800 underline">
                {children}
            </a>
        ),
        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
    }

    return (
        <div className="prose prose-gray max-w-none">
            <ReactMarkdown components={components}>
                {content}
            </ReactMarkdown>
        </div>
    )
}
