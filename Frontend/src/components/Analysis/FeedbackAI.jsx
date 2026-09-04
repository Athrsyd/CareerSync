import React from 'react'
import IconAI from '../../assets/IconAI.svg';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FeedbackAI = ({ result, loading }) => {
    return (
        <div className="flex flex-col p-4 sm:p-5 gap-4 bg-secondary w-full lg:flex-1 rounded-xl">
            {/* Header */}
            <div className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shrink-0">
                    <img src={IconAI} alt="AI Icon" width="24" height="24" />
                </div>
                <div>
                    <h1 className="font-bold text-base sm:text-lg leading-tight">AI Insight</h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                        Evaluasi keterampilan Anda berdasarkan data terkini.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="text-sm bg-white rounded-xl p-4 sm:p-5 text-gray-600 max-h-60 overflow-y-auto">
                {loading && (
                    <div className="flex flex-col gap-2.5">
                        <Skeleton count={3} />
                        <Skeleton width="80%" />
                        <Skeleton width="60%" />
                    </div>
                )}
                {!loading && result && (
                    <pre className="whitespace-pre-wrap text-xs sm:text-sm font-sans leading-relaxed">{result}</pre>
                )}
                {!loading && !result && (
                    <div className="flex flex-col items-center justify-center py-6 text-gray-400 gap-2">
                        <img src={IconAI} alt="" width="32" className="opacity-30" />
                        <p className="text-xs text-center">Tekan "Start Analysis" untuk melihat evaluasi AI.</p>
                    </div>
                )}
            </div>

            <p className="text-center text-gray-400 text-xs">
                ⚠️ Jawaban dibuat oleh AI — mungkin tidak selalu akurat
            </p>
        </div>
    );
}

export default FeedbackAI
