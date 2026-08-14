import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  nome_completo: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .max(150, "Nome muito longo")
    .refine((v) => v.split(/\s+/).length >= 2, "Informe nome e sobrenome"),
  data_nascimento: z
    .string()
    .min(1, "Informe sua data de nascimento")
    .refine((v) => {
      const d = new Date(v);
      return !isNaN(d.getTime()) && d < new Date() && d > new Date("1900-01-01");
    }, "Data inválida"),
  telefone: z
    .string()
    .trim()
    .regex(/^\d{2} \d{5}-\d{4}$/, "Informe um telefone válido (somente números, DDD + número)"),
  igreja: z.string().trim().min(1, "Informe sua igreja ou 'nenhuma'").max(200),
});

type FormValues = z.infer<typeof schema>;

export function InscricaoForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const partes = values.nome_completo
    .trim()
    .toLowerCase()
    .split(/\s+/);

    const nome = partes[0];
    const sobrenome = partes.slice(1).join(" ");

    const { error } = await supabase
    .from("inscricoes_inverno")
    .insert({
      nome,
      sobrenome,
      data_nascimento: values.data_nascimento,
      telefone: values.telefone.replace(/\D/g, ""),
      igreja: values.igreja.trim(),
    });

    if (error) {
      if (error.code ==="23505") {
        toast.error("Você já tem uma inscrição feita! 🤓");
        return;
      }

      toast.error("Não foi possível enviar sua inscrição. Tente novamente.");
      return;
    }

    toast.success("Inscrição confirmada! Nos vemos no Luau. 🪾");
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <p className="text-xs tracking-[0.4em] uppercase text-primary-foreground mb-4">Tudo certo</p>
        <h3 className="font-serif text-4xl text-primary-foreground mb-3">
          Sua vaga está garantida!
        </h3>
        <p className="text-primary-foreground/80 mb-8">
          Venha com o coração aberto. Estamos ansiosos para te receber.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm underline text-primary-foreground/90 hover:text-primary-foreground"
        >
          Inscrever outra pessoa
        </button>
      </div>
    );
  }

  function maskPhone(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0,11);

    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0,2)} ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0,2)} ${numbers.slice(2,7)}-${numbers.slice(7)}`;
    }
    return numbers;
  }


  const inputCls =
    "w-full px-4 py-3 rounded-xl bg-background/30 backdrop-blur border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/60 transition";
  const labelCls = "text-xs tracking-[0.2em] uppercase text-primary-foreground/80 mb-2 block";
const errCls = "text-xs text-foreground mt-2 bg-background/80 border border-primary/40 inline-block px-3 py-1.5 rounded-lg backdrop-blur";
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left grid gap-5">
      <div>
        <label className={labelCls}>Nome completo</label>
        <input
          className={inputCls}
          placeholder="Nome e sobrenome"
          maxLength={150}
          {...register("nome_completo")}
        />
        {errors.nome_completo && <p className={errCls}>{errors.nome_completo.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Data de nascimento</label>
        <input type="date" className={`&{inputCls} w-full min-w-0`} {...register("data_nascimento")} />
        {errors.data_nascimento && <p className={errCls}>{errors.data_nascimento.message}</p>}
      </div>

        <div>
          <label className={labelCls}>DDD + Telefone</label>
          <input className={inputCls} placeholder="44 9 9999-9999" inputMode="numeric" maxLength={15} {...register("telefone", { onChange: (e) => {
            e.target.value = maskPhone(e.target.value);
          }})} />
          {errors.telefone && <p className={errCls}>{errors.telefone.message}</p>}
        </div>

      <div>
        <label className={labelCls}>Se você pertence a alguma Igreja, informe aqui:</label>
        <input className={inputCls} placeholder="Nome da sua igreja" maxLength={200} {...register("igreja")} />
        {errors.igreja && <p className={errCls}>{errors.igreja.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-background text-foreground font-medium tracking-wide hover:bg-card transition-colors disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Confirmar minha inscrição →"}
      </button>
    </form>
  );
}
