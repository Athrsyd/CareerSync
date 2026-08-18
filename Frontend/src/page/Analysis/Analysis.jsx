import React, { use } from 'react'
import { useEffect, useState, useMemo } from 'react';
import CareerOptions from '../../data/careerOptions.json'
import Navbar from '../../components/Global/Navbar';
import NavDash from '../../components/Dashboard/NavDash';
import JobReadinessScore from '../../components/Global/JobReadinessScore';
import HeaderAnalysis from '../../components/Analysis/HeaderAnalysis';
import FeedbackAI from '../../components/Analysis/FeedbackAI';
import DemandGrafic from '../../components/Analysis/DemandGrafic';
import SalaryAvg from '../../components/Analysis/SalaryAvg';
import ProgressGrafic from '../../components/Analysis/ProgressGrafic';
import { useProgress } from '../../context/ProgressContext';
import useAI from '../../hooks/AiAnalysisHooks';
import { useCareer } from '../../context/CareerContext';
import { useUser } from '../../context/UserContext';
import API from '../../services/api';

const Analysis = () => {
    const { readiness, careerData, skillsMastery } = useCareer();
    const { progress } = useProgress();
    const { runAnalysis, loading: aiLoading, getFeedback } = useAI();
    const [analysisStarted, setAnalysisStarted] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [feedbackLoading, setFeedbackLoading] = useState(false);

    const enrichedSkills = useMemo(() => {
        if (!careerData || skillsMastery.length === 0) return [];
        const career = CareerOptions.careers.find((c) => c.name === careerData.career_name);
        return skillsMastery.map((sm) => {
            const foundSkill = career?.skills.find((s) => String(s.id) === String(sm.skill_id));
            return { ...sm, name: foundSkill?.name || "Unknown Skill" };
        });
    }, [careerData, skillsMastery]);

    useEffect(() => {
        if (analysisStarted && careerData && enrichedSkills.length > 0) {
            getFeedback(careerData.id).then((data) => {
                if (data) setFeedback(data.ai_feedback);
                else setFeedback("Gagal mengambil feedback. Silakan coba lagi.");
            });
            if (!feedback) generateAndSendFeedback();
        }
    }, [analysisStarted, careerData, enrichedSkills]);

    useEffect(() => {
        if (careerData?.id) {
            getFeedback(careerData.id)
                .then((data) => {
                    if (data) setAnalysisStarted(data.ever_analyzed);
                })
                .catch((error) => console.error("Error fetching feedback:", error));
        }
    }, [careerData?.id, getFeedback]);

    const generateAndSendFeedback = async () => {
        try {
            setFeedbackLoading(true);
            const token = localStorage.getItem('tokenCareerSync');
            const generatedFeedback = await runAnalysis(careerData, enrichedSkills, readiness);
            await API.post(`/feedback/${careerData.id}`, { ai_feedback: generatedFeedback }, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            setFeedback(generatedFeedback);
        } catch (error) {
            setFeedback("Gagal membuat analisis. Silakan coba lagi.");
        } finally {
            setFeedbackLoading(false);
        }
    };

    const handleRefresh = async () => { await generateAndSendFeedback(); }

    return (
        <>
            <NavDash />
            <div className='md:ml-16 lg:ml-40 overflow-x-hidden pb-24 md:pb-5'>
                <Navbar />
                <div className="px-4 sm:px-6 lg:px-8 mt-4">
                    <HeaderAnalysis
                        runAnalysis={() => runAnalysis(careerData, enrichedSkills, readiness)}
                        loading={feedbackLoading}
                        isAnalysisStarted={analysisStarted}
                        onStartAnalysis={() => {}}
                        handleRefresh={handleRefresh}
                    />
                    {analysisStarted && (
                        <>
                            {/* Feedback + Score */}
                            <div className="flex flex-col lg:flex-row w-full gap-6 mt-4">
                                <FeedbackAI result={feedback} loading={feedbackLoading} />
                                <div className="w-full lg:w-auto">
                                    <JobReadinessScore score={readiness} role={careerData?.career_name || "Web Developer"} />
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="flex flex-col sm:flex-row w-full gap-6 mt-8">
                                <SalaryAvg />
                                <DemandGrafic />
                            </div>

                            <div className="mt-8">
                                <ProgressGrafic />
                            </div>
                        </>
                    )}
                </div>
                <br />
            </div>
        </>
    )
}

export default Analysis
