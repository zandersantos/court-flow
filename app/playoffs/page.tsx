import CompleteRefreshButton from "@/components/ui/CompleteRefreshButton"
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
      season: 2025,
      datetime: {
        lt: new Date(),
      },
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

    let seriesStatus = ""

    if (series.winsA === series.winsB) {
      seriesStatus = `Series tied ${series.winsA}-${series.winsB}`
    } else if (series.winsA > series.winsB) {
      const leadingTeam =
        teamA === game.homeTeamId
          ? game.homeTeam.name
          : game.visitorTeam.name

      seriesStatus = `${leadingTeam} lead ${series.winsA}-${series.winsB}`
    } else {
      const leadingTeam =
        teamB === game.homeTeamId
          ? game.homeTeam.name
          : game.visitorTeam.name

      seriesStatus = `${leadingTeam} lead ${series.winsB}-${series.winsA}`
    }

    let seriesWinnerText: string | null = null

    if (
      game.homeTeamScore !== null &&
      game.visitorTeamScore !== null
    ) {
      const winnerId =
        game.homeTeamScore > game.visitorTeamScore
          ? game.homeTeamId
          : game.visitorTeamId

      const nextWinsA = winnerId === teamA ? series.winsA + 1 : series.winsA
      const nextWinsB = winnerId === teamB ? series.winsB + 1 : series.winsB

      if (nextWinsA === 4 || nextWinsB === 4) {
        const winnerTeam =
          winnerId === game.homeTeamId
            ? game.homeTeam.fullName
            : game.visitorTeam.fullName

        const finalScore =
          nextWinsA === 4
            ? `${nextWinsA}-${nextWinsB}`
            : `${nextWinsB}-${nextWinsA}`

        seriesWinnerText = `${winnerTeam} win the series ${finalScore}`
      }
    }

    const gameWithSeries = {
      ...game,
      gameNumber: series.gameNumber,
      seriesStatus,
      seriesWinnerText
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
      <CompleteRefreshButton />
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
              Game {game.gameNumber}: {game.seriesStatus}
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
            {game.seriesWinnerText && (
              <div className="text-sm font-bold text-green-600 mb-2">
                !!! {game.seriesWinnerText}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}