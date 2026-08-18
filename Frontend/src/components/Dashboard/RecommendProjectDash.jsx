import React from 'react'
import { Link } from 'react-router-dom';

const RecommendProject = ({ project, career }) => {
  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl font-bold font-montserrat text-[#021124] mb-3">
        Rekomendasi Projek
      </h1>
      {project && career ? (
        <div className="w-full rounded-xl bg-white/20 shadow-lg p-4 sm:p-5 outline-2 outline-primary">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Icon */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl flex justify-center items-center bg-nav shrink-0">
              <svg width="36" height="36" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.7959 16.5375L18.75 10.6812L12.8292 4.76457C14.0375 4.37916 15.3292 4.16666 16.6667 4.16666C18.6191 4.16609 20.5446 4.62288 22.2887 5.50044C24.0328 6.37799 25.5471 7.65191 26.7102 9.22008C27.8733 10.7883 28.6529 12.6071 28.9865 14.5308C29.3201 16.4545 29.1985 18.4297 28.6313 20.2979L41.6667 33.3333C42.2139 33.8805 42.6479 34.5301 42.944 35.245C43.2402 35.9599 43.3926 36.7262 43.3926 37.5C43.3926 38.2738 43.2402 39.0401 42.944 39.755C42.6479 40.4699 42.2139 41.1195 41.6667 41.6667C41.1195 42.2138 40.4699 42.6479 39.755 42.944C39.0401 43.2401 38.2739 43.3925 37.5 43.3925C36.7262 43.3925 35.96 43.2401 35.245 42.944C34.5301 42.6479 33.8805 42.2138 33.3334 41.6667L20.2979 28.6312C18.1149 29.2951 15.7918 29.3488 13.5805 28.7864C11.3692 28.2241 9.35391 27.0672 7.7532 25.4412C6.15249 23.8151 5.02738 21.782 4.49983 19.5621C3.97228 17.3422 4.06241 15.0202 4.76045 12.8479L10.675 18.75L16.5354 16.7979L16.7959 16.5375Z" fill="#5482B4" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-row flex-wrap justify-between items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-bold font-montserrat text-[#021124]">
                  {project.title}
                </h1>
                <h2 className="text-sm flex justify-center items-center font-semibold font-montserrat bg-nav h-7 px-3 py-1 rounded-2xl text-[#06275A]">
                  {career.career_name}
                </h2>
              </div>

              <div className="w-full h-0.5 bg-primary rounded-full"></div>

              <div className="flex flex-row gap-2 bg-gray-300 p-2 rounded-lg">
                <p className="text-xs sm:text-sm font-semibold font-montserrat text-primary">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-row gap-2 bg-gray-300 p-2 rounded-lg">
                <p className="text-xs sm:text-sm font-semibold font-montserrat text-primary">
                  Output : {project.output}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {project.tools?.map((tool, index) => (
                  <div key={index} className="px-3 py-1 bg-nav rounded-full text-xs sm:text-sm font-semibold font-montserrat text-[#06275A]">
                    {tool}
                  </div>
                ))}
                <Link
                  to="/dashboard/project"
                  className="ml-auto text-sm font-[450] font-montserrat text-white hover:scale-105 transition-all ease-in-out duration-300 bg-[#06275A] px-4 py-2 rounded-lg"
                >
                  Start Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RecommendProject
