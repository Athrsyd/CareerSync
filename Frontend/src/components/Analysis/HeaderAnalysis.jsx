import { useContext } from 'react'
import { useProgress } from '../../context/ProgressContext'

const HeaderAnalysis = ({ runAnalysis, loading, isAnalysisStarted, onStartAnalysis, handleRefresh }) => {
    return (
        <header className='py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className="flex flex-col">
                <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl'>Skill Analysis</h1>
                <p className='text-sm sm:text-base lg:text-xl text-gray-500'>
                    Lihat seberapa baik keterampilan Anda sesuai dengan standar industri.
                </p>
            </div>
            <div className="buttons shrink-0">
                <button
                    onClick={isAnalysisStarted ? handleRefresh : onStartAnalysis}
                    disabled={loading}
                    className='bg-blue-200 hover:bg-blue-300 hover:text-primary transition-all ease-in-out duration-300 cursor-pointer text-primary/80 font-bold py-2 px-5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto'
                >
                    {loading ? 'Analyzing...' : isAnalysisStarted ? 'Refresh Analysis' : 'Start Analysis'}
                </button>
            </div>
        </header>
    )
}

export default HeaderAnalysis
