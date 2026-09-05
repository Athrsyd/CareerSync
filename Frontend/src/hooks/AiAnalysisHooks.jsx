import { useState } from "react";
import aiPrompt from "../utils/aiPrompt";
import axios from "axios";
import API from '../services/api'

const useAI = () => {
    const [result, SetResult] = useState(null);
    const [loading, SetLoading] = useState(false);
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();

    const runAnalysis = async (careerData, skillsMastery, readiness) => {
        try {
            if (!API_KEY) {
                console.error("VITE_GEMINI_API_KEY belum tersedia. Restart Vite dari folder Frontend setelah mengubah .env.");
                return null;
            }

            SetLoading(true);

            const prompt = aiPrompt(careerData, skillsMastery, readiness);
            console.log("Prompt:", prompt);
            // console.log("API KEY:", API_KEY)

            const res = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${API_KEY}`,
                {
                    contents: [
                        {
                            parts: [{ text: prompt }],
                        },
                    ],
                },
            );

            const text =
                res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Tidak Ada Hasil";

            console.log("FULL RESPONSE:", res.data);

            SetResult(text);
            SetLoading(false);
            return text;
        } catch (error) {
            console.error("AI ERROR:", error.response?.data || error.message);
            SetLoading(false);
            return null;
        }
    };

    const getFeedback = async (id) => {
        const token = localStorage.getItem('tokenCareerSync');
        try {
            const res = await API.get(`/feedback/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("FEEDBACK DATA:", res.data.data);
            return res.data.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };



    return { result, loading, runAnalysis, getFeedback };
};

export default useAI