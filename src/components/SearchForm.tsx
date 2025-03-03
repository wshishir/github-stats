"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

interface SearchFormProps {
  onSearch: (username: string) => void
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onSearch(username.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition flex items-center"
        >
          <Search className="h-5 w-5 mr-1" />
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchForm

