import Playoffs from "@/components/playoffs/Playoffs"
import CompleteRefreshButton from "@/components/ui/CompleteRefreshButton"

export default async function PlayoffsPage() {

  return (
    <main className="p-8">
      <CompleteRefreshButton />
      <Playoffs />
    </main>
  )
}