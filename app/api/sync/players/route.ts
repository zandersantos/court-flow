import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { fetchActivePlayers } from "@/lib/balldontlie"

export async function GET() {
  try {
    let cursor: number | undefined
    let hasMore = true
    let totalSynced = 0

    while (hasMore) {
      const { data, meta } = await fetchActivePlayers(cursor)

      for (const player of data) {
        if (!player.team) continue

        const playerData = {
          firstName: player.first_name,
          lastName: player.last_name,
          position: player.position || null,
          height: player.height || null,
          weight: player.weight || null,
          teamId: player.team.id,
        }

        await prisma.player.upsert({
          where: { id: player.id },
          update: playerData,
          create: { id: player.id, ...playerData },
        })
        totalSynced++
      }

      cursor = meta?.next_cursor ?? undefined
      hasMore = Boolean(meta?.next_cursor)
    }

    return NextResponse.json({ success: true, count: totalSynced })
  } catch (error) {
    console.error("Player Syncing Error:", error)
    return NextResponse.json({ error: "Player Syncing failed" }, { status: 500 })
  }
}