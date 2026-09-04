import React from 'react'
import { Link } from 'react-router-dom'

const SkillDisplay = ({ data }) => {
  return (
    <div className="flex flex-col justify-start gap-2 min-w-[260px] sm:min-w-[300px] lg:min-w-[340px] max-w-[360px] rounded-xl shadow-lg border-2 border-blue-400 p-4 bg-white">
      <div className="flex flex-row items-start justify-between gap-2">
        <h1 className="text-sm sm:text-base font-semibold text-black leading-tight">{data.name}</h1>
        <span className="bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 rounded-full shrink-0">Mastered</span>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">{data.description}</p>
      <span className="inline-block bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700 rounded-full w-fit">
        {data.level}
      </span>
      <Link to="/dashboard/progress"
        className="self-start px-3 py-1 hover:translate-x-1 transition-all ease-in-out duration-300 text-xs font-semibold text-primary rounded-lg mt-auto">
        View Details →
      </Link>
    </div>
  )
}

export default SkillDisplay
