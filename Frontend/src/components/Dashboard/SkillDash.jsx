import React from 'react'
import SkillDisplay from './SkillDisplay';
import { useCareer } from '../../context/CareerContext';
import CareerOptions from '../../data/careerOptions.json'
import { Link } from 'react-router-dom';

const Skill = () => {
  const { skillsMastery } = useCareer();

  const skillsLookup = {};
  CareerOptions.careers.forEach((career) => {
    career.skills.forEach((skill) => {
      skillsLookup[skill.id] = skill;
    });
  });

  const SkillItem = skillsMastery.map((skill) => {
    const skillData = skillsLookup[skill.skill_id];
    return {
      id: skill.skill_id,
      name: skillData?.name || 'Unknown Skill',
      description: skillData?.description || '',
      level: skillData?.level || 'basic',
    };
  });

  return (
    <div className="overflow-x-auto flex flex-row gap-4 pb-2 mt-4">
      {SkillItem.map((item) => (
        <SkillDisplay key={item.id} data={item} />
      ))}
    </div>
  );
}

const SkillDash = ({ data }) => {
  const { skillsMastery } = useCareer();

  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl font-bold font-montserrat text-[#021124]">
        Skill yang sudah dikuasai
      </h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {skillsMastery && skillsMastery.length > 0 ? (
          <div className="flex-1 min-w-0">
            <Skill />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center my-6 gap-2 flex-1">
            <p className="text-gray-500 text-sm">Belum ada skill yang dikuasai.</p>
            <Link to='/dashboard/project'>
              <button className="px-3 py-1.5 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-600">
                Selesaikan project untuk menguasai skill!
              </button>
            </Link>
          </div>
        )}
        <div className="flex flex-row sm:flex-col w-full sm:w-auto justify-center items-center gap-2 mt-2 sm:mt-4 shrink-0">
          <h1 className="text-base sm:text-xl lg:text-2xl font-semibold font-montserrat text-[#021124] text-center">
            Kamu berada di
          </h1>
          <h1 className="text-base sm:text-xl font-semibold font-montserrat bg-primary px-4 py-1 rounded-lg text-white">
            {data?.level || 'N/A'} level
          </h1>
          <p className="hidden sm:block text-sm sm:text-base font-[450] font-montserrat text-[#021124] text-center">
            Terus tingkatkan skill-mu
          </p>
        </div>
      </div>
    </div>
  );
}

export default SkillDash
