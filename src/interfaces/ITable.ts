/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITable {
  headers: string[];
  fristColumn?: string;
  secondColumn?: string;
  thirdColumn?: string;
  fourthColumn?: string;
  turmasInfo?: any[];
  evaluateInfo?: any[];
  simulatedInfo?: any[];
  notifyInfo?: INotify[];
}

export interface INotify {
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
}

export interface IRecipients {
  id: number;
  notificationId: number;
  userId: string;
  ntbUserId: number;
  read: boolean;
  readAt: null;
  createdAt: string;
}
