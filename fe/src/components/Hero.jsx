import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
      {/* <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div> */}
      <div className="relative z-10 h-full flex flex-col items-start justify-end p-6 md:p-8 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent pointer-events-none">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Mufine Wallet</h1>
        <p className="text-emerald-300/90 text-sm md:text-base">Your Finance just fine</p>
      </div>
    </section>
  )
}
