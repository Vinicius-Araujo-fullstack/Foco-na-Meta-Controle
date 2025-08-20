import api from "../utils/api";
import { IAnswers, IEvaluateRequest } from "../interfaces/evaluate";

export const postEvaluate = async (
    data: IEvaluateRequest
): Promise<{ id: string }> => {
    const res = await api.post("/evaluate", data)
    return res.data.response;
}

export const postAnswers = async (
    evaluateId: string,
    answers: IAnswers
): Promise<any> => {
    const res = await api.post(`/add-answers/${evaluateId}`, answers)
    return res.data
}