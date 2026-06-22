import Image from "next/image"

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
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
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-8">
        <p className="text-5xl font-black text-white uppercase tracking-widest">
          CourtFlow
        </p>
        <p className="text-white text-md uppercase tracking-[0.3em]">
          Season Tracker and Playoff Tracker
        </p>
        <a
          href="/seasons"
          className="mt-4 inline-flex items-center gap-2 px-8 py-3 border border-black bg-yellow-400 text-black text-lg rounded-full transition-all duration-200 hover:bg-yellow-400/10 hover:border-yellow-400 hover:text-yellow-400"
        >
          View All Seasons
        </a>
      </div>
    </div>
  )
}
