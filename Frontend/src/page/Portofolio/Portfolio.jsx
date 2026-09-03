/* eslint-disable react-hooks/exhaustive-deps */
import { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PortfolioHooks from '../../hooks/PortfolioHooks'
import Template2 from './Template/Template2';
import PortfolioSkeleton from './PortfolioSkeleton';
import { useUser } from '../../context/UserContext';
import { useCareer } from '../../context/CareerContext';
import CareerOptions from '../../data/careerOptions.json';
import ProjectHook from '../../hooks/ProjectHook';


const Portfolio = () => {
    const [skillsData, setSkillsData] = useState([]);
    const [projectsData, setProjectsData] = useState([]);
    const { user } = useUser();
    const { careerData } = useCareer();
    const { portfolioData, loading, error, fetchPortfolio, updatePortfolio } = PortfolioHooks();
    const { id } = useParams();
    const careerOptions = CareerOptions.careers.find(c => c.name === careerData?.career_name);
    const { projectData, fetchProject } = ProjectHook();
    const [skill, setSkill] = useState(null);

    const getSkillsData = () => {
        if (careerData?.skills_mastery && careerOptions) {
            const skills = careerData.skills_mastery.map((skill, idx) => ({
                id: idx + 1,
                title: careerOptions?.skills.find(s => s.id === skill.skill_id)?.name || 'Unknown Skill',
                description: careerOptions?.skills.find(s => s.id === skill.skill_id)?.description || 'No description',
            }));
            setSkillsData(skills);
            console.log('Skills updated:', skills);
        } else {
            setSkillsData([]);
        }
    };

    const getSkill = () => {
        const skillData = portfolioData?.skills_mastery;
        const careerName = portfolioData?.career_name; 
        const SkillOptions = CareerOptions.careers.find(c => c.name === careerName)?.skills || [];
        
        if (skillData?.length > 0 && SkillOptions.length > 0) {
            const transformedSkills = skillData.map((skill, idx) => {
                const skillInfo = SkillOptions.find(so => so.id === skill.skill_id);
                return {
                    id: idx + 1,
                    title: skillInfo?.name || skill.skill_id,
                    description: skillInfo?.description || 'No description'
                };
            });
            setSkill(transformedSkills);
        } else {
            setSkill([]); // fallback ke array kosong
        }
    };

    useEffect(() => {
        console.log('=== Portfolio Component Mount ===');
        console.log('id from params:', id);
        console.log('user:', user);
        console.log('user.id:', user?.id);
    }, []);

    useEffect(() => {
        console.log('useEffect fetch portfolio triggered');
        console.log('id value:', id);
        if (id) {
            console.log('Calling fetchPortfolio with:', id);
            fetchPortfolio(id);
        } else {
            console.log('id is undefined, skipping fetchPortfolio');
        }
    }, [id]);

    useEffect(() => {
        console.log('useEffect fetch project triggered');
        console.log('user.id value:', user?.id);
        if (user?.id) {
            console.log('Calling fetchProject with:', user.id);
            fetchProject(user.id);
        } else {
            console.log('user.id is undefined, skipping fetchProject');
        }
    }, [user?.id]);

    useEffect(() => {
        getSkillsData();
    }, [careerData, careerOptions]);

    // setTimeout(() => {
    //     console.log(portfolioData || 'No portfolio data after timeout');
    // }, 5000);
    useEffect(() => {
        console.log('**Portfolio data updated:', portfolioData);
    }, [portfolioData]);

    useEffect(() => {
        getSkill();
    }, [portfolioData, careerData]); 

    console.log('___ projectData:', projectData);
    console.log('portfolioData.skills_mastery:', portfolioData?.skills_mastery);

    return (
        <div className="min-h-screen bg-gray-50">
            {loading && <PortfolioSkeleton />}

            {error && (
                <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {portfolioData ? (
                <Template2
                    data={portfolioData}
                    skillsData={skill || []}  // ← tambah || []
                    projectsData={portfolioData.projects || []}
                />
            ) : !loading && !error ? (
                <div className="p-6 text-center text-gray-500">No portfolio data available</div>
            ) : null}
        </div>
    )
}

export default Portfolio