import prisma from "@/lib/prisma"
import RefreshButton from "../ui/RefreshButton"

const games = await prisma.game.findMany({
    where: {
      season:{
        in: [2024, 2025]
      }
    },
    orderBy: {
      date: "asc"
    },
    include: {
      homeTeam: true,
      visitorTeam: true,
    },
  })

  const gamesWithResult = games.map((game) => {
    let winnerName: string | null = null;

    if(game.homeTeamScore !== null && game.visitorTeamScore !== null){
      winnerName = game.homeTeamScore > game.visitorTeamScore
        ? game.homeTeam.fullName : game.visitorTeam.fullName
    }
    return {
      ...game,
      winnerName,
    }
  })

const Seasons = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        2025-26 NBA Season
      </h1>
      <RefreshButton />
      <div className="flex flex-col gap-4">
        {gamesWithResult.map((game) => (
          <div key={game.id} className="border p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">
              {new Date(game.date).toLocaleDateString()}
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
            {game.homeTeamScore !== null &&
              game.visitorTeamScore !== null &&(
              <div className="text-sm font-bold text-green-600 mb-2">
                Winner {game.winnerName}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Seasons;