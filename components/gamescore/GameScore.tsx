import prisma from "@/lib/prisma"
import Image from "next/image"

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
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/nba-dark-arena.jpg"
          alt="Arena"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      </div>
      <div className="relative z-10 text-center px-8">
        <div className="mb-12">
          <p className="text-4xl text-yellow-400 uppercase tracking-[0.3em] font-bold mb-2">
            NBA Finals
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 md:gap-4">
          <div className="text-center w-60">
            <p className="text-zinc-400 text-md uppercase tracking-widest mb-1">Home</p>
            <p className="text-white text-xl font-bold mb-4">{game.homeTeam.fullName}</p>
            <p className="text-white text-8xl font-bold leading-none">
              {game.homeTeamScore ?? "-"}
            </p>
          </div>

          <div className="text-white text-4xl font-thin">—</div>

          <div className="text-center w-60">
            <p className="text-zinc-400 text-mdd uppercase tracking-widest mb-1">Away</p>
            <p className="text-white text-xl font-bold mb-4">{game.visitorTeam.fullName}</p>
            <p className="text-white text-8xl font-bold leading-none">
              {game.visitorTeamScore ?? "-"}
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-xl uppercase mt-6">
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
    </div>
  )
}