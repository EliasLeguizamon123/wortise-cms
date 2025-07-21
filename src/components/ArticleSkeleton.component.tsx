export default function ArticleSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="w-full h-64 sm:h-96 bg-gray-200 rounded-md shadow-md animate-pulse mb-8" />
                <div className="mb-6">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mb-2" />
                    <div className="flex gap-2 flex-wrap">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
