export default function FetchingArticleSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-[400px] bg-gray-200 rounded" />
        </div>
    )
}