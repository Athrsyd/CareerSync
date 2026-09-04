import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const levelConfig = {
  Basic:        { color: 'bg-green-400',  pill: 'bg-green-50 text-green-700 border-green-200' },
  Intermediate: { color: 'bg-yellow-400', pill: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  Advanced:     { color: 'bg-red-400',    pill: 'bg-red-50 text-red-700 border-red-200' },
};

const SkillCard = ({ skill, isCompleted, curProjectId, isLeft }) => {
  return (
    <div className="relative w-full flex">
      {/* Connector line — hidden on mobile */}
      <div className={`
        hidden md:block absolute top-1/2 h-[2px] bg-blue-200
        ${isLeft ? 'right-[49%] w-24 mr-2' : 'left-[49%] w-24 ml-2'}
      `} />

      <div className={`
        flex flex-row w-full md:w-80 lg:w-96 rounded-2xl bg-white shadow-sm border-2
        px-4 py-4 gap-3
        ${isCompleted ? 'border-green-300' : 'border-primary/30'}
        ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}
        hover:shadow-md transition-shadow duration-200
      `}>
        {/* Status dot */}
        <div className="shrink-0 mt-1">
          <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-400' : 'bg-gray-300'}`} />
        </div>

        <div className="flex flex-col flex-1 gap-1.5 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h1 className="font-bold text-sm sm:text-base font-montserrat text-black leading-tight">
              {skill.name}
            </h1>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
              isCompleted
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-500 border-red-200'
            }`}>
              {isCompleted ? '✓ Done' : 'Belum'}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-montserrat text-black/50 leading-relaxed line-clamp-2">
            {skill.description}
          </p>

          {curProjectId === skill.id && (
            <Link to="/dashboard/project">
              <p className="text-xs font-bold text-blue-500 hover:translate-x-1 transition-transform duration-200 w-fit mt-1">
                Kerjakan Project →
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const LevelSection = ({ label, skills, skillsMastery, curProjectId }) => {
  const cfg = levelConfig[label] || { color: 'bg-blue-300', pill: 'bg-blue-50 text-blue-700 border-blue-200' };
  const mastered = skills?.filter(s => skillsMastery.some(m => m.id === s.id)).length || 0;
  const total    = skills?.length || 0;

  return (
    <>
      {/* Level header */}
      <div className="w-full flex flex-col items-center z-10">
        <div className={`w-4 h-4 rounded-full ${cfg.color} mb-1`} />
        <div className={`flex items-center gap-2 border px-4 py-1 rounded-full text-xs font-semibold ${cfg.pill}`}>
          <span>{label}</span>
          <span className="opacity-60">({mastered}/{total})</span>
        </div>
      </div>

      {skills?.map((skill, index) => {
        const isCompleted = skillsMastery.some(m => m.id === skill.id);
        return (
          <SkillCard
            key={skill.id}
            skill={skill}
            isCompleted={isCompleted}
            curProjectId={curProjectId}
            isLeft={index % 2 === 0}
          />
        );
      })}
    </>
  );
};

const ProgressSkill = ({ skillsBasic, skillsIntermediate, skillsAdvanced, skillsMastery, curProjectId }) => {
  return (
    <div className="
      relative flex flex-col gap-8 items-center pb-8
      before:content-[''] before:absolute before:top-0 before:left-1/2
      before:-translate-x-1/2 before:w-[2px] before:h-full before:bg-blue-200
    ">
      <LevelSection label="Basic"        skills={skillsBasic}        skillsMastery={skillsMastery} curProjectId={curProjectId} />
      <LevelSection label="Intermediate" skills={skillsIntermediate} skillsMastery={skillsMastery} curProjectId={curProjectId} />
      <LevelSection label="Advanced"     skills={skillsAdvanced}     skillsMastery={skillsMastery} curProjectId={curProjectId} />
    </div>
  );
}

export default ProgressSkill;
