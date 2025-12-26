const AuroraBG = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <div className="absolute left-1/3 top-0 w-2/3 h-1/3 bg-gradient-to-br from-pink-300/60 via-indigo-300/40 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tr from-yellow-100/60 via-pink-200/30 to-indigo-200/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute left-0 bottom-1/4 w-1/3 h-1/3 bg-gradient-to-t from-indigo-500/20 via-purple-400/50 to-pink-300/20 rounded-full blur-2xl animate-pulse-lazy" />
      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        @keyframes pulse-lazy {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
          }
        }
        .animate-pulse-lazy {
          animation: pulse-lazy 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default AuroraBG