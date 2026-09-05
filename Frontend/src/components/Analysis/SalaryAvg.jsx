import { useEffect, useState } from 'react'
import MoneyBag from '../../assets/moneyBag.svg';
import DiagramHook from '../../hooks/DiagramHooks';
import { useCareer } from '../../context/CareerContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const REGIONS = [
  { value: 'Jakarta',       label: 'Jakarta' },
  { value: 'Indonesia',     label: 'Indonesia' },
  { value: 'International', label: 'Internasional' },
];

const SalaryAvg = () => {
    const { salary, salaryIndustry } = DiagramHook();
    const [region, setRegion] = useState('Jakarta');
    const { careerData } = useCareer();

    const displaySalary = salary ? salary[`avgSalary${region}`] : null;

    useEffect(() => { salaryIndustry(); }, []);

    return (
        <div className="w-full sm:w-1/2 flex flex-col bg-secondary/90 rounded-xl p-4 sm:p-5 gap-4">
            {/* Header */}
            <div className="flex flex-row items-center gap-3">
                <div className="w-15 h-15 flex items-center justify-center bg-green-200 rounded-full shrink-0">
                    <img src={MoneyBag} alt="Money" width="40" height="40" />
                </div>
                <div>
                    <h1 className="font-bold text-lg sm:text-2xl leading-tight">Rata-rata Gaji</h1>
                    <p className="text-lg text-gray-500">{careerData?.career_name || 'Web Developer'}</p>
                </div>
            </div>

            {/* Salary amount */}
            <div className="flex flex-col items-center justify-center bg-white/60 rounded-xl py-5 px-4 text-primary">
                {!careerData ? (
                    <Skeleton width={160} height={32} />
                ) : (
                    <h2 className="font-bold text-2xl sm:text-3xl text-center">
                        {displaySalary || 'Data tidak tersedia'}
                    </h2>
                )}
                <p className="text-sm text-gray-500 mt-1">/bulan</p>
            </div>

            {/* Region selector */}
            <div className="bg-white/90 rounded-xl p-3 text-gray-600 text-xs sm:text-sm">
                <p className="mb-1.5 font-medium">Pilih wilayah data gaji:</p>
                <div className="flex flex-wrap gap-2">
                    {REGIONS.map(r => (
                        <button
                            key={r.value}
                            onClick={() => setRegion(r.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                                region === r.value
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SalaryAvg
