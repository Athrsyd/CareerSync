/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import logo from '../../../assets/Logo_CareerSync.svg';

const TemplateMinimalist = ({ data, skillsData, projectsData }) => {
    const [isMenuOpen,     setIsMenuOpen]     = useState(false);
    const [activeNav,      setActiveNav]      = useState('home');
    const [visibleSkills,  setVisibleSkills]  = useState(3);
    const [visibleProjects,setVisibleProjects]= useState(2);
    const [formData,       setFormData]       = useState({ name:'', email:'', subject:'', message:'' });

    const hasPhoto = Boolean(data?.photo);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Semua field harus diisi!'); return;
        }
        const mailtoLink = `mailto:${data.email}?subject=${encodeURIComponent(`New Message: ${formData.subject}`)}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        setFormData({ name:'', email:'', subject:'', message:'' });
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
        setActiveNav(id);
        setIsMenuOpen(false);
    };

    const navItems = ['home','about','skills','projects','contact'];

    return (
        <div className="bg-white text-gray-900 overflow-x-hidden">

            {/* ── Navbar ── */}
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <span className="text-lg font-bold text-blue-600 truncate max-w-[160px] sm:max-w-none">
                            Portfolio {data?.fullname}
                        </span>

                        {/* Desktop nav */}
                        <div className="hidden md:flex gap-6 lg:gap-8">
                            {navItems.map(item => (
                                <button key={item} onClick={() => scrollToSection(item)}
                                    className={`capitalize text-sm font-medium transition-colors ${activeNav === item ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}>
                                    {item === 'projects' ? 'Work' : item}
                                </button>
                            ))}
                        </div>

                        {/* Hamburger */}
                        <button className="md:hidden text-gray-600 hover:text-blue-600 p-1"
                            onClick={() => setIsMenuOpen(o => !o)}>
                            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pb-4 space-y-1 border-t border-gray-100 mt-1">
                            {navItems.map(item => (
                                <button key={item} onClick={() => scrollToSection(item)}
                                    className="block w-full text-left px-4 py-2.5 capitalize text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                                    {item === 'projects' ? 'Work' : item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* ── Hero ── */}
            <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex flex-col ${hasPhoto ? 'md:flex-row' : ''} items-center gap-10 md:gap-12 min-h-[80vh] justify-center`}>

                        {/* Text */}
                        <div className={`${hasPhoto ? 'w-full md:w-1/2' : 'w-full max-w-2xl'} text-center md:text-left`}>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
                                Halo, Saya{' '}
                                <span className="text-blue-600 block sm:inline">{data?.fullname}</span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                                Selamat datang di Portfolio saya! Saya seorang{' '}
                                <span className="font-semibold text-blue-600">{data?.level} {data?.career_name}</span>.
                                Mari bangun kerja sama yang hebat dan ciptakan sesuatu yang luar biasa bersama-sama.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <button onClick={() => scrollToSection('skills')}
                                    className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">
                                    Lihat Ketrampilan
                                </button>
                                <button onClick={() => scrollToSection('contact')}
                                    className="border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base">
                                    Mari Terhubung
                                </button>
                            </div>
                        </div>

                        {/* Photo */}
                        {hasPhoto && (
                            <div className="w-full md:w-1/2 flex justify-center">
                                <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
                                    <img src={data.photo} alt="Profile"
                                        className="w-full h-full object-cover rounded-full border-4 border-blue-600 shadow-lg" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── About ── */}
            <section id="about" className="py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">About Me</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div>
                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{data?.about_me}</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label:'Pendidikan Terakhir', value: data?.education },
                                { label:'Hobi',               value: data?.hobbies   },
                                { label:'Pengalaman',          value: data?.experience},
                            ].map(item => item.value && (
                                <div key={item.label} className="bg-blue-50 p-5 rounded-lg">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{item.label}</h3>
                                    <p className="text-gray-600 text-sm sm:text-base">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Skills ── */}
            <section id="skills" className="py-16 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">My Skills</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skillsData.slice(0, visibleSkills).map(skill => (
                            <div key={skill.id}
                                className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md flex flex-col border border-blue-500 transition-shadow duration-300">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 text-center">{skill.title}</h3>
                                <p className="text-gray-700 text-sm sm:text-base text-justify leading-relaxed">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                    {skillsData.length > 3 && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={() => setVisibleSkills(v => v < skillsData.length ? skillsData.length : 3)}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base">
                                {visibleSkills < skillsData.length ? 'Lihat Lebih Banyak' : 'Lihat Lebih Sedikit'}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Projects ── */}
            <section id="projects" className="py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {(projectsData || []).slice(0, visibleProjects).map((project) => (
                            <div key={project.id}
                                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="h-40 sm:h-48 bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
                                        <path fill="#fff" d="M19 4h-4.18a2.988 2.988 0 0 0-5.64 0H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2V6a2.006 2.006 0 0 0-2-2m-7 0a1 1 0 1 1-1 1a1.003 1.003 0 0 1 1-1m-2 5l2.79 2.794l2.52-2.52L14 8h4v4l-1.276-1.311l-3.932 3.935L10 11.83l-2.586 2.584L6 13Zm9 10H5v-2h14Z" />
                                    </svg>
                                </div>
                                <div className="p-5 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{project.project_title}</h3>
                                    <p className="text-gray-600 text-sm sm:text-base mb-4">{project.project_description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(project.tools_used || []).map((tech, idx) => (
                                            <span key={idx}
                                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {(projectsData && projectsData.length > 2) && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={() => setVisibleProjects(v => v < projectsData.length ? projectsData.length : 2)}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">
                                {visibleProjects < projectsData.length ? 'Lihat Lebih Banyak' : 'Lihat Lebih Sedikit'}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Contact ── */}
            <section id="contact" className="py-16 md:py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">Get In Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                        {/* Info */}
                        <div className="space-y-5">
                            {[
                                { label:'Email',     value: data?.email,        href:`mailto:${data?.email}` },
                                { label:'LinkedIn',  value: data?.linkedin_link, href: data?.linkedin_link, ext:true },
                                { label:'Instagram', value: data?.instagram_link,href: data?.instagram_link, ext:true },
                            ].map(item => item.value && (
                                <div key={item.label}>
                                    <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                                    <a href={item.href} className="text-sm text-gray-600 hover:text-blue-600 break-all"
                                        target={item.ext ? '_blank' : undefined}
                                        rel={item.ext ? 'noopener noreferrer' : undefined}>
                                        {item.value}
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {[
                                { label:'Name',    name:'name',    type:'text',  ph:'Your name' },
                                { label:'Email',   name:'email',   type:'email', ph:'Your email' },
                                { label:'Subject', name:'subject', type:'text',  ph:'Subject' },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">{f.label}</label>
                                    <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleFormChange}
                                        placeholder={f.ph} required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 transition-colors" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1.5 text-sm">Message</label>
                                <textarea rows={4} name="message" value={formData.message} onChange={handleFormChange}
                                    placeholder="Your message" required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 resize-none transition-colors" />
                            </div>
                            <button type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="bg-gray-900 text-gray-300 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                        <p className="text-sm text-center sm:text-left">
                            &copy; {new Date().getFullYear()} {data?.fullname || 'Your Name'}. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            {data?.github_link    && <a href={data.github_link}    className="hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer"><FaGithub    size={20} /></a>}
                            {data?.linkedin_link  && <a href={data.linkedin_link}  className="hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer"><FaLinkedin  size={20} /></a>}
                            {data?.instagram_link && <a href={data.instagram_link} className="hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /></a>}
                            {data?.email          && <a href={`mailto:${data.email}`} className="hover:text-blue-400 transition-colors"><FiMail size={20} /></a>}
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-5 text-center text-xs flex flex-row justify-center items-center gap-2">
                        <p>Built with CareerSync</p>
                        <img src={logo} alt="CareerSync" width={22} />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TemplateMinimalist;
