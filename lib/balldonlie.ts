const BASE_URL = "https://api.balldontlie.io/v1"
const API_KEY = process.env.BALLDONTLIE_API_KEY!

const fetcher = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: API_KEY,
    },
  })

  if (!res.ok) {
    throw new Error(`BallDontLie error: ${res.status}`)
  }

  return res.json()
}

export const fetchTeams = async () => {
  const data = await fetcher("/teams?per_page=30")
  return data.data
}

export const fetchPlayers = async (page = 1) => {
  const data = await fetcher(`/players?per_page=100&page=${page}`)
  return data
}

export const fetchStandings = async () => {
  const data = await fetcher("/standings")
  return data.data
}

export const fetchContracts = async () => {
  const data = await fetcher("/contracts?per_page=100")
  return data.data
}
