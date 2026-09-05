import { useState, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Pretest/Header';
import Skill from '../../components/Pretest/Skill';
import CareerOptions from '../../data/careerOptions.json'
import CareerHooks from '../../hooks/CareerHooks';
import background from '../../assets/bg-auth.jpeg'
import { useCareer } from '../../context/CareerContext';
import { useUser } from '../../context/UserContext';

const Pretest = () => {

    const { user } = useUser();
    const [page, setPage] = useState(1);
    const [dataCareer] = useState(CareerOptions.careers);
    const [selectedCareer, setSelectedCareer] = useState('');
    const [skillList, setSkillList] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedCareerName, setSelectedCareerName] = useState('');
    const [preventNext, setPreventNext] = useState(false);
    const [loading, setLoading] = useState(false);
    const { careerData, fetchCareer } = useCareer();
    const { postCareer, postReadinessScore } = CareerHooks();

    const navigate = useNavigate();

    useEffect(() => {
        if (careerData ) {
            navigate('/dashboard');
        }
    }, [careerData, navigate]);



    useEffect(() => {
        console.log(`Selected skills: ${selectedSkills.join(', ')}`);
    }, [selectedSkills])

    const handleCareerChange = (e) => {
        setSelectedCareer(e.target.value);
        setSelectedCareerName(CareerOptions.careers.find(career => career.id === e.target.value)?.name || '');
        console.log(`Selected career: ${e.target.value}`);
        setSkillList(CareerOptions.careers.find(career => career.id === e.target.value)?.skills || []);
        if (!e.target.value) {
            setPreventNext(true);
        }
        setPreventNext(false);
    }

    const selectSkill = (skillId) => {
        setSelectedSkills(prev => {
            if (prev.includes(skillId)) {
                return prev.filter(id => id !== skillId);
            } else {
                return [...prev, skillId];
            }
        });
    }

    const handleClickStepOne = () => {
        if (!selectedCareer) {
            setPreventNext(true);
        } else {
            setPage(2);
        }
    }

    const handlePrevOne = () => {
        setPage(1);
        setSelectedCareer('');
        setPreventNext(false);
        setSelectedSkills([]);
        setSelectedCareerName('');
    }

    const handleSubmit = async () => {
        setLoading(true);
        const skillsWithWeight = selectedSkills
            .map(skillId => {
                const skill = skillList.find(s => s.id === skillId);
                if (!skill) {
                    console.warn(`Skill tidak ditemukan: ${skillId}`);
                    return null;
                }
                return {
                    skill_id: skill.id,
                    mastered: true,
                    weight: skill.weight
                };
            })
            .filter(Boolean);

        if (skillsWithWeight.length === 0) {
            console.error('Tidak ada skill yang valid');
        }

        const totalWeight = skillsWithWeight.reduce((acc, skill) => acc + skill.weight, 0);
        const level = totalWeight <= 34 ? 'Basic' : totalWeight <= 67 ? 'Intermediate' : 'Advanced';

        const payload = {
            career_name: selectedCareerName,
            skills_mastery: skillsWithWeight || [],
            level: level || 'Basic'
        };
        const payloadReadiness = {
            user_id: user?.id, // Akan diisi setelah mendapatkan data user
            readiness_point: totalWeight.toFixed(0),
            progress_date: new Date().toISOString().split('T')[0]
        };
        console.log('Data yang dikirim:', payload);

        try {
            await postCareer(payload);
            await postReadinessScore(payloadReadiness);
            console.log('Success!');
            navigate('/dashboard');
            await fetchCareer();
            // Optional: redirect atau reset form
        } catch (error) {
            console.error('Error submitting career data:', error);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='w-full h-screen items-center justify-center gap-4 '>
            <div className="background flex justify-start w-full h-screen relative -z-30" >
                <img src={background} alt="background" className=' object-cover' />
            </div>
            <div className={`container px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-15 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-[#021124]/30 w-11/12 sm:w-4/5 lg:w-3/5 max-h-[90vh] rounded-xl
                backdrop-blur-xl flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 overflow-hidden`}>
                <Header data={page} />

                {page === 1 ? (
                    <>
                        <div className="container flex flex-col items-center justify-center gap-4 w-full">
                            <div className="w-full sm:w-17/20 flex items-start justify-start px-4 sm:px-0">
                                <h1 className='text-lg sm:text-xl md:text-2xl text-start font-bold mb-2 text-white'>Apa tujuan karir Anda?</h1>
                            </div>
                            <select name="careerGoal" id="careerGoal"
                                className='bg-[#021124] text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-11/12 sm:w-17/20 h-16 sm:h-20 p-4 sm:p-5 rounded-2xl text-sm sm:text-base'
                                onChange={handleCareerChange}
                            >
                                <option value="">Pilih tujuan karir Anda</option>
                                {dataCareer.map((career, index) => (
                                    <option key={index} value={career.id}>{career.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="container w-full flex flex-col items-center justify-center gap-2">
                            <button
                                className={`bg-primary w-11/12 sm:w-9/10 rounded-2xl text-white py-3 px-4 sm:px-6 text-sm sm:text-base hover:bg-[#0a3d7a] transition-colors duration-300 ${preventNext ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleClickStepOne}
                                disabled={preventNext}
                            >
                                Next
                            </button>
                            <span className={`text-red-700 text-xs sm:text-sm ${preventNext ? 'block' : 'hidden'}`}>Pilih tujuan karir anda terlebih dahulu</span>
                        </div>
                    </>
                ) : page === 2 ? (
                    <>
                        <div className="container flex flex-col items-center justify-center gap-4 w-full flex-1">
                            <h1 className='text-lg sm:text-xl md:text-2xl text-center font-bold mb-2 text-white px-2'>Apa saja skill yang sudah anda kuasai ?</h1>
                            <div className="w-full sm:w-17/20 h-50 sm:h-60 pt-2 px-3 sm:px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 overflow-auto">
                                {skillList.map((skill, index) => (
                                    <Skill
                                        key={index}
                                        skillName={skill.name}
                                        skillId={skill.id}
                                        isSelected={selectedSkills.includes(skill.id)}
                                        onClick={() => selectSkill(skill.id)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="buttons mt-6 lg:-mt-6 flex w-full flex-col sm:flex-row items-center justify-center gap-4  sm:gap-10 px-4 sm:px-0">
                            <button onClick={handlePrevOne} className='bg-primary w-full sm:w-9/10 rounded-2xl text-white py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base hover:bg-[#0a3d7a] transition-colors duration-300 font-semibold'>Prev</button>
                            <button onClick={() => setPage(page + 1)} className='bg-primary w-full sm:w-9/10 rounded-2xl text-white py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base hover:bg-[#0a3d7a] transition-colors duration-300 font-semibold'>Next</button>
                        </div>
                    </>
                ) : page === 3 ? (
                    <>
                        <div className="container flex flex-col items-center justify-center gap-6 sm:gap-8 w-full flex-1 px-3 sm:px-0">
                            <div className="w-full sm:w-17/20">
                                <h1 className='text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6'>Konfirmasi Pilihan Anda</h1>
                                <div className="container flex flex-col items-start justify-center gap-3">
                                    <div className='bg-linear-to-br from-[#021124]/60 to-[#0a2847]/40 w-full rounded-2xl p-2 sm:p-3 border-2 border-primary/30'>
                                        <div className="flex items-center gap-2 mb-2">

                                            <span className="text-primary font-bold text-lg sm:text-xl">✓</span>
                                            <h2 className='text-base sm:text-lg font-semibold text-gray-300'>Tujuan Karir <span className='opacity-50 text-xs sm:text-sm'>(anda tidak bisa mengubahnya setelah ini)</span></h2>
                                        </div>
                                        <p className='text-lg sm:text-xl font-bold text-white ml-6 wrap-break-words'>{selectedCareerName}</p>
                                    </div>
                                    <div className='bg-linear-to-br from-[#021124]/60 to-[#0a2847]/40 w-full rounded-2xl p-2 sm:p-3 border-2 border-primary/30'>
                                        <div className="flex items-center gap-2 mb-3">
                                            {selectedSkills.length > 0 ? (
                                                <span className="text-primary font-bold text-lg sm:text-xl">✓</span>
                                            ) : (
                                                null)}
                                            <h2 className='text-base sm:text-lg font-semibold text-gray-300'>{selectedSkills.length > 0 ? 'Skills yang Anda Miliki:' : 'Anda belum memilih skill apapun'}</h2>
                                        </div>
                                        <div className="flex flex-wrap gap-2 ml-6">
                                            {selectedSkills.map((skillId, index) => {
                                                const skill = skillList.find(s => s.id === skillId);
                                                return skill ? (
                                                    <span key={index} className='bg-primary/20 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold'>{skill.name}</span>
                                                ) : (
                                                    <span key={index} className='bg-primary/20 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold'>Anda belum memilih skill apapun</span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="buttons mt-6 lg:-mt-6 flex w-full flex-col sm:flex-row items-center justify-center gap-4  sm:gap-10 px-4 sm:px-0">
                            <button onClick={() => setPage(page - 1)} className='bg-primary w-full sm:w-9/10 rounded-2xl text-white py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base hover:bg-[#0a3d7a] transition-colors duration-300 font-semibold'>Sebelumnya</button>
                            <button onClick={handleSubmit} className='bg-primary w-full sm:w-9/10 rounded-2xl text-white py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base hover:bg-[#0a3d7a] transition-colors duration-300 font-semibold'>Ayo buktikan skill mu</button>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default Pretest