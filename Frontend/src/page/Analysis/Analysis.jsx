import React, { useEffect, useState, useMemo } from 'react';
import CareerOptions from '../../data/careerOptions.json';
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

const Analysis = () => {
    const { readiness, careerData, skillsMastery } = useCareer();
    const { progress } = useProgress();
    const { loading: aiLoading, rateLimitInfo, runAnalysis, refreshAnalysis, getFeedback } = useAI();

    const [analysisStarted, setAnalysisStarted] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [canAnalyzeToday, setCanAnalyzeToday] = useState(true);
    const [nextAnalysisInfo, setNextAnalysisInfo] = useState(null);

    // Enriched skills: gabungkan skillsMastery dengan nama skill dari careerOptions
    const enrichedSkills = useMemo(() => {
        if (!careerData || skillsMastery.length === 0) return [];
        const career = CareerOptions.careers.find((c) => c.name === careerData.career_name);
        return skillsMastery.map((sm) => {
            const foundSkill = career?.skills.find((s) => String(s.id) === String(sm.skill_id));
            return { ...sm, name: foundSkill?.name || 'Unknown Skill' };
        });
    }, [careerData, skillsMastery]);

    // Saat pertama load: cek status analisis & ambil feedback yang sudah ada
    useEffect(() => {
        if (!careerData?.id) return;

        getFeedback(careerData.id).then((data) => {
            if (!data) return;
            setAnalysisStarted(data.ever_analyzed);
            setCanAnalyzeToday(data.can_analyze_today);
            setNextAnalysisInfo(data.next_analysis_in > 0 ? data.next_analysis_in : null);
            if (data.ai_feedback) setFeedback(data.ai_feedback);
        });
    }, [careerData?.id]);

    // Update info cooldown dari hook jika ada rate limit response
    useEffect(() => {
        if (rateLimitInfo) {
            setCanAnalyzeToday(false);
            setNextAnalysisInfo(rateLimitInfo.seconds);
        }
    }, [rateLimitInfo]);

    // Analisis pertama kali
    const handleStartAnalysis = async () => {
        setFeedbackLoading(true);
        const generatedFeedback = await runAnalysis(careerData, enrichedSkills, readiness);
        if (generatedFeedback) {
            setFeedback(generatedFeedback);
            setAnalysisStarted(true);
            setCanAnalyzeToday(false);
        }
        setFeedbackLoading(false);
    };

    // Refresh analisis (tetap kena rate limit 24 jam)
    const handleRefresh = async () => {
        setFeedbackLoading(true);
        const generatedFeedback = await refreshAnalysis(careerData, enrichedSkills, readiness);
        if (generatedFeedback) {
            setFeedback(generatedFeedback);
            setCanAnalyzeToday(false);
        }
        setFeedbackLoading(false);
    };

    // Format sisa waktu dari detik ke "X jam Y menit"
    const formatCooldown = (seconds) => {
        if (!seconds) return '';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h} jam ${m} menit`;
    };

    const isLoading = aiLoading || feedbackLoading;

    return (
        <>
            <NavDash />
            <div className='md:ml-21 lg:ml-45 overflow-x-hidden min-w-0 pb-24 md:pb-5'>
                <Navbar />
                <div className="px-4 sm:px-6 lg:px-8 mt-4">
                    <HeaderAnalysis
                        loading={isLoading}
                        isAnalysisStarted={analysisStarted}
                        canAnalyzeToday={canAnalyzeToday}
                        onStartAnalysis={handleStartAnalysis}
                        handleRefresh={handleRefresh}
                    />

                    {/* Pesan rate limit */}
                    {!canAnalyzeToday && nextAnalysisInfo && (
                        <div className="mt-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                            Analisis berikutnya tersedia dalam{' '}
                            <span className="font-semibold">{formatCooldown(nextAnalysisInfo)}</span>.
                            Kamu hanya bisa melakukan 1 analisis per 24 jam.
                        </div>
                    )}

                    {analysisStarted && (
                        <>
                            {/* Feedback + Score */}
                            <div className="flex flex-col lg:flex-row w-full gap-6 mt-4">
                                <FeedbackAI result={feedback} loading={isLoading} />
                                <div className="w-full lg:w-auto">
                                    <JobReadinessScore score={readiness} role={careerData?.career_name || 'Web Developer'} />
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
            </div>
        </>
    );
};

export default Analysis;
