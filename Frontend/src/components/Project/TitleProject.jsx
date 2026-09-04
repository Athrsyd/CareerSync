import React from 'react'

const TitleProject = ({ career, project }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
      <div className="flex flex-col flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black font-montserrat leading-tight">
          {project?.title || null}
        </h1>
        <h2 className="text-xs sm:text-sm font-medium text-black/50 font-montserrat mt-1">
          {project?.description || null}
        </h2>
      </div>
      <div className="shrink-0">
        <span className="inline-block font-montserrat font-semibold text-[#06275A] bg-nav px-4 py-1.5 rounded-full text-xs sm:text-sm">
          {career?.career_name || null}
        </span>
      </div>
    </div>
  );
}

export default TitleProject
