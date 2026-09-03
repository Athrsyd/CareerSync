import { useEffect } from 'react'
import Proggress from '../../assets/progressIcon.svg'
import DiagramHooks from '../../hooks/DiagramHooks'
import { Line } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ProgressGrafic = () => {
    const { progressData, progressUser, loading } = DiagramHooks();

    useEffect(() => {
        progressUser();
    }, []);

    const parsingData = () => {
        if (!progressData || progressData.length === 0) return null;

        const uniqueData = [];
        const seen = new Set();

        for (const item of progressData) {
            const dateKey = new Date(item.progress_date).toISOString().split('T')[0];
            const readinessPoint = Number(item.readiness_point);
            const uniqueKey = `${dateKey}|${readinessPoint}`;

            if (!seen.has(uniqueKey)) {
                seen.add(uniqueKey);
                uniqueData.push({
                    date: dateKey,
                    readiness: readinessPoint,
                });
            }
        }

        uniqueData.sort((a, b) => new Date(a.date) - new Date(b.date));

        return {
            labels: uniqueData.map(item => new Date(item.date).toLocaleDateString('id-ID')),
            values: uniqueData.map(item => item.readiness),
        };
    };

    const parsedData = parsingData();

    const chartData = parsedData
        ? {
            labels: parsedData.labels,
            datasets: [
                {
                    label: 'Point Kesiapan Kerja',
                    data: parsedData.values,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                }
            ]
        }
        : null;

    const options = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
            x: {
                title: {
                    display: true,
                    text: 'Tanggal'
                }
            }
        }
    };

    return (
        <div className="w-19/20 border-2 px-7 py-5 border-primary mt-10 rounded-xl flex flex-col">
            <div className="flex flex-row items-center gap-2">
                <div className="w-12 h-10 flex items-center justify-center bg-green-200 rounded-xl">
                    <img src={Proggress} alt="AI Icon" width="40" height="40" />
                </div>
                <div className="">
                    <h1 className='font-bold text-xl '>Kemajuan Pertumbuhan Keterampilan</h1>
                    <p className='text-md text-gray-500'>Lacak bagaimana keterampilan Anda meningkat seiring waktu</p>
                </div>
            </div>
            <div className="w-full h-96 bg-white rounded-xl p-7 mt-5">
                {loading ? (
                    <Skeleton height="100%" style={{ borderRadius: '0.75rem' }} />
                ) : chartData ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <p className="text-center text-gray-400">No progress data available</p>
                )}
            </div>
        </div>
    )
}

export default ProgressGrafic