import React from 'react'
import { Link } from 'react-router-dom';

const ProjectsAndSkills = [
  {
    id: 1,
    title: "Latih skill dengan project",
    description: "Selesaikan project yang dirancang untuk meningkatkan skill yang kamu butuhkan.",
    hrefDesc: "Kerjakan Projek",
    path: "/dashboard/project"
  },
  {
    id: 2,
    title: "Analisis kesiapan kerja anda",
    description: "Bandingkan profil Anda dengan kebutuhan industri saat ini",
    hrefDesc: "Cek Kesiapan Kerja",
    path: "/dashboard/analysis"
  }
];

const CardProjectAndSkill = ({ item }) => {
  return (
    <div className={`flex flex-col gap-2 w-full min-h-40 p-4 sm:p-5 rounded-2xl ${item.id === 1 ? 'bg-[#06275A]' : 'bg-primary'}`}>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-[450] font-montserrat text-white mt-2 sm:mt-4 ml-2">
        {item.title}
      </h1>
      <p className="text-sm sm:text-base lg:text-lg font-[450] font-montserrat text-white/50 ml-2">
        {item.description}
      </p>
      <Link
        to={item.path}
        className="flex flex-row gap-2 text-base font-[450] font-montserrat text-nav hover:translate-x-1 transition-all ease-in-out duration-300 px-2 py-1 rounded-lg w-max mt-auto"
      >
        {item.hrefDesc}
        <svg width="18" height="14" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-auto mb-auto">
          <path d="M15.3027 7.03376H0.78125C0.57405 7.03376 0.375336 7.11607 0.228823 7.26258C0.0823102 7.40909 0 7.60781 0 7.81501C0 8.02221 0.0823102 8.22092 0.228823 8.36743C0.375336 8.51395 0.57405 8.59626 0.78125 8.59626H15.3027L9.60205 14.2921C9.45507 14.439 9.37249 14.6384 9.37249 14.8463C9.37249 15.0541 9.45507 15.2535 9.60205 15.4005C9.74903 15.5474 9.94839 15.63 10.1562 15.63C10.3641 15.63 10.5635 15.5474 10.7104 15.4005L17.7417 8.36921C17.8148 8.2966 17.8728 8.21025 17.9123 8.11514C17.9519 8.02003 17.9723 7.91802 17.9723 7.81501C17.9723 7.71199 17.9519 7.60999 17.9123 7.51488C17.8728 7.41976 17.8148 7.33342 17.7417 7.26081L10.7104 0.229557C10.5635 0.0826132 10.3641 0 10.1562 0C9.94839 0 9.74903 0.0826132 9.60205 0.229557C9.45507 0.376499 9.37249 0.575838 9.37249 0.783756C9.37249 0.991674 9.45507 1.19101 9.60205 1.33796L15.3027 7.03376Z" fill="#C3E9FE" />
        </svg>
      </Link>
    </div>
  );
}

const LibraryReadinessDash = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {ProjectsAndSkills.map((item) => (
        <CardProjectAndSkill key={item.id} item={item} />
      ))}
    </div>
  );
}

export default LibraryReadinessDash
