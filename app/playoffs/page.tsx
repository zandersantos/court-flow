import prisma from "@/lib/prisma"

export default async function PlayoffsPage() {
  const games = await prisma.game.findMany({
    where: {
      postseason: true, season: 2025
    },
    orderBy: {
      date: "asc"
    },
    include: {
      homeTeam: true,
      visitorTeam: true,
    },
  })

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">2025-26 NBA Playoffs</h1>
      <div className="flex flex-col gap-4">
        {games.map((game) => (
          <div key={game.id} className="border p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-2">
              {new Date(game.date).toLocaleDateString()} — {game.status}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">{game.homeTeam.fullName}</span>
              <span className="text-xl font-bold">
                {game.homeTeamScore ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">{game.visitorTeam.fullName}</span>
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