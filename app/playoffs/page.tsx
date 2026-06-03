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
    <main>
      <h1>2025-26 NBA Playoffs</h1>
      <div>
        {games.map((game) => (
          <div key={game.id} >
            <div>
              {new Date(game.date).toLocaleDateString()} — {game.status}
            </div>
            <div>
              <span>{game.homeTeam.fullName}</span>
              <span>
                {game.homeTeamScore ?? "-"}
              </span>
            </div>
            <div>
              <span>{game.visitorTeam.fullName}</span>
              <span>
                {game.visitorTeamScore ?? "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}