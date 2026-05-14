import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/luau-hero.jpg";
import { InscricaoForm } from "@/components/InscricaoForm";
import { FallingLeaves } from "@/components/FallingLeaves";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col">
        <img
          src={heroImg}
          alt="Fogueira sob folhas de outono"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.18 0.04 40 / 0.4) 0%, oklch(0.18 0.04 40 / 0.7) 60%, var(--background) 100%)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
        <FallingLeaves count={20} />

        <header className="relative z-10 px-6 py-6 flex items-center justify-between max-w-6xl mx-auto w-full">
          <span className="text-sm tracking-[0.3em] uppercase text-primary font-medium">
            Atmosfera Jovem · 2026
          </span>
          <a
            href="#inscricoes"
            className="text-sm tracking-wider uppercase border border-border/60 hover:border-primary px-4 py-2 rounded-full transition-colors"
          >
            Inscreva-se
          </a>
        </header>

        <div className="relative z-10 flex-1 flex items-center px-6">
          <div className="max-w-6xl mx-auto w-full">
            <p className="text-sm md:text-base tracking-[0.4em] uppercase text-accent mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
              Jovens de Maringá e Região
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight mb-6">
              Luau de
              <br />
              <span
                className="italic bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-warm)" }}
              >
                Outono
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-2xl mb-10 font-light">
              A Estação da Transformação.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#inscricoes"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-primary-foreground font-medium tracking-wide transition-transform hover:scale-105"
                style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
              >
                Garantir minha vaga →
              </a>
              <div className="text-sm text-muted-foreground">
                <span className="block text-foreground font-medium">23 de Maio · Sábado</span>
                <span>18h às 23h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERSE */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-8">A Palavra</p>
          <blockquote className="font-serif text-3xl md:text-5xl leading-snug italic text-foreground">
            "Sendo Transformados de Glória em Glória."
          </blockquote>
          <cite className="not-italic block mt-8 text-muted-foreground tracking-widest uppercase text-sm">
            2 Coríntios 3:18
          </cite>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-24 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl mb-16 max-w-2xl">
            Uma noite que une o que importa
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "DIVERSÃO", desc: "Risadas, jogos e outras atividades." },
              { label: "ADORAÇÃO", desc: "Vozes erguidas sob o céu." },
              { label: "COMUNHÃO", desc: "Encontros que marcam." },
              { label: "PALAVRA", desc: "Verdade que transforma." },
            ].map((p, i) => (
              <div
                key={p.label}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/60 transition-all hover:-translate-y-1"
              >
                <span className="text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                <h3 className="font-serif text-2xl mt-3 mb-2 text-primary">{p.label}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section id="inscricoes" className="py-32 px-6 border-t border-border/50 relative">
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">Quando</p>
              <p className="font-serif text-4xl md:text-5xl mb-2">23 de Maio</p>
              <p className="text-xl text-muted-foreground">Sábado · 18h às 23h</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">Onde</p>
              <p className="font-serif text-4xl md:text-5xl mb-2">Av. Mauá, 1008</p>
              <p className="text-xl text-muted-foreground">Estacionamento · Maringá</p>
            </div>
          </div>

          <div
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <h2 className="font-serif text-4xl md:text-6xl text-primary-foreground mb-4">
              Esperamos você lá!
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Inscrições gratuitas e por tempo limitado. Venha viver algo único conosco!
            </p>
            <div className="max-w-xl mx-auto">
              <InscricaoForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        Luau de Outono · ATM JOVEM · 2026
      </footer>
    </div>
  );
}
