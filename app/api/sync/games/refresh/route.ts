import { NextResponse } from "next/server"
import { fetcher } from "@/lib/balldontlie"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0]
    const data = await fetcher(
      `/games?seasons[]=2025&postseason=true&dates[]=${today}&per_page=100`
    )

    for (const game of data.data) {
      const liveData = {
        status: game.status,
        time: game.time,
        homeTeamScore: game.home_team_score,
        visitorTeamScore: game.visitor_team_score,
        homeQ1: game.home_q1,
        homeQ2: game.home_q2,
        homeQ3: game.home_q3,
        homeQ4: game.home_q4,
        homeOt1: game.home_ot1,
        homeOt2: game.home_ot2,
        homeOt3: game.home_ot3,
        homeTimeoutsRemaining: game.home_timeouts_remaining,
        homeInBonus: game.home_in_bonus,
        visitorQ1: game.visitor_q1,
        visitorQ2: game.visitor_q2,
        visitorQ3: game.visitor_q3,
        visitorQ4: game.visitor_q4,
        visitorOt1: game.visitor_ot1,
        visitorOt2: game.visitor_ot2,
        visitorOt3: game.visitor_ot3,
        visitorTimeoutsRemaining: game.visitor_timeouts_remaining,
        visitorInBonus: game.visitor_in_bonus,
      }

      await prisma.game.upsert({
        where: { id: game.id },
        update: liveData,
        create: {
          id: game.id,
          date: new Date(game.date),
          datetime: game.datetime ? new Date(game.datetime) : null,
          season: game.season,
          postseason: game.postseason,
          postponed: game.postponed,
          homeTeamId: game.home_team.id,
          visitorTeamId: game.visitor_team.id,
          ...liveData,
        },
      })
    }

    return NextResponse.json({ success: true, count: data.data.length })
  } catch (error) {
    console.error("Games eRfresh Error:", error)
    return NextResponse.json({ error: "Games Refresh failed" }, { status: 500 })
  }
}