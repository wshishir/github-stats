import type { GithubUser } from "../types/github"

const HISTORY_KEY = "github-search-history"
const MAX_HISTORY_ITEMS = 10

export const saveToHistory = (user: GithubUser): void => {
  try {
    // Get existing history
    const history = getSearchHistory()

    // Add timestamp if not present
    const userWithTimestamp = {
      ...user,
      searched_at: user.searched_at || new Date().toISOString(),
    }

    // Remove this user if already in history (to avoid duplicates)
    const filteredHistory = history.filter((item) => item.id !== user.id)

    // Add user to the beginning of the array
    const newHistory = [userWithTimestamp, ...filteredHistory]

    // Limit history size
    const limitedHistory = newHistory.slice(0, MAX_HISTORY_ITEMS)

    // Save to localStorage
    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory))
  } catch (error) {
    console.error("Error saving to history:", error)
  }
}

export const getSearchHistory = (): GithubUser[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY)
    return historyJson ? JSON.parse(historyJson) : []
  } catch (error) {
    console.error("Error getting search history:", error)
    return []
  }
}

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch (error) {
    console.error("Error clearing history:", error)
  }
}

