import type { GithubUser, GithubRepo } from "../types/github"

const GITHUB_API_URL = "https://api.github.com"

export const fetchGithubUser = async (username: string): Promise<GithubUser> => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User '${username}' not found`)
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const userData = await response.json()

    // Add timestamp for when this user was searched
    return {
      ...userData,
      searched_at: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error fetching GitHub user:", error)
    throw error
  }
}

export const fetchUserRepos = async (username: string): Promise<GithubRepo[]> => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos?per_page=100&sort=updated`)

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching user repositories:", error)
    throw error
  }
}

