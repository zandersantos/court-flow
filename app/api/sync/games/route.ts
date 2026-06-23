import { NextResponse } from "next/server"
import { fetcher } from "@/lib/balldontlie"
import prisma from "@/lib/prisma"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function GET() {
  try {
    let cursor: number | undefined = undefined
    let hasMore = true
    let totalSynced = 0

    while (hasMore) {
      const url = `/games?seasons[]=2025&per_page=100${
        cursor ? `&cursor=${cursor}` : ""
      }`

      let data

      try {
        data = await fetcher(url)
      } catch (err) {
        const message = err instanceof Error ? err.message : ""

        if (message.includes("429")) {
          await sleep(1500)
          continue
        }

        throw err
      }

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

      const next = data.meta?.next_cursor

      if (!next || next === cursor) {
        hasMore = false
      } else {
        cursor = next
      }

      await sleep(400)
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