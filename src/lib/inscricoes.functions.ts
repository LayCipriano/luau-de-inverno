import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getInscricoesCount = createServerFn({ method: "GET" }).handler(
  async () => {
    const { count, error } = await supabaseAdmin
      .from("inscricoes")
      .select("*", { count: "exact", head: true });
    if (error) {
      console.error("[inscricoes] count error", error);
      return { count: 0, error: "Não foi possível carregar" };
    }
    return { count: count ?? 0, error: null };
  },
);