export interface GithubUser {
    id: number
    login: string
    name: string | null
    avatar_url: string
    html_url: string
    bio: string | null
    public_repos: number
    followers: number
    following: number
    created_at: string
    updated_at: string
    location: string | null
    searched_at?: string
  }
  
  export interface GithubRepo {
    id: number
    name: string
    full_name: string
    html_url: string
    description: string | null
    stargazers_count: number
    watchers_count: number
    forks_count: number
    language: string | null
    created_at: string
    updated_at: string
  }
  
  