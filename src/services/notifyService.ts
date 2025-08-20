import { NotifyFormData } from "../pages/DashBoard/PageSelect/NotifyPage/SchemaNotify";
import api from "../utils/api";

export interface INotify {
  notifications: INotification[];
}

export interface INotification {
    id: number;
    city: string;
    state: string;
    school: string;
    city_id: string;
    school_id: number[];
    title: string;
    message: string;
    scheduledAt: string;
    sentAt: null;
    createdAt: string;
    updateAt: string;
    recipients: IRecipients[];
  };

export interface IRecipients {
  id: number;
  notificationId: number;
  userId: string;
  ntbUserId: number;
  read: boolean;
  readAt: null;
  createdAt: string;
}

export const getNotify = async ({
  idCity,
  idRecipient,
}: {
  idCity?: string;
  idRecipient?: string;
}): Promise<INotify> => {
  const params = [];
  if (idCity) params.push(`city_id=${idCity}`);
  if (idRecipient) params.push(`recipient_id=${idRecipient}`);
  const query = params.length ? `?${params.join("&")}` : "";

  const res = await api.get(`/notifications${query}`);
  return res.data;
};

// recipient = recebedor da notificação

export const postNotify = async (payload: NotifyFormData) => {
  const res = await api.post("/create-notification", payload)
  return res.data
}

export const deleteNotify = async (id: string) => {
  const res = await api.delete(`notification/${id}`);
  return res.data
}