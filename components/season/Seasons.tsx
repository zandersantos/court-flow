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
    <div className="px-8 py-12 bg-white text-black">
      <div className="max-w-3xl mx-auto">
        <p className="text-2xl text-yellow-500 uppercase tracking-widest mb-8 font-bold">
          CourtFlow
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex gap-2 flex-wrap">
          {gameTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleFilter("gameType", type)}
              className={`px-4 py-1 rounded-full text-sm font-semibold border transition-all duration-150
                ${
                  selectedType === type
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-black"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap pb-8">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => handleFilter("month", month)}
            className={`px-4 py-1 rounded-full text-sm font-semibold border transition-all duration-150
              ${
                selectedMonth === month
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {month}
            </button>
        ))}
      </div>

      <h1 className="text-2xl font-bold uppercase tracking-tight text-black mb-2">
        2025-26 NBA Season
      </h1>
      <div className="flex flex-col gap-2">
        {paginated.map((game) => (
          <div key ={game.id} className="border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-400 transition-all duration-150">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                {new Date(game.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric"
                })}
              </span>
            </div>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-base font-semibold ${game.winnerName === game.homeTeam.fullName ? "text-yellow-500" : "text-black"}`}>
                {game.homeTeam.fullName}
              </span>
              <span className={`text-xl font-black ${game.winnerName === game.homeTeam.fullName ? "text-yellow-500" : "text-black"}`}>
                {game.homeTeamScore ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-base font-semibold ${game.winnerName === game.visitorTeam.fullName ? "text-yellow-500" : "text-black"}`}>
                {game.visitorTeam.fullName}
              </span>
              <span className={`text-xl font-black ${game.winnerName === game.visitorTeam.fullName ? "text-yellow-500" : "text-black"}`}>
                {game.visitorTeamScore ?? "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}