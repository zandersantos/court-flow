"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RefreshButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)

    try {
      await fetch("/api/sync/games")
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="mt-8 inline-flex px-5 py-2 border border-yellow-400/40 bg-black/30 text-yellow-400 text-2xl rounded-full duration-200 hover:bg-yellow-400/10 hover:border-yellow-400 disabled:cursor-not-allowed"
    >
      {loading && (
        <span className="w-6 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      )}

      {loading ? "" : "⟳ "}
    </button>
  )
}