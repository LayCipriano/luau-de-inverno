import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getInscricoesCount = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, count, error } = await supabase
      .from("inscricoes")
      .select("nome, sobrenome, igreja, created_at", { count: "exact" })
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[inscricoes] count error", error);
      return { count: 0, inscritos: [], error: "Não foi possível carregar" };
    }
    return {
      count: count ?? data?.length ?? 0,
      inscritos: data ?? [],
      error: null as string | null,
    };
  },
);