"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CompleteRefreshButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)
    await fetch("/api/sync/games")
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="text-sm text-gray-500 underline disabled:opacity-50"
    >
      {loading ? "Refreshing..." : "Refresh All Scores"}
    </button>
  )
}