import Playoffs from "@/components/playoffs/Playoffs"
import RefreshButton from "@/components/ui/RefreshButton"

export default async function PlayoffsPage() {

  return (
    <main className="p-8">
      <RefreshButton />
      <Playoffs />
    </main>
  )
}