import { useEffect } from 'react'
import DiagramHooks from '../../hooks/DiagramHooks'
import { useCareer } from '../../context/CareerContext'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import dataKebutuhanIndustri from '../../data/dataKebutuhanIndustri.json';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DemandGrafic = () => {
    const { careerData } = useCareer();

    const careerDemand = dataKebutuhanIndustri.demand?.find(
        item => item.name === careerData?.career_name
    );

    const chartData = {
        labels: dataKebutuhanIndustri.years || [2020, 2021, 2022, 2023, 2024, 2025],
        datasets: [{
            label: `Permintaan ${careerData?.career_name}`,
            data: careerDemand
                ? dataKebutuhanIndustri.years.map(year => careerDemand.values[year])
                : [0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            borderRadius: 4,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: 'top' },
            title:  { display: false },
        },
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Permintaan Industri' } },
            x: { title: { display: true, text: 'Tahun' } },
        },
    };

    return (
        <div className="w-full sm:w-1/2 bg-white border-2 border-primary rounded-xl p-4 sm:p-5 flex flex-col">
            <div className="mb-3">
                <h1 className="font-bold text-base sm:text-xl">Permintaan Industri</h1>
                <p className="text-sm text-gray-500">
                    Permintaan {careerData?.career_name || 'Web Developer'} 5 tahun terakhir
                </p>
            </div>
            <div className="h-64 sm:h-72 lg:h-80 w-full">
                {careerData ? (
                    careerDemand
                        ? <Bar data={chartData} options={options} />
                        : <p className="text-gray-500 text-sm text-center pt-10">Data tidak tersedia</p>
                ) : (
                    <Skeleton height="100%" style={{ borderRadius: '0.5rem' }} />
                )}
            </div>
        </div>
    )
}

export default DemandGrafic
