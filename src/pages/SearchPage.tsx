"use client"

import { useState } from "react"
import SearchForm from "../components/SearchForm"
import UserProfile from "../components/UserProfile"
import type { GithubUser } from "../types/github"
import { fetchGithubUser } from "../services/githubService"
import { saveToHistory } from "../utils/historyUtils"

const SearchPage = () => {
  const [user, setUser] = useState<GithubUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (username: string) => {
    setLoading(true)
    setError(null)

    try {
      const userData = await fetchGithubUser(username)
      setUser(userData)
      saveToHistory(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch user data")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search GitHub Users</h1>
      <SearchForm onSearch={handleSearch} />

      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">{error}</div>}

      {user && !loading && <UserProfile user={user} />}
    </div>
  )
}

export default SearchPage

