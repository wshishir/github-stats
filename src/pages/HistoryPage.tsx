"use client"

import { useState, useEffect } from "react"
import { getSearchHistory, clearHistory } from "../utils/historyUtils"
import type { GithubUser } from "../types/github"
import HistoryItem from "../components/HistoryItem"

const HistoryPage = () => {
  const [history, setHistory] = useState<GithubUser[]>([])

  useEffect(() => {
    setHistory(getSearchHistory())
  }, [])

  const handleClearHistory = () => {
    clearHistory()
    setHistory([])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Search History</h1>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600">No search history found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((user) => (
            <HistoryItem key={user.id + user.updated_at} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryPage

