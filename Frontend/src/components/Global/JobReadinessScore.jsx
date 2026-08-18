const CIRCUMFERENCE = 2 * Math.PI * 54;
import React, { useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const JobReadinessScore = ({ score = 78, role = "Web Developer" }) => {
    const arcRef = useRef(null);
    useEffect(() => {
        if (arcRef.current) {
            const offset = CIRCUMFERENCE * (1 - score / 100);
            arcRef.current.style.transition = "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)";
            arcRef.current.style.strokeDashoffset = offset;
        }
    }, [score]);
    const topPercent = Math.max(1, 100 - score);

    if (!score || !role) {
        return <Skeleton width={280} height={200} style={{ borderRadius: '1rem' }} />;
    }

    return (
        <div className="bg-white/10 rounded-2xl outline-2 outline-primary shadow-xl backdrop-blur-md p-5 flex flex-col items-center gap-2 w-full lg:w-64">
            <h2 className="font-semibold text-sm sm:text-base font-montserrat text-[#06275A] tracking-tight text-center">
                Score Kesiapan Kerja
            </h2>
            <div>
                <svg width="90" height="90" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="54" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                    <circle
                        ref={arcRef}
                        cx="70" cy="70" r="54"
                        fill="none" stroke="#1e3a5f" strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={CIRCUMFERENCE * (1 - score / 100)}
                        transform="rotate(-90 70 70)"
                    />
                    <text x="70" y="78" textAnchor="middle" fontSize="25" fontWeight="500" fill="#1e3a5f">
                        {score > 100 ? '100' : score.toFixed(0)}%
                    </text>
                </svg>
            </div>
            <p className="text-xs sm:text-[13px] font-montserrat text-[#06275A] text-center leading-relaxed">
                {score >= 100 ? (
                    <span className="font-semibold text-slate-800">Selamat! Anda siap masuk ke dunia kerja!</span>
                ) : <>
                    Anda butuh peningkatan skill
                    <span className="font-semibold text-slate-800">{" "}{topPercent.toFixed(0)}%</span>{" "}
                    untuk siap menjadi{" "}
                    <span className="font-semibold text-slate-800">{role}</span>
                </>}
            </p>
        </div>
    );
}

export default JobReadinessScore
