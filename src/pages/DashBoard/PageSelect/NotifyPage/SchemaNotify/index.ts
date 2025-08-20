import { z } from "zod";

export const notifySchema = z.object({
  estadoId: z.string().min(1, "Selecione o estado"),
  cidadeId: z.string().min(1, "Selecione o cidade"),
  escolaId: z.array(z.string()).min(1, "Selecione o escola"),
  destinatarioId: z.string().min(1, "Selecione o destinatário"),
  mensagem: z.string().min(1, "Digite a mensagem"),
});

export type NotifyFormData = z.infer<typeof notifySchema>;
