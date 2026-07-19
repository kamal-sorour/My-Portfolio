export default function Loading() {
  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo/Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/5" />
          {/* Spinning arc */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
          {/* Inner pulse */}
          <div className="absolute inset-3 rounded-full bg-primary/10 animate-pulse flex items-center justify-center">
            <span className="text-primary font-bold text-lg">K</span>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-1">
          <span className="text-app-muted text-sm font-medium tracking-wider">
            Loading
          </span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        </div>
      </div>
    </div>
  );
}
