export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="glass flex flex-col items-center gap-4 rounded-3xl px-10 py-8">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 animate-ping rounded-full bg-pink-300/60" />
          <span className="absolute inset-2 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 shadow-[0_0_24px_rgba(255,105,180,0.6)]" />
        </div>
        <p className="font-display text-xl text-gradient">getting things pretty…</p>
      </div>
    </div>
  );
}
