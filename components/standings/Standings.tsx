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
    <p>Standings</p>
  )

}