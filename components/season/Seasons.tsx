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
              href="/standings"
              className="inline-flex justify-center items-center uppercase tracking-widest gap-2 px-8 py-3 border border-black font-bold bg-yellow-400 text-black text-md rounded-full transition-all duration-200 hover:bg-yellow-400/10 hover:border-yellow-400 hover:text-yellow-400"
            >
              Standings
            </Link>
          </div>

        </div>
      </div>

      <div className="rounded-2xl p-6 mb-6 bg-gray-50 border border-gray-100">
        <p className="text-sm uppercase tracking-widest font-semibold text-black mb-4">
          Game Type
        </p>
        <div className="flex gap-3 flex-wrap">
          {gameTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleFilter("gameType", type)}
              className={`px-4 py-1.5 rounded-full text-sm border transition
                ${
                  selectedType === type
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-6 mb-6 bg-gray-50 border border-gray-100">
        <p className="text-sm uppercase tracking-widest font-semibold text-gray-400 mb-4">
          Month
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {months.map((month) => (
            <button
              key={month}
              type="button"
              onClick={() => handleFilter("month", month)}
              className={`px-3 py-1.5 rounded-full font-semibold border transition
                ${
                  selectedMonth === month
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {month}
              </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">
        {filtered.length} Total Games
      </p>

      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.length === 0 ? (
          <div className="col-span-full bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">
            <p className="text-gray-400 uppercase tracking-widest text.sm">
              No Games Found
            </p>
          </div>
        ) : (
          paginated.map((game) => (
            <div key ={game.id} className="bg-white border border-gray-100 rounded-2xl px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400 uppercase font-semibold tracking-widest">
                  {new Date(game.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric"
                  })}
                </span>

                <span className="bg-gray-100 text-gray-400 px-2.5 py-0.5 rounded-full text-sm font-black uppercase tracking-widest">
                  Final
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold px-2 py-0.5 w-12 text-center rounded bg-yellow-400/10 text-yellow-500">
                    {game.homeTeam.abbreviation}
                  </span>
                  <span className={`text-sm ${game.winnerName === game.homeTeam.fullName ? "font-bold text-black" : "font-medium text-gray-400"}`}>
                    {game.homeTeam.fullName}
                  </span>
                </div>
                <span className={`text-lg font-black ${game.winnerName === game.homeTeam.fullName ? "text-black" : "text-gray-300"}`}>
                  {game.homeTeamScore ?? "-"}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold px-2 py-0.5 w-12 text-center rounded bg-yellow-400/10 text-yellow-500">
                    {game.visitorTeam.abbreviation}
                  </span>
                  <span className={`text-sm ${game.winnerName === game.homeTeam.fullName ? "font-bold text-black" : "font-medium text-gray-400"}`}>
                    {game.visitorTeam.fullName}
                  </span>
                </div>

                <span className={`text-lg font-black ${game.winnerName === game.visitorTeam.fullName ? "text-black" : "text-gray-300"}`}>
                  {game.visitorTeamScore ?? "-"}
                </span>
              </div>
            </div>
          ))
        )}
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