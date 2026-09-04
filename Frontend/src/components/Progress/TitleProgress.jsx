import React from 'react'
import { useCareer } from '../../context/CareerContext';

const TitleProgress = () => {
  const { careerData } = useCareer();
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl font-montserrat text-black leading-tight">
        Perjalanan menuju kesempatan kerja
      </h1>
      <h2 className="text-base sm:text-lg lg:text-xl font-medium font-montserrat text-black/50">
        Panduan Skill untuk menjadi{' '}
        <span className="text-primary font-semibold">{careerData?.career_name || 'no career selected'}</span>
      </h2>
      <p className="text-sm sm:text-base font-montserrat font-medium text-black/40 mt-1">
        Lacak kemajuan belajar Anda dan lihat seberapa jauh Anda sudah berkembang
      </p>
    </div>
  );
}

export default TitleProgress
