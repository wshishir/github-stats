"use client"

import { useEffect, useState } from "react"
import type { GithubUser } from "../types/github"
import { fetchUserRepos } from "../services/githubService"
import { Users, Star, Code, Calendar } from "lucide-react"

interface UserProfileProps {
  user: GithubUser
}

const UserProfile = ({ user }: UserProfileProps) => {
  const [repos, setRepos] = useState<number>(0)
  const [stars, setStars] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadRepoStats = async () => {
      try {
        const userRepos = await fetchUserRepos(user.login)
        setRepos(userRepos.length)

        // Calculate total stars
        const totalStars = userRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
        setStars(totalStars)
      } catch (error) {
        console.error("Failed to fetch repos:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRepoStats()
  }, [user.login])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 p-4 flex flex-col items-center justify-center bg-gray-50">
          <img
            src={user.avatar_url || "/placeholder.svg"}
            alt={`${user.login}'s avatar`}
            className="w-40 h-40 rounded-full border-4 border-white shadow-md"
          />
          <h2 className="mt-4 text-xl font-bold">{user.name || user.login}</h2>
          <p className="text-gray-600">@{user.login}</p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 hover:underline"
          >
            View Profile
          </a>
        </div>

        <div className="md:w-2/3 p-6">
          {user.bio && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Bio</h3>
              <p className="text-gray-700">{user.bio}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-semibold">{user.followers}</span> Followers
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-semibold">{user.following}</span> Following
              </span>
            </div>
            <div className="flex items-center">
              <Code className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-semibold">{loading ? "..." : repos}</span> Repositories
              </span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-semibold">{loading ? "..." : stars}</span> Stars
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Joined on {formatDate(user.created_at)}</span>
            </div>
            {user.location && (
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-700">{user.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

