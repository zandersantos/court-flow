import prisma from "@/lib/prisma"

type SeriesData = {
  winsA: number
  winsB: number
  gameNumber: number
}

export default async function PlayoffsPage() {
  const games = await prisma.game.findMany({
    where: {
      postseason: true,
      season: 2025
    },
    orderBy: {
      date: "asc"
    },
    include: {
      homeTeam: true,
      visitorTeam: true,
    },
  })

  const seriesMap = new Map<string, SeriesData>()

  const gamesWithSeries = games.map((game) => {
    const [teamA, teamB] = [game.homeTeamId, game.visitorTeamId].sort(
      (a, b) => a - b
    )

    const seriesKey = `${teamA}-${teamB}`

    const series = seriesMap.get(seriesKey) ?? {
      winsA: 0,
      winsB: 0,
      gameNumber: 1,
    }

    const gameWithSeries = {
      ...game,
      gameNumber: series.gameNumber,
      seriesScore: `${series.winsA}-${series.winsB}`,
    }

    if (
      game.homeTeamScore !== null &&
      game.visitorTeamScore !== null
    ) {
      const winnerId =
        game.homeTeamScore > game.visitorTeamScore
          ? game.homeTeamId
          : game.visitorTeamId

      if (winnerId === teamA) {
        series.winsA++
      } else {
        series.winsB++
      }
    }

    series.gameNumber++

    seriesMap.set(seriesKey, series)

    return gameWithSeries;
  })

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        2025-26 NBA Playoffs
      </h1>
      <div className="flex flex-col gap-4">
        {gamesWithSeries.map((game) => (
          <div key={game.id} className="border p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">
              {new Date(game.date).toLocaleDateString()} — {game.status}
            </div>

            <div className="text-sm font-medium mb-2">
              Game {game.gameNumber}: Series {game.seriesScore}
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">
                {game.homeTeam.fullName}
              </span>
              <span className="text-xl font-bold">
                {game.homeTeamScore ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {game.visitorTeam.fullName}
              </span>
              <span className="text-xl font-bold">
                {game.visitorTeamScore ?? "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}