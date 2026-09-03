import { useEffect, useState } from 'react'
import MoneyBag from '../../assets/moneyBag.svg';
import DiagramHook from '../../hooks/DiagramHooks';
import { useCareer } from '../../context/CareerContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SalaryAvg = () => {
    const { salary, salaryIndustry } = DiagramHook();
    const [region, setRegion] = useState('Jakarta');
    const { careerData } = useCareer();

    const displaySalary = salary ? salary[`avgSalary${region}`] : null;

    useEffect(() => { salaryIndustry(); }, []);

    return (
        <div className="w-full sm:w-1/2 flex flex-col bg-secondary/90 rounded-xl p-4 sm:p-5">
            <div className="flex flex-col items-start">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-9 h-9 flex items-center justify-center bg-green-200 rounded-full">
                        <img src={MoneyBag} alt="Money" width="24" height="24" />
                    </div>
                    <div>
                        <h1 className='font-bold text-base sm:text-lg'>Rata-rata gaji</h1>
                        <p className='text-xs text-gray-500'>{careerData?.career_name || 'web developers'}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mx-auto rounded-xl p-5 text-primary">
                <div className="flex flex-col items-start gap-1">
                    {!careerData ? (
                        <Skeleton width={140} height={28} />
                    ) : (
                        <h1 className='font-bold text-xl sm:text-2xl'>{displaySalary || 'Data tidak tersedia'}</h1>
                    )}
                    <p className='text-base text-gray-500'>/bulan</p>
                </div>
            </div>
            <div className="bg-white/90 rounded-xl p-3 text-gray-500 text-sm">
                Anda memilih data gaji{' '}
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="International">Internasional</option>
                </select>
            </div>
        </div>
    )
}

export default SalaryAvg
