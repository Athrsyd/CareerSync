/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useCareer } from '../../context/CareerContext';
import TitleProgress from '../../components/Progress/TitleProgress';
import ProgressSkill from '../../components/Progress/ProgressSkill';
import Navbar from '../../components/Global/Navbar';
import NavDash from '../../components/Dashboard/NavDash';
import CareerOptions from '../../data/careerOptions.json'
import { useCurrentProjectContext } from '../../context/CurrentProjectContext'

const Progress = () => {
  const { user } = useUser();
  const { careerData, skillsMastery } = useCareer();
  const [skillsBasic, setSkillsBasic] = useState([]);
  const [skillsIntermediate, setSkillsIntermediate] = useState([]);
  const [skillsAdvanced, setSkillsAdvanced] = useState([]);
  const [skillsMasteryProgress, setSkillsMastery] = useState([]);
  const { currentProject } = useCurrentProjectContext();
  const [curProjectId, setCurProjectId] = useState(null);

  const getSkillbyCareerName = () => {
    if (!careerData) return;
    const skill = CareerOptions.careers.find(career => career.name === careerData.career_name)
    if (!skill) return;
    setSkillsBasic(skill.skills.filter(s => s.level === 'basic'));
    setSkillsIntermediate(skill.skills.filter(s => s.level === 'intermediate'));
    setSkillsAdvanced(skill.skills.filter(s => s.level === 'advanced'));
  }

  const getMasteredSkillFromBackend = () => {
    if (!careerData) return;
    const skill = CareerOptions.careers.find(career => career.name === careerData.career_name)
    if (!skill) return;
    const skillsMasteryProgress = skill.skills.filter(s => {
      return skillsMastery.some(sm => {
        const backendId = String(sm.skill_id).toLowerCase().trim();
        const localId = String(s.id).toLowerCase().trim();
        return backendId === localId && (sm.mastered === true || sm.mastered === 'true');
      });
    });
    setSkillsMastery(skillsMasteryProgress);
  }

  useEffect(() => {
    getSkillbyCareerName();
    getMasteredSkillFromBackend();
  }, [careerData]);

  useEffect(() => {
    if (currentProject) setCurProjectId(currentProject.skill_id);
  }, [currentProject]);

  return (
    <>
      <NavDash />
      <main className="md:ml-[84px] lg:ml-[180px] overflow-x-hidden min-w-0 pb-24 md:pb-5">
        <Navbar />
        <div className="flex flex-col mt-6 px-4">
          <TitleProgress />
        </div>
        <div className="flex flex-col mt-8 px-4">
          <ProgressSkill
            skillsBasic={skillsBasic}
            skillsIntermediate={skillsIntermediate}
            skillsAdvanced={skillsAdvanced}
            skillsMastery={skillsMasteryProgress}
            curProjectId={curProjectId}
          />
        </div>
      </main>
    </>
  );
}

export default Progress
