import { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext';
import { useCareer } from '../../context/CareerContext';
import TitleProject from '../../components/Project/TitleProject';
import LevelAndTools from '../../components/Project/LevelAndTools';
import ProjectDescription from '../../components/Project/ProjectDescription';
import OutputProjects from '../../components/Project/OutputProjects';
import Navbar from '../../components/Global/Navbar';
import NavDash from '../../components/Dashboard/NavDash';
import { useCurrentProject } from '../../context/CurrentProjectContext';
import Popup from '../../components/Project/Popup';
import CareerHooks from '../../hooks/CareerHooks';
import careerOptions from '../../data/careerOptions.json'
import ProjectHook from '../../hooks/ProjectHook';
import { Link } from 'react-router-dom';

const Project = () => {
  const { user } = useUser();
  const { careerData, fetchCareer, projects, skillsMastery, unFinishedProjects } = useCareer();
  const { currentProject } = useCurrentProject();
  const [showModal, setShowModal] = useState(false);
  const { updateMasterySkill, postReadinessScore } = CareerHooks();
  const { postProject, loading } = ProjectHook();
  const { readiness } = useCareer();

  const handleSubmitProject = async () => {
    if (!careerData?.id || !currentProject?.skill_id) return;

    const selectedCareer = careerOptions.careers.find(c => c.name === careerData?.career_name);
    const selectedSkill = selectedCareer?.skills.find(s => s.id === currentProject.skill_id);

    let updatedSkillsMastery = (careerData.skills_mastery || []).map((skill) => {
      if (skill.skill_id === currentProject.skill_id) return { ...skill, mastered: true };
      return skill;
    });

    if (!updatedSkillsMastery.find(s => s.skill_id === currentProject.skill_id)) {
      updatedSkillsMastery.push({ skill_id: currentProject.skill_id, mastered: true, weight: selectedSkill?.weight || 0 });
    }

    const payload = { skills_mastery: updatedSkillsMastery, level: careerData.level || 'basic' };
    const now = new Date();
    const payloadReadiness = { user_id: careerData?.user_id, readiness_point: readiness.toFixed(0), progress_date: now.toISOString().split('T')[0] };
    const payloadProject = { project_title: currentProject.title, project_description: currentProject.description, project_output: currentProject.output, tools_used: currentProject.tools };

    window.scrollTo({ top: 0, behavior: 'smooth' });
    await updateMasterySkill(careerData.id, payload);
    await postProject(payloadProject);
    await postReadinessScore(payloadReadiness);
    await fetchCareer();
    setShowModal(false);
  };

  return (
    <>
      <NavDash />
      <main className="md:ml-[84px] lg:ml-[180px] overflow-x-hidden min-w-0 pb-24 md:pb-10">
        <Navbar />

        {unFinishedProjects && unFinishedProjects.length > 0 ? (
          <>
            <section className="mt-6 px-4 sm:px-6 lg:px-10">
              <TitleProject career={careerData} project={currentProject} />
            </section>
            <section className="mt-6 px-4 sm:px-6 lg:px-10">
              <LevelAndTools project={currentProject} />
            </section>
            <section className="mt-8 px-4 sm:px-6 lg:px-10">
              <ProjectDescription project={currentProject} />
            </section>
            <section className="mt-8 px-4 sm:px-6 lg:px-10">
              <OutputProjects project={currentProject} />
            </section>
            <section className="mt-10 px-4 sm:px-6 lg:px-10 pb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 sm:px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  Selesaikan Project
                </button>
              </div>
            </section>
            {showModal && (
              <Popup
                currentProject={currentProject}
                setShowModal={setShowModal}
                handleSubmitProject={handleSubmitProject}
                loading={loading}
              />
            )}
          </>
        ) : (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10 py-10">
            <div className="flex flex-col w-full max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black font-montserrat mb-4 text-center">
                Luar Biasa! 🎉
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-black/60 font-montserrat mb-8 text-center font-medium">
                Anda telah menguasai semua skill {careerData?.career_name}!
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-white rounded-2xl p-4 shadow-xl outline-2 outline-primary">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary font-montserrat mb-1">
                    {projects?.length || 0}
                  </p>
                  <p className="text-black/60 font-montserrat font-medium text-xs sm:text-sm">Project Diselesaikan</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-xl outline-2 outline-primary">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary font-montserrat mb-1">
                    {skillsMastery?.filter(s => s.mastered)?.length || 0}
                  </p>
                  <p className="text-black/60 font-montserrat font-medium text-xs sm:text-sm">Skill Dikuasai</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-xl outline-2 outline-primary">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary font-montserrat mb-1">
                    {careerData?.level || 'N/A'}
                  </p>
                  <p className="text-black/60 font-montserrat font-medium text-xs sm:text-sm">Level Saat Ini</p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-black/60 font-montserrat mb-8 leading-relaxed text-center font-medium">
                Perjalanan Anda menuju {careerData?.career_name} sudah mencapai pencapaian yang mengesankan.{' '}
                <strong>Anda siap untuk masuk ke dunia industri</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to={'/dashboard'}>
                  <button className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-primary text-primary font-semibold font-montserrat rounded-xl hover:bg-primary hover:text-white transition-all duration-200 shadow-lg text-sm">
                    Kembali ke Dashboard
                  </button>
                </Link>
                <Link to={'/dashboard/portfolio'}>
                  <button className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-primary text-primary font-semibold font-montserrat rounded-xl hover:bg-primary hover:text-white transition-all duration-200 shadow-lg text-sm">
                    Lihat Progress Lengkap
                  </button>
                </Link>
                <Link to={'/dashboard/portfolio'}>
                  <button className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-primary text-primary font-semibold font-montserrat rounded-xl hover:bg-primary hover:text-white transition-all duration-200 shadow-lg text-sm">
                    Buat Portofolio Anda
                  </button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default Project
