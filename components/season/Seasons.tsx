import prisma from "@/lib/prisma"
import RefreshButton from "../ui/RefreshButton"

const games = await prisma.game.findMany({
  where: {
    season:{
      in: [2025]
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
    <div className="px-8 py-12 bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">
        2025-26 NBA Season
      </h1>
      <div className="flex flex-col gap-4">
        {gamesWithResult.map((game) => (
          <div key={game.id} className="bg-gray-800 border p-4 rounded-lg">
            <div className="text-sm text-gray-300 font-bold uppercase tracking-widest mb-4">
              {new Date(game.date).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric"
                }
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-lg font-semibold ${game.winnerName === game.homeTeam.fullName ? "text-yellow-400" : "text-white"}`}>
                {game.homeTeam.fullName}
              </span>
              <span className={`text-2xl font-semibold ${game.winnerName === game.homeTeam.fullName ? "text-yellow-400" : "text-white"}`}>
                {game.homeTeamScore ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-semibold ${game.winnerName === game.visitorTeam.fullName ? "text-yellow-400" : "text-white"}`}>
                {game.visitorTeam.fullName}
              </span>
              <span className={`text-2xl font-semibold ${game.winnerName === game.visitorTeam.fullName ? "text-yellow-400" : "text-white"}`}>
                {game.visitorTeamScore ?? "-"}
              </span>
            </div>
            {game.homeTeamScore !== null &&
              game.visitorTeamScore !== null && (
              <div className="text-xs font-bold text-yellow-400 mt-3 mb-2 uppercase tracking-widest">
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