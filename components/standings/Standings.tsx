"use client"

import Link from "next/link"

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

type TeamStanding = {
  team: Team
  wins: number
  losses: number
}

interface StandingsProps {
  games: Game[]
}

export default function Standings({ games }: StandingsProps) {
  const standings: Record<number, TeamStanding> = {}

  games.forEach((game) => {
    const {
      homeTeam,
      visitorTeam,
      homeTeamScore,
      visitorTeamScore
    } = game

    if(homeTeamScore === null || visitorTeamScore === null) {
      return
    }

    if(!standings[homeTeam.id]) {
      standings[homeTeam.id] = {
        team: homeTeam,
        wins: 0,
        losses: 0
      }
    }

    if(!standings[visitorTeam.id]) {
      standings[visitorTeam.id] = {
        team: visitorTeam,
        wins: 0,
        losses: 0
      }
    }

    if(homeTeamScore > visitorTeamScore) {
      standings[homeTeam.id].wins++
      standings[visitorTeam.id].losses++
    } else {
      standings[visitorTeam.id].wins++
      standings[homeTeam.id].losses++
    }

  })

  const sortedStandings = Object.values(standings).sort(
    (a, b) => b.wins - a.wins
  )

  return (
    <div className="min-h-screen px-8 py-12 bg-white text-black">
      <div className="relative overflow-hidden rounded-3xl text-white px-10 py-12 mb-10 bg-gradient-to-br from-yellow-400/50 via-black to-black hover:shadow-2xl transition-all shadow-xl">
        <div className="relative flex items-start justify-between">
          <p className="text-4xl text-yellow-500 uppercase tracking-widest font-bold">
            CourtFlow
          </p>

          <Link
            href="/"
            className="inline-flex items-center uppercase tracking-widest gap-2 px-8 py-3 border border-black font-bold bg-yellow-400 text-black text-md rounded-full transition-all duration-200 hover:bg-yellow-400/10 hover:border-yellow-400 hover:text-yellow-400"
          >
            Home
          </Link>
        </div>

        <h1 className="text-2xl font-black uppercase mt-4 tracking-widest">
          2025-2026 NBA Season
        </h1>
      </div>
      <div>
        {sortedStandings.map((standing) =>
          <p key={standing.team.id}>
            {standing.team.fullName} {standing.wins}-{standing.losses}
          </p>
        )}
        </div>
    </div>
  )

}