import Standings from "@/components/standings/Standings";
import prisma from "@/lib/prisma"

export default async function StandingsPage() {

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
  });


  return (
    <Standings games={games}/>
  )
}