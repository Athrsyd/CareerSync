import { useEffect } from 'react'
import Proggress from '../../assets/progressIcon.svg'
import DiagramHooks from '../../hooks/DiagramHooks'
import { Line } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressGrafic = () => {
    const { progressData, progressUser, loading } = DiagramHooks();

    useEffect(() => { progressUser(); }, []);

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
                uniqueData.push({ date: dateKey, readiness: readinessPoint });
            }
        }
        uniqueData.sort((a, b) => new Date(a.date) - new Date(b.date));
        return {
            labels: uniqueData.map(item => new Date(item.date).toLocaleDateString('id-ID')),
            values: uniqueData.map(item => item.readiness),
        };
    };

    const parsedData = parsingData();
    const chartData = parsedData ? {
        labels: parsedData.labels,
        datasets: [{
            label: 'Point Kesiapan Kerja',
            data: parsedData.values,
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3, fill: true, tension: 0.4,
            pointRadius: 5, pointBackgroundColor: 'rgba(59, 130, 246, 1)', pointBorderColor: '#fff',
        }]
    } : null;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'top' } },
        scales: {
            y: { beginAtZero: true, max: 100 },
            x: { title: { display: true, text: 'Tanggal' } },
        },
    };

    return (
        <div className="w-full border-2 border-primary rounded-xl px-4 sm:px-6 py-5 mt-6 flex flex-col">
            <div className="flex flex-row items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-green-200 rounded-xl shrink-0">
                    <img src={Proggress} alt="Progress" width="32" height="32" />
                </div>
                <div>
                    <h1 className="font-bold text-base sm:text-xl leading-tight">
                        Kemajuan Pertumbuhan Keterampilan
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                        Lacak bagaimana keterampilan Anda meningkat seiring waktu
                    </p>
                </div>
            </div>
            <div className="w-full h-64 sm:h-80 lg:h-96 bg-white rounded-xl p-3 sm:p-5">
                {loading ? (
                    <Skeleton height="100%" style={{ borderRadius: '0.75rem' }} />
                ) : chartData ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-center text-gray-400 text-sm">Belum ada data progress</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProgressGrafic
