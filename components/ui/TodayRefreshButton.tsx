"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TodayRefreshButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)
    await fetch("/api/sync/games/refresh")
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="text-sm text-gray-500 underline disabled:opacity-50"
    >
      {loading ? "Refreshing..." : "Refresh Current Score"}
    </button>
  )
}