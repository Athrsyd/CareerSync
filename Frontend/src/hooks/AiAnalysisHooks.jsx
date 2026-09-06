import { useState } from "react";
import API from '../services/api';

const useAI = () => {
    const [result, SetResult] = useState(null);
    const [loading, SetLoading] = useState(false);
    const [rateLimitInfo, SetRateLimitInfo] = useState(null);

    /**
     * Jalankan analisis pertama kali via Backend.
     * Backend yang akan panggil Gemini API — API key tidak pernah ada di FE.
     */
    const runAnalysis = async (careerData, skillsMastery, readiness) => {
        const token = localStorage.getItem('tokenCareerSync');
        try {
            SetLoading(true);
            SetRateLimitInfo(null);

            const res = await API.post(
                `/feedback/${careerData.id}`,
                {
                    career_name: careerData.career_name,
                    readiness,
                    skills_mastery: skillsMastery,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const text = res.data?.data?.ai_feedback || "Tidak Ada Hasil";
            SetResult(text);
            return text;
        } catch (error) {
            if (error.response?.status === 429) {
                // Rate limit — analisis sudah dilakukan hari ini
                const info = error.response.data?.next_analysis_in;
                SetRateLimitInfo(info);
                console.warn("Rate limit:", error.response.data.message);
            } else {
                console.error("AI ERROR:", error.response?.data || error.message);
            }
            return null;
        } finally {
            SetLoading(false);
        }
    };

    /**
     * Refresh analisis via Backend (endpoint berbeda, tetap 1x per 24 jam).
     */
    const refreshAnalysis = async (careerData, skillsMastery, readiness) => {
        const token = localStorage.getItem('tokenCareerSync');
        try {
            SetLoading(true);
            SetRateLimitInfo(null);

            const res = await API.post(
                `/feedback/refresh`,
                {
                    career_id: careerData.id,
                    career_name: careerData.career_name,
                    readiness,
                    skills_mastery: skillsMastery,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const text = res.data?.data?.ai_feedback || "Tidak Ada Hasil";
            SetResult(text);
            return text;
        } catch (error) {
            if (error.response?.status === 429) {
                const info = error.response.data?.next_analysis_in;
                SetRateLimitInfo(info);
                console.warn("Rate limit:", error.response.data.message);
            } else {
                console.error("AI REFRESH ERROR:", error.response?.data || error.message);
            }
            return null;
        } finally {
            SetLoading(false);
        }
    };

    /**
     * Ambil feedback yang sudah tersimpan di DB beserta info cooldown.
     */
    const getFeedback = async (id) => {
        const token = localStorage.getItem('tokenCareerSync');
        try {
            const res = await API.get(`/feedback/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data.data;
        } catch (error) {
            console.error("getFeedback error:", error);
            return null;
        }
    };

    return { result, loading, rateLimitInfo, runAnalysis, refreshAnalysis, getFeedback };
};

export default useAI;
