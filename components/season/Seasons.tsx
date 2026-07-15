"use client"

import Link from "next/link"
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

      <div className="rounded-3xl p-6 mb-10 bg-gray-50 border border-gray-200 shadow-sm">
        <p className="text-base uppercase tracking-widest font-semibold text-black mb-4">
          Game Type
        </p>
        <div className="flex gap-5 flex-wrap">
          {gameTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleFilter("gameType", type)}
              className={`px-4 py-2 rounded-full font-semibold border transition
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

      <div className="rounded-3xl p-6 mb-10 bg-gray-50 border border-gray-200 shadow-sm">
        <p className="text-base uppercase tracking-widest font-semibold text-black mb-4">
          Month
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
          {months.map((month) => (
            <button
              key={month}
              type="button"
              onClick={() => handleFilter("month", month)}
              className={`px-4 py-2 rounded-full font-semibold border transition
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
      </div>

      <p className="text-base text-gray-600 uppercase tracking-widest mb-2">
        {filtered.length} Total Games
      </p>

      <div className="flex flex-col gap-5">
        {paginated.map((game) => (
          <div key ={game.id} className="bg-gradient-to-br from-yellow-400/50 via-black to-black text-white rounded-3xl px-8 py-7 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg text-white uppercase font-semibold tracking-widest">
                {new Date(game.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric"
                })}
              </span>

              <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-base font-black">
                FINAL
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`text-xl font-semibold ${game.winnerName === game.homeTeam.fullName ? "text-yellow-400" : "text-white"}`}>
                  {game.homeTeam.abbreviation}
                </span>
                <span className={`text-3xl font-semibold ${game.winnerName === game.homeTeam.fullName ? "text-yellow-400" : "text-white"}`}>
                  {game.homeTeam.fullName}
                </span>
              </div>
              <span className={`text-3xl font-semibold bg-white rounded-xl px-5 py-2 ${game.winnerName === game.homeTeam.fullName ? "text-yellow-400" : "text-black"}`}>
                {game.homeTeamScore ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-xl font-semibold ${game.winnerName === game.visitorTeam.fullName ? "text-yellow-400" : "text-white"}`}>
                  {game.visitorTeam.abbreviation}
                </span>
                <span className={`text-3xl font-semibold ${game.winnerName === game.visitorTeam.fullName ? "text-yellow-400" : "text-white"}`}>
                  {game.visitorTeam.fullName}
                </span>
              </div>

              <span className={`text-3xl font-semibold bg-white rounded-xl px-5 py-2 ${game.winnerName === game.visitorTeam.fullName ? "text-yellow-400" : "text-black"}`}>
                {game.visitorTeamScore ?? "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-5 mt-12">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p-1))}
            disabled={page===1}
            className="px-4 py-2 text-base font-semibold border border-gray-300 rounded-full hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
          >
            - Previous
          </button>
          <span className="text-base text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p+1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-base font-semibold border border-gray-300 rounded-full hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next -
          </button>
        </div>
      )}
    </div>
  )
}