import React from 'react'
import Bintang from "../../assets/Bintang.svg"
import { useCareer } from '../../context/CareerContext';
import JobReadinessScore from '../Global/JobReadinessScore';
import { Link } from 'react-router-dom';
import WelcomeDashSkeleton from './WelcomeDashSkeleton';

const WelcomeDash = ({ user, data }) => {
  const { readiness } = useCareer();

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {!user || !data ? (
        <WelcomeDashSkeleton />
      ) : (
        <div className="relative w-full lg:w-auto lg:flex-1 min-h-52 rounded-2xl shadow-xl backdrop-blur-md flex flex-col px-6 sm:px-10 bg-primary overflow-hidden">
          <div className="flex flex-col items-start justify-center mt-8 sm:mt-10 mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-poppins leading-tight">
              Hallo, {user?.username || 'Guest'}!
            </h1>
            <h2 className="text-base sm:text-lg lg:text-xl font-[450] text-white font-poppins mt-1">
              Karier Anda sebagai {data?.career_name || 'No career selected'} dimulai di sini.
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-poppins w-full sm:w-4/5 mt-2">
              Lacak kemajuan Anda, tingkatkan keterampilan Anda, dan dekatkan diri Anda
              untuk menjadi profesional
            </p>
            <Link
              to="/dashboard/progress"
              className="text-sm font-[250] font-montserrat text-white hover:scale-105 transition-all ease-in-out duration-300 bg-black px-7 py-[2.25px] rounded-lg mt-4"
            >
              <button>Lebih Banyak</button>
            </Link>
          </div>
          {/* Star decoration — only visible on larger screens */}
          <img
            src={Bintang}
            className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 w-40 lg:w-56 opacity-90 pointer-events-none"
          />
        </div>
      )}
      <div className="w-full lg:w-auto">
        <JobReadinessScore score={readiness} role={data?.career_name || 'No career selected'} />
      </div>
    </div>
  );
}

export default WelcomeDash
