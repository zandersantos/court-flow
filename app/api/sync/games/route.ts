import { NextResponse } from "next/server"
import { fetcher } from "@/lib/balldontlie"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    let cursor: number | undefined
    let hasMore = true
    let totalSynced = 0

    while (hasMore) {
      const url = `/games?seasons[]=2025&postseason=true&per_page=100${
        cursor ? `&cursor=${cursor}` : ""
      }`

      const data = await fetcher(url)

      for (const game of data.data) {
        const gameData = {
          date: new Date(game.date),
          datetime: game.datetime ? new Date(game.datetime) : null,
          season: game.season,
          status: game.status,
          time: game.time,
          postseason: game.postseason,
          postponed: game.postponed,

          homeTeamScore: game.home_team_score,
          visitorTeamScore: game.visitor_team_score,

          homeQ1: game.home_q1,
          homeQ2: game.home_q2,
          homeQ3: game.home_q3,
          homeQ4: game.home_q4,
          homeOt1: game.home_ot1,
          homeOt2: game.home_ot2,
          homeOt3: game.home_ot3,

          visitorQ1: game.visitor_q1,
          visitorQ2: game.visitor_q2,
          visitorQ3: game.visitor_q3,
          visitorQ4: game.visitor_q4,
          visitorOt1: game.visitor_ot1,
          visitorOt2: game.visitor_ot2,
          visitorOt3: game.visitor_ot3,

          homeTimeoutsRemaining: game.home_timeouts_remaining,
          visitorTimeoutsRemaining: game.visitor_timeouts_remaining,
          homeInBonus: game.home_in_bonus,
          visitorInBonus: game.visitor_in_bonus,

          homeTeamId: game.home_team.id,
          visitorTeamId: game.visitor_team.id,
        }

        await prisma.game.upsert({
          where: { id: game.id },
          update: gameData,
          create: {
            id: game.id,
            ...gameData,
          },
        })

        totalSynced++
      }

      cursor = data.meta?.next_cursor ?? undefined
      hasMore = Boolean(data.meta?.next_cursor)
    }

    return NextResponse.json({ success: true, count: totalSynced })
  } catch (error) {
    console.error("Games Syncing Error:", error)
    return NextResponse.json(
      { error: "Games Syncing failed" },
      { status: 500 }
    )
  }
}