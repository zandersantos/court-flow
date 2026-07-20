"use client"

type Team = {
  id: number
  fullName: string
  abbreviation: string
  division: string
  conference: string
}

type Game = {
  id: number
  date: Date
  status: string | null
  postseason: boolean
  homeTeamScore: number | null
  visitorTeamScore: number | null
  homeTeam: Team
  visitorTeam: Team
}

interface StandingsProps {
  games: Game[]
}

export default function Standings({ games }: StandingsProps) {
  return (
    <p>Standings</p>
  )

}