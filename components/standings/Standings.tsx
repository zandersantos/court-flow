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
          <div>
            <p className="text-4xl text-yellow-500 uppercase tracking-widest font-bold mb-8">
              CourtFlow
            </p>

            <h1 className="text-2xl font-black uppercase mt-4 tracking-widest">
              2025-2026 NBA Season
            </h1>
          </div>

          <div className= "flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex justify-center items-center uppercase tracking-widest gap-2 px-8 py-3 border border-black font-bold bg-yellow-400 text-black text-md rounded-full transition-all duration-200 hover:bg-yellow-400/10 hover:border-yellow-400 hover:text-yellow-400"
            >
              Home
            </Link>

            <Link
              href="/seasons"
              className="inline-flex justify-center items-center uppercase tracking-widest gap-2 px-8 py-3 border border-black font-bold bg-yellow-400 text-black text-md rounded-full transition-all duration-200 hover:bg-yellow-400/10 hover:border-yellow-400 hover:text-yellow-400"
            >
              All Games
            </Link>
          </div>
        </div>
      </div>

      <div className= "rounded-2xl border border-gray-100 overflow-hidden">
        <table className= "w-full text-sm">
          <thead>
            <tr className= "bg-gray-100 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-lg font-semibold text-gray-400 uppercase tracking-widest w-8">#</th>
              <th className="text-left px-5 py-3 text-lg font-semibold text-gray-400 uppercase tracking-widest">Team</th>
              <th className="text-left px-5 py-3 text-lg font-semibold text-gray-400 uppercase tracking-widest">Conference</th>
              <th className="text-center px-5 py-3 text-lg font-semibold text-gray-400 uppercase tracking-widest">W</th>
              <th className="text-center px-5 py-3 text-lg font-semibold text-gray-400 uppercase tracking-widest">L</th>
            </tr>
          </thead>
          <tbody>
            {sortedStandings.map((standing, index) => {
              return (
                <tr key={standing.team.id} className= "border-b border-gray-100 last:border-0 hover:bg-gray-100 transition-colors">
                  <td className= "px-5 py-3.5 text-gray-400 font-semibold text-lg">
                    {index + 1}
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-6">
                      <span className="text-md font-bold px-2 py-0.5 w-12 text-center rounded bg-yellow-400/10 text-yellow-500">
                        {standing.team.abbreviation}
                      </span>

                      <span className="font-semibold text-lg text-black">
                        {standing.team.fullName}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-gray-400 text-lg">
                    {standing.team.conference}
                  </td>

                  <td className="px-5 py-3.5 text-center text-lg font-black text-black">
                    {standing.wins}
                  </td>

                  <td className="px-5 py-3.5 text-center text-lg font-semibold text-gray-400">
                    {standing.losses}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

}