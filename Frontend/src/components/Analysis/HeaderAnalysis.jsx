import React from 'react'
import { Loader2 } from 'lucide-react'

const HeaderAnalysis = ({ loading, isAnalysisStarted, handleRefresh, onStartAnalysis }) => {
    return (
        <header className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-tight">
                    Skill Analysis
                </h1>
                <p className="text-sm sm:text-base text-gray-500">
                    Lihat seberapa baik keterampilan Anda sesuai dengan standar industri.
                </p>
            </div>
            <div className="shrink-0">
                <button
                    onClick={isAnalysisStarted ? handleRefresh : onStartAnalysis}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-primary font-bold py-2.5 px-6 rounded-full transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm w-full sm:w-auto justify-center"
                >
                    {loading && <Loader2 size={15} className="animate-spin" />}
                    {loading
                        ? 'Menganalisis...'
                        : isAnalysisStarted
                            ? ' Refresh Analysis'
                            : ' Start Analysis'}
                </button>
            </div>
        </header>
    )
}

export default HeaderAnalysis
