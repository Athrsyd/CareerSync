import { useEffect } from 'react'
import NavDash from '../../components/Dashboard/NavDash'
import WelcomeDash from '../../components/Dashboard/WelcomeDash'
import SkkillDash from '../../components/Dashboard/SkillDash'
import RecommendProject from '../../components/Dashboard/RecommendProjectDash';
import LibraryReadinessDash from '../../components/Dashboard/LibraryReadinessDash';
import Navbar from '../../components/Global/Navbar';
import { useUser } from '../../context/UserContext';
import { useCareer } from '../../context/CareerContext';
import { useCurrentProject } from '../../context/CurrentProjectContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Dashboard = () => {
  const { user } = useUser();
  const { careerData } = useCareer();
  const { currentProject } = useCurrentProject();

  return (
    <>
      <NavDash />
      {/* md: sidebar w-16, lg: sidebar w-40 | mobile: bottom nav → add pb-20 */}
      <main className="md:ml-[84px] lg:ml-[180px] overflow-x-hidden min-w-0 pb-24 md:pb-5">
        <Navbar />
        <div className="flex flex-col items-center mt-6 px-4">
          <WelcomeDash user={user} data={careerData} />
        </div>
        <div className="flex flex-col mt-8 px-4">
          {careerData
            ? <SkkillDash data={careerData} />
            : <Skeleton count={2} height={150} style={{ borderRadius: '1rem' }} />
          }
        </div>
        <div className="flex flex-col mt-8 px-4">
          {currentProject ? (
            <RecommendProject project={currentProject} career={careerData} />
          ) : (
            <Skeleton count={1} height={200} style={{ borderRadius: '1rem' }} />
          )}
        </div>
        <div className="flex flex-col mt-8 px-4">
          <LibraryReadinessDash />
        </div>
        <br />
      </main>
    </>
  );
}

export default Dashboard
