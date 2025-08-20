import { useState } from "react"
import { IAnswers, IEvaluateRequest } from "../interfaces/evaluate";
import { postAnswers, postEvaluate } from "../services/evaluationService";

export const useEvaluationSubmit = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);
    const [succes, setSuccess] = useState(false)

    const submitEvaluation = async (
        evaluationData: IEvaluateRequest,
        blockOne: IAnswers,
        blockTwo: IAnswers,
    ) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await postEvaluate(evaluationData)
            await postAnswers(res.id, blockOne);
            await postAnswers(res.id, blockTwo);

            setSuccess(true)
            return { success: true };
        } catch (err: any) {
            console.error(err);
            setError("Erro ao enviar avaliação e blocos.");
            return { success: false, error: err.message || "Erro desconhecido" };
        } finally {
            setLoading(false)
        }
    }

    return {
        submitEvaluation,
        loading,
        error,
        succes
    }

}