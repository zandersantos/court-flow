import GameScore from "@/components/gamescore/GameScore";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <GameScore />

      <a href="/playoffs" className="text-sm underline text-gray-500 hover:text-black">
        View All Playoffs
      </a>
    </main>
  );
}
