/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PortfolioHooks from '../../hooks/PortfolioHooks'
import TemplateMinimalist  from './Template/TemplateMinimalist';
import TemplateProfessional from './Template/TemplateProfessional';
import TemplateVibrant      from './Template/TemplateVibrant';
import PortfolioSkeleton from './PortfolioSkeleton';
import { useUser } from '../../context/UserContext';
import { useCareer } from '../../context/CareerContext';
import CareerOptions from '../../data/careerOptions.json';
import ProjectHook from '../../hooks/ProjectHook';

// ── Pilih template berdasarkan field `style` dari data portfolio
const TemplateResolver = ({ data, skillsData, projectsData }) => {
    switch (data?.style) {
        case 'style2': return <TemplateProfessional data={data} skillsData={skillsData} projectsData={projectsData} />;
        case 'style3': return <TemplateVibrant      data={data} skillsData={skillsData} projectsData={projectsData} />;
        case 'style1':
        default:       return <TemplateMinimalist   data={data} skillsData={skillsData} projectsData={projectsData} />;
    }
};

const Portfolio = () => {
    const [skillsData,   setSkillsData]   = useState([]);
    const [projectsData, setProjectsData] = useState([]);
    const { user }       = useUser();
    const { careerData } = useCareer();
    const { portfolioData, loading, error, fetchPortfolio } = PortfolioHooks();
    const { id }         = useParams();
    const careerOptions  = CareerOptions.careers.find(c => c.name === careerData?.career_name);
    const { projectData, fetchProject } = ProjectHook();
    const [skill, setSkill] = useState(null);

    const getSkill = () => {
        const skillData  = portfolioData?.skills_mastery;
        const careerName = portfolioData?.career_name;
        const SkillOpts  = CareerOptions.careers.find(c => c.name === careerName)?.skills || [];

        if (skillData?.length > 0 && SkillOpts.length > 0) {
            setSkill(skillData.map((s, idx) => {
                const info = SkillOpts.find(so => so.id === s.skill_id);
                return { id: idx + 1, title: info?.name || s.skill_id, description: info?.description || 'No description' };
            }));
        } else {
            setSkill([]);
        }
    };

    useEffect(() => {
        if (id) fetchPortfolio(id);
    }, [id]);

    useEffect(() => {
        if (user?.id) fetchProject(user.id);
    }, [user?.id]);

    useEffect(() => {
        if (careerData?.skills_mastery && careerOptions) {
            setSkillsData(careerData.skills_mastery.map((s, idx) => ({
                id: idx + 1,
                title:       careerOptions.skills.find(sk => sk.id === s.skill_id)?.name        || 'Unknown Skill',
                description: careerOptions.skills.find(sk => sk.id === s.skill_id)?.description || 'No description',
            })));
        } else {
            setSkillsData([]);
        }
    }, [careerData, careerOptions]);

    useEffect(() => { getSkill(); }, [portfolioData, careerData]);

    return (
        <div className="min-h-screen bg-gray-50">
            {loading && <PortfolioSkeleton />}

            {error && (
                <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {portfolioData && !loading ? (
                <TemplateResolver
                    data={portfolioData}
                    skillsData={skill || []}
                    projectsData={portfolioData.projects || []}
                />
            ) : !loading && !error ? (
                <div className="p-6 text-center text-gray-500">No portfolio data available</div>
            ) : null}
        </div>
    );
};

export default Portfolio;
