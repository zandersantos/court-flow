import prisma from "@/lib/prisma"

export default async function GameScore() {
  const now = new Date()

  const game = await prisma.game.findFirst({
    where: {
      postseason: true,
      season: 2025,
      datetime: {
        gte: new Date(now.getTime() - 1000 * 60 * 60 * 24)
      },
    },
    orderBy: { datetime: "asc" },
    include: {
      homeTeam: true,
      visitorTeam: true,
    },
  })

  if (!game)
  {
    return (
      <p className="text-gray-500">No game today.</p>
    )
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest">
        NBA Finals
      </p>
      <div className="flex items-center gap-12">
        <div className="text-center">
          <p className="text-2xl font-bold">{game.homeTeam.fullName}</p>
          <p className="text-7xl font-black mt-2">
            {game.homeTeamScore ?? "-"}
          </p>
        </div>
        <p className="text-3xl font-light text-gray-400">vs</p>
        <div className="text-center">
          <p className="text-2xl font-bold">{game.visitorTeam.fullName}</p>
          <p className="text-7xl font-black mt-2">
            {game.visitorTeamScore ?? "-"}
          </p>
        </div>
      </div>
      <p className="text-gray-500 mt-6">
        {game.status === "Final"
          ? "Final"
          : new Date(game.datetime!).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      </p>
    </div>
  )
}