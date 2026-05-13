CREATE TABLE public.inscricoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  sobrenome TEXT NOT NULL,
  data_nascimento DATE NOT NULL,
  ddd TEXT NOT NULL,
  telefone TEXT NOT NULL,
  igreja TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous) can submit a registration
CREATE POLICY "Anyone can insert inscricoes"
  ON public.inscricoes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(nome) BETWEEN 1 AND 100
    AND char_length(sobrenome) BETWEEN 1 AND 100
    AND char_length(ddd) BETWEEN 2 AND 3
    AND char_length(telefone) BETWEEN 8 AND 15
    AND char_length(igreja) BETWEEN 1 AND 200
  );

-- No one can read via anon key (admins use the dashboard)
