import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getInscricoesCount } from "@/lib/inscricoes.functions";

export const Route = createFileRoute("/inscritos")({
  head: () => ({
    meta: [
      { title: "Inscritos — Luau de Outono" },
      { name: "description", content: "Total de inscritos no Luau de Outono." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InscritosPage,
});

function InscritosPage() {
  const fetchCount = useServerFn(getInscricoesCount);
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["inscricoes-count"],
    queryFn: () => fetchCount(),
    refetchInterval: 15000,
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      <div className="text-center max-w-md">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-6">
          Luau de Outono
        </p>
        <h1 className="font-serif text-3xl md:text-4xl mb-10">
          Inscritos confirmados
        </h1>

        <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur px-10 py-14 mb-8">
          <div className="text-7xl md:text-8xl font-serif tabular-nums">
            {isLoading ? "—" : data?.count ?? 0}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {data?.count === 1 ? "pessoa inscrita" : "pessoas inscritas"}
          </p>
        </div>

        {data?.error && (
          <p className="text-sm text-destructive mb-6">{data.error}</p>
        )}

        <div className="flex items-center justify-center gap-4 text-sm">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="underline text-foreground/80 hover:text-foreground disabled:opacity-50"
          >
            {isFetching ? "Atualizando…" : "Atualizar"}
          </button>
          <span className="text-muted-foreground">·</span>
          <Link to="/" className="underline text-foreground/80 hover:text-foreground">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}