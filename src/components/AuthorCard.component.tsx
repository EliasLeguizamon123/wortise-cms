import { AuthorDashboard } from "@/models/AuthorDashboard.model"

export interface Props {
    author: AuthorDashboard;
}

export default function AuthorCard({ author }: Props) {
    return(
        <div
            key={author.id}
            className="cursor-default w-full bg-white shadow rounded-md p-4 hover:shadow-md transition-shadow duration-200"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{author.name}</h2>
                    <p className="text-sm text-gray-500">{author.email}</p>
                </div>
                <div className="text-right">
                    <span className="text-blue-600 font-bold">{author.articlesCount} artículos publicados</span>
                </div>
            </div>
        </div>
    )
}