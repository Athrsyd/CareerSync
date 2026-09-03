import React from 'react'
import IconAI from '../../assets/IconAI.svg';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FeedbackAI = ({ result, loading }) => {
    return (
        <div className="flex flex-col p-4 sm:p-5 gap-4 bg-secondary w-full lg:flex-1 h-auto rounded-xl">
            <div className="flex flex-col items-start justify-start">
                <div className="flex flex-row items-center gap-2">
                    <img src={IconAI} alt="AI Icon" width="28" height="28" />
                    <div>
                        <h1 className="font-bold text-lg sm:text-xl">AI Insight</h1>
                        <p className="text-sm text-gray-500">
                            Berdasarkan data anda, berikut adalah evaluasi keterampilan Anda saat ini.
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-sm bg-white rounded-xl p-4 sm:p-6 text-gray-500 max-h-52 overflow-y-auto">
                {loading && (
                    <div className="flex flex-col gap-2">
                        <Skeleton count={3} />
                        <Skeleton width="70%" />
                    </div>
                )}
                {!loading && result && <pre className="whitespace-pre-wrap text-sm">{result}</pre>}
                {!loading && !result && <p>Tekan tombol "Start Analysis" untuk melihat hasil AI.</p>}
            </div>
            <p className="text-center text-gray-600 -mt-2 text-xs font-semibold">
                Jawaban di buat oleh AI yang mungkin bisa saja salah
            </p>
        </div>
    );
}

export default FeedbackAI
