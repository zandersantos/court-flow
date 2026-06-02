import { BalldontlieAPI } from "@balldontlie/sdk"

const api = new BalldontlieAPI({ apiKey: process.env.BALLDONTLIE_API_KEY! })

export const fetchTeams = async () => {
  const res = await api.nba.getTeams()
  return res.data
}

export const fetchActivePlayers = async (cursor?: number) => {
  const res = await api.nba.getActivePlayers({ per_page: 100, cursor })
  return res
}


export const fetcher = async (endpoint: string) => {
  const BASE_URL = "https://api.balldontlie.io/v1"
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { Authorization: process.env.BALLDONTLIE_API_KEY! },
  })
  if (!res.ok) throw new Error(`BallDontLie error: ${res.status}`)
  return res.json()
}