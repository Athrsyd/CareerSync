import React from 'react'

const OutputProjects = ({ project }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black font-montserrat">
        Output yang diharapkan
      </h1>
      <div className="w-full rounded-2xl p-4 sm:p-5 bg-white shadow-xl outline-2 outline-primary">
        <p className="font-montserrat text-black font-medium text-sm sm:text-base lg:text-lg leading-relaxed">
          Dari projek ini, menyatakan bahwa anda mampu membuat:
          <br />
          <span className="text-primary font-semibold">{project?.output || '—'}</span>
        </p>
      </div>
    </div>
  )
}

export default OutputProjects
