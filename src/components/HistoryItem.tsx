import type { GithubUser } from "../types/github"
import { Link } from "react-router-dom"
import { ExternalLink, Calendar } from "lucide-react"

interface HistoryItemProps {
  user: GithubUser
}

const HistoryItem = ({ user }: HistoryItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <div className="flex items-center">
        <img
          src={user.avatar_url || "/placeholder.svg"}
          alt={`${user.login}'s avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex-grow">
          <h3 className="font-semibold">{user.name || user.login}</h3>
          <p className="text-sm text-gray-600">@{user.login}</p>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Searched: {formatDate(user.searched_at || user.updated_at)}</span>
        </div>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="flex space-x-4 text-sm">
          <span>{user.public_repos} repos</span>
          <span>{user.followers} followers</span>
        </div>
        <div className="flex space-x-2">
          <Link to="/" state={{ username: user.login }} className="text-blue-600 hover:text-blue-800 text-sm">
            Search Again
          </Link>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default HistoryItem

