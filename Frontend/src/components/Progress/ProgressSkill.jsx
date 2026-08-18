import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SkillCard = ({ skill, isCompleted, curProjectId, isLeft }) => {
  return (
    /* On mobile: full width stacked. On md+: keep zigzag layout */
    <div className="relative w-full flex">
      {/* Connector line — hidden on mobile */}
      <div className={`
        hidden md:block absolute top-1/2 h-[2.5px] bg-blue-300
        ${isLeft ? "right-[49%] w-28 mr-2" : "left-[49%] w-24 ml-2.5"}
      `} />

      <div className={`
        flex flex-row w-full md:w-80 lg:w-96 min-h-36 rounded-2xl bg-white outline-2 px-4 py-3 outline-primary
        ${isLeft ? "md:mr-auto" : "md:ml-auto md:mr-6"}
      `}>
        <div className="flex flex-col flex-1 mt-3 gap-2">
          <h1 className="font-bold text-base sm:text-lg font-montserrat text-black">
            {skill.name}
          </h1>
          <p className="text-xs sm:text-sm font-montserrat font-[450] text-black/50">
            {skill.description}
          </p>
          {curProjectId === skill.id && (
            <Link to="/dashboard/project" className="mb-3">
              <p className="text-xs font-bold text-blue-500 font-montserrat hover:translate-x-1 transition-transform duration-200">
                Kerjakan Project →
              </p>
            </Link>
          )}
        </div>
        <div className={`flex rounded-full h-6 px-2 py-1 shrink-0 mt-3 ${isCompleted ? "text-[#51B673] bg-[#DEF2E5] w-20" : "text-red-950 bg-red-400 w-28"}`}>
          <h1 className="font-montserrat font-[550] text-[10px] w-full">
            {isCompleted ? "Completed" : "Not Completed"}
          </h1>
        </div>
      </div>
    </div>
  );
};

const LevelSection = ({ label, skills, skillsMastery, curProjectId }) => (
  <>
    <div className="w-full flex flex-col items-center">
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full z-10"></div>
      <div className="z-10 bg-blue-200 px-4 py-1 rounded-full text-sm font-medium">{label}</div>
    </div>
    {skills?.map((skill, index) => {
      const isCompleted = skillsMastery.some((m) => m.id === skill.id);
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

const ProgressSkill = ({ skillsBasic, skillsIntermediate, skillsAdvanced, skillsMastery, curProjectId }) => {
  return (
    <div className="
      relative flex flex-col gap-8 items-center
      before:content-['']
      before:absolute
      before:top-0
      before:left-1/2
      md:before:-translate-x-1/2
      before:-translate-x-1/2
      before:w-[3px]
      before:h-full
      before:bg-blue-300
    ">
      <LevelSection label="Basic" skills={skillsBasic} skillsMastery={skillsMastery} curProjectId={curProjectId} />
      <LevelSection label="Intermediate" skills={skillsIntermediate} skillsMastery={skillsMastery} curProjectId={curProjectId} />
      <LevelSection label="Advanced" skills={skillsAdvanced} skillsMastery={skillsMastery} curProjectId={curProjectId} />
    </div>
  );
}

export default ProgressSkill;
