import z from "zod";

export const articleSchema = z.object({
  author_id: z.string().min(1, "Insira o id do autor"),
  title: z.string().min(1, "Digite o título"),
  file: z
    .any()
    .nullable()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Insira ao menos um arquivo",
    }),

  published: z.boolean(),
  subtitle: z.string().min(1, "Digite o subtitulo"),
  article_url: z.string().min(1, "Insira o link do artigo"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
