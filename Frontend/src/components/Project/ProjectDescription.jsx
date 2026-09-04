import React from 'react'

const ProjectDescription = ({ project }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-montserrat text-black">
        Instruksi Pengerjaan
      </h1>
      <p className="text-sm sm:text-base lg:text-lg font-montserrat text-black/50 leading-relaxed text-justify indent-4 font-medium">
        {project?.instruction || null}
      </p>
    </div>
  );
}

export default ProjectDescription
