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
      <div className="flex items-center justify-center h-48">
        <p className="text-zinc-500 text-sm uppercase tracking-widest">No game scheduled for today.</p>
      </div>
    )
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/nba-dark-arena.jpg"
          alt="Arena"
          fill
          className="object-cover opacity-50"
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
            <p className="text-white text-4xl font-bold mb-4">{game.homeTeam.fullName}</p>
            <p className="text-white text-8xl font-bold leading-none">
              {game.homeTeamScore ?? "-"}
            </p>
          </div>

          <div className="text-white text-4xl font-thin">—</div>

          <div className="text-center w-60">
            <p className="text-zinc-400 text-mdd uppercase tracking-widest mb-1">Away</p>
            <p className="text-white text-4xl font-bold mb-4">{game.visitorTeam.fullName}</p>
            <p className="text-white text-8xl font-bold leading-none">
              {game.visitorTeamScore ?? "-"}
            </p>
          </div>
        </div>
        {(game.homeQ1 !== null || game.visitorQ1 !== null) && (
          <div className="mt-12 inline-block">
            <table className="text-xl text-white border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-white font-normal uppercase tracking-widest text-md">Team</th>
                  {["Q1", "Q2", "Q3", "Q4"].map(q => (
                    <th key={q} className="px-4 py-2 text-white font-normal uppercase tracking-widest text-md">{q}</th>
                  ))}
                  {game.homeOt1 !== null && <th className="px-4 py-2 text-white font-normal uppercase tracking-widest text-md">OT</th>}
                  <th className="px-4 py-2 text-white font-semibold uppercase tracking-widest text-md">T</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-800">
                  <td className="px-4 py-2 text-left text-white font-medium">{game.homeTeam.abbreviation}</td>
                  {[game.homeQ1, game.homeQ2, game.homeQ3, game.homeQ4].map((q, i) => (
                    <td key={i} className="px-4 py-2 text-center">{q ?? "-"}</td>
                  ))}
                  {game.homeOt1 !== null && <td className="px-4 py-2 text-center">{game.homeOt1 ?? "-"}</td>}
                  <td className="px-4 py-2 text-center text-white font-bold">{game.homeTeamScore ?? "-"}</td>
                </tr>
                <tr className="border-t border-zinc-800">
                  <td className="px-4 py-2 text-left text-white font-medium">{game.visitorTeam.abbreviation}</td>
                  {[game.visitorQ1, game.visitorQ2, game.visitorQ3, game.visitorQ4].map((q, i) => (
                    <td key={i} className="px-4 py-2 text-center">{q ?? "-"}</td>
                  ))}
                  {game.visitorOt1 !== null && <td className="px-4 py-2 text-center">{game.visitorOt1 ?? "-"}</td>}
                  <td className="px-4 py-2 text-center text-white font-bold">{game.visitorTeamScore ?? "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <p className="text-white text-4xl uppercase tracking-widest mt-6">
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