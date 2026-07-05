import Seasons from "@/components/season/Seasons"
import prisma from "@/lib/prisma"

export default async function SeasonsPage() {

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

  return (
    <Seasons games={gamesWithResult}/>
  )
}