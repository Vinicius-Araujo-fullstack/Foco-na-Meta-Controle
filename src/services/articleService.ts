import { ArticleFormData } from "../pages/DashBoard/PageSelect/ArticlePage/SchemaArticle";
import api from "../utils/api";

export const getArticles = async () => {
  const res = await api.get("/all-articles");
  return res;
};

export const postArticle = async (payload: ArticleFormData) => {
    // ** o campo file, recebe um arquivo, por isso o uso do FormData
    
  const formData = new FormData();
  
  formData.append("author_id", payload.author_id);
  formData.append("title", payload.title);
  formData.append("article_url", payload.article_url);
  formData.append("published", payload.published.toString());
  formData.append("subtitle", payload.subtitle);

  if (payload.file && payload.file.length > 0) {
    formData.append("file", payload.file[0]);
  }

  const res = await api.post("/upload-article", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteArticle = async (id: string) => {
  const res = await api.delete(`article/${id}`);
  return res.data
}
