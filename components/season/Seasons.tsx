"use client"

import { useState, useMemo } from "react"

type Team = {
  id: number
  fullName: string
  abbreviation: string
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
  winnerName: string | null
}

const gamesPerPage = 20

const months = [
  "All", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"
]

const gameTypes = ["All", "Regular Season", "Playoffs"]

interface SeasonsProps {
  games: Game[]
}

export default function Seasons({ games }: SeasonsProps) {
  const [selectedMonth, setSelectedMonth] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return games.filter((game) => {
      const month = new Date(game.date).toLocaleDateString("en-US", { month: "short" })
      const matchesMonth = selectedMonth === "All" || month === selectedMonth
      const matchesType =
        selectedType === "All" ||
        (selectedType === "Playoffs" && game.postseason) ||
        (selectedType === "Regular Season" && !game.postseason)
      return matchesMonth && matchesType
    })
  }, [games, selectedMonth, selectedType])

  const totalPages = (filtered.length + gamesPerPage - 1) / gamesPerPage | 0
  const paginated = filtered.slice((page - 1) * gamesPerPage, page * gamesPerPage)

  const handleFilter = (type: "month" | "gameType", value: string) => {
    setPage(1)
    if (type === "month") {
      setSelectedMonth(value)
    }
    else {
      setSelectedType(value)
    }
  }

  return (
    <div className="px-8 py-12 bg-black text-white">
      <div className="mb-10">
        <p className="text-2xl text-yellow-400 uppercase tracking-[0.3em] mb-2">
          CourtFlow
        </p>
      </div>
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-6">
        2025-26 NBA Season
      </h1>
      <div className="flex flex-col gap-4">
        <div>
          {paginated.map((game) => (
            <div key ={game.id}>
              <span>
                {new Date(game.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric"
                })}
              </span>
              <div>
                <span>
                  {game.homeTeam.fullName}
                </span>
                <span>
                  {game.homeTeamScore ?? "-"}
                </span>
              </div>
              <div>
                <span>
                  {game.visitorTeam.fullName}
                </span>
                <span>
                  {game.visitorTeamScore ?? "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}