import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { fetchTeams } from "@/lib/balldontlie"

export async function GET() {
  try {
    const teams = await fetchTeams()

    for (const team of teams) {
      const teamData = {
        name: team.name,
        fullName: team.full_name,
        abbreviation: team.abbreviation,
        city: team.city,
        conference: team.conference,
        division: team.division,
      }

      await prisma.team.upsert({
        where: { id: team.id },
        update: teamData,
        create: { id: team.id, ...teamData },
      })
    }

    return NextResponse.json({ success: true, count: teams.length })
  } catch (error) {
    console.error("Team Syncing Error:", error)
    return NextResponse.json({ error: "Team Syncing failed" }, { status: 500 })
  }
}