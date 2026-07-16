export default function AffiliateCTA({ headline }: { headline?: string }) {
  return (
    <div className="rounded-2xl bg-[#1e293b] border border-[#334155] p-6 my-6">
      <div className="text-center">
        <div className="text-2xl mb-3">⚖️</div>
        <h3 className="text-lg font-bold text-white mb-2">
          {headline ?? 'Get a Free Case Review'}
        </h3>
        <p className="text-sm text-slate-300 mb-4 max-w-md mx-auto leading-relaxed">
          A licensed attorney in your state will review your case for free. No obligation.
          Attorneys only get paid if you win.
        </p>
        <a
          href="#"
          className="inline-block bg-white text-[#1e293b] font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition text-sm"
        >
          → Get Free Attorney Review
        </a>
        <p className="text-xs text-slate-500 mt-3">
          This site may connect you with licensed attorneys. We may receive compensation when you connect with an attorney through this site.
        </p>
      </div>
    </div>
  )
}
