/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiMenu, FiX } from 'react-icons/fi';
import logo from '../../../assets/Logo_CareerSync.svg';

// ─── colour tokens (Professional Classic)
const C = {
  navy:    '#1a2744',
  navyDark:'#111c35',
  teal:    '#3498DB',
  tealLight:'#ebf5fb',
  offWhite:'#f8f9fa',
  border:  '#dee2e6',
};

const TemplateProfessional = ({ data, skillsData, projectsData }) => {
  const [activeNav,      setActiveNav]      = useState('home');
  const [visibleSkills,  setVisibleSkills]  = useState(4);
  const [visibleProjects,setVisibleProjects]= useState(3);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [formData,       setFormData]       = useState({ name:'', email:'', subject:'', message:'' });

  const navItems = ['home','about','skills','projects','contact'];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
    setActiveNav(id);
    setSidebarOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) { alert('Semua field harus diisi!'); return; }
    const link = `mailto:${data.email}?subject=${encodeURIComponent(`[Portfolio] ${formData.subject}`)}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = link;
    setFormData({ name:'', email:'', subject:'', message:'' });
  };

  /* ── sidebar content (reused for desktop & mobile drawer) ── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full py-8 px-6 gap-6 overflow-y-auto">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        {data.photo ? (
          <img src={data.photo} alt={data.fullname}
            className="w-28 h-28 rounded-full object-cover border-4"
            style={{ borderColor: C.teal }} />
        ) : (
          <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold text-white"
            style={{ background: C.teal }}>
            {data.fullname?.[0]?.toUpperCase() || 'P'}
          </div>
        )}
        <div className="text-center">
          <h1 className="text-lg font-bold text-white leading-tight">{data.fullname}</h1>
          <p className="text-sm mt-0.5" style={{ color: C.teal }}>{data.level} {data.career_name}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/20" />

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map(item => (
          <button key={item} onClick={() => scrollTo(item)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200 text-left"
            style={{
              background: activeNav === item ? C.teal : 'transparent',
              color: activeNav === item ? '#fff' : 'rgba(255,255,255,0.65)',
            }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: activeNav === item ? '#fff' : C.teal }} />
            {item === 'projects' ? 'Projects' : item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="h-px bg-white/20" />

      {/* Contact info */}
      <div className="flex flex-col gap-3 text-xs" style={{ color:'rgba(255,255,255,0.6)' }}>
        {data.email && (
          <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-white transition-colors break-all">
            <FiMail size={13} className="shrink-0" style={{ color: C.teal }} />
            {data.email}
          </a>
        )}
        {data.phone_number && (
          <span className="flex items-center gap-2">
            <FiPhone size={13} className="shrink-0" style={{ color: C.teal }} />
            {data.phone_number}
          </span>
        )}
        {data.address && (
          <span className="flex items-center gap-2">
            <FiMapPin size={13} className="shrink-0" style={{ color: C.teal }} />
            {data.address}
          </span>
        )}
      </div>

      {/* Social */}
      <div className="flex gap-3 mt-auto">
        {data.linkedin_link  && <a href={data.linkedin_link}  target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: C.teal }}><FaLinkedin  size={18} /></a>}
        {data.instagram_link && <a href={data.instagram_link} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: C.teal }}><FaInstagram size={18} /></a>}
        {data.github_link    && <a href={data.github_link}    target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: C.teal }}><FaGithub    size={18} /></a>}
      </div>
    </div>
  );

  /* ── section wrapper ── */
  const Section = ({ id, title, bg='white', children }) => (
    <section id={id} className="py-16 px-6 md:px-12 lg:px-16" style={{ background: bg }}>
      <div className="max-w-4xl mx-auto">
        {title && (
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: C.navy }}>{title}</h2>
            <div className="flex-1 h-0.5" style={{ background: C.teal }} />
          </div>
        )}
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: C.offWhite }}>

      {/* ── Desktop Sidebar (fixed left) ── */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 fixed top-0 left-0 h-screen z-40"
        style={{ background: C.navy }}>
        <SidebarContent />
      </aside>

      {/* ── Mobile: top bar + drawer ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 shadow-md"
        style={{ background: C.navy }}>
        <span className="text-white font-bold text-sm">{data.fullname}</span>
        <button onClick={() => setSidebarOpen(o => !o)} className="text-white p-1">
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </header>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-0 left-0 w-72 h-full z-50" style={{ background: C.navy }}
            onClick={e => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="flex-1 md:ml-64 lg:ml-72 mt-14 md:mt-0 min-w-0">

        {/* Hero */}
        <section id="home" className="min-h-screen flex items-center px-6 md:px-12 lg:px-16 py-20"
          style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #243b6e 60%, #2c4a8a 100%)` }}>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: C.teal }}>
              {data.level} Professional
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              {data.fullname}
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-2" style={{ color:'rgba(255,255,255,0.72)' }}>
              {data.career_name}
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color:'rgba(255,255,255,0.55)' }}>
              {data.about_me?.substring(0, 180)}{data.about_me?.length > 180 ? '...' : ''}
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo('projects')}
                className="px-7 py-3 rounded-md text-sm font-bold transition-all hover:brightness-110"
                style={{ background: C.teal, color:'#fff' }}>
                Lihat Projects
              </button>
              <button onClick={() => scrollTo('contact')}
                className="px-7 py-3 rounded-md text-sm font-bold border transition-all hover:bg-white/10"
                style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>
                Hubungi Saya
              </button>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="Tentang Saya">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{data.about_me}</p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label:'Pendidikan', value: data.education },
                { label:'Hobi',      value: data.hobbies },
                { label:'Pengalaman',value: data.experience },
              ].map(item => item.value && (
                <div key={item.label} className="rounded-lg p-4 border-l-4 bg-white shadow-sm"
                  style={{ borderLeftColor: C.teal }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: C.teal }}>{item.label}</p>
                  <p className="text-sm text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Keahlian" bg={C.offWhite}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillsData.slice(0, visibleSkills).map(skill => (
              <div key={skill.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-8 rounded-full" style={{ background: C.teal }} />
                  <h3 className="font-bold text-gray-800">{skill.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed pl-5">{skill.description}</p>
                <span className="mt-3 inline-block text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ background: C.tealLight, color: C.teal }}>Mastered</span>
              </div>
            ))}
          </div>
          {skillsData.length > 4 && (
            <div className="flex justify-center mt-8">
              <button onClick={() => setVisibleSkills(v => v < skillsData.length ? skillsData.length : 4)}
                className="px-8 py-2.5 rounded-md text-sm font-bold border transition-all hover:brightness-110"
                style={{ borderColor: C.teal, color: C.teal }}>
                {visibleSkills < skillsData.length ? 'Lihat Semua' : 'Tampilkan Lebih Sedikit'}
              </button>
            </div>
          )}
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects">
          <div className="flex flex-col gap-5">
            {(projectsData || []).slice(0, visibleProjects).map((proj, i) => (
              <div key={proj.id || i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
                <div className="md:w-2 shrink-0" style={{ background: i % 2 === 0 ? C.teal : C.navy }} />
                <div className="p-6 flex-1">
                  <h3 className="text-lg font-bold mb-1" style={{ color: C.navy }}>{proj.project_title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{proj.project_description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(proj.tools_used || []).map((t, idx) => (
                      <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: C.tealLight, color: C.teal }}>{t}</span>
                    ))}
                  </div>
                  {proj.project_output && (
                    <p className="text-xs text-gray-400 mt-3 italic">Output: {proj.project_output}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {(projectsData || []).length > 3 && (
            <div className="flex justify-center mt-8">
              <button onClick={() => setVisibleProjects(v => v < projectsData.length ? projectsData.length : 3)}
                className="px-8 py-2.5 rounded-md text-sm font-bold border transition-all"
                style={{ borderColor: C.teal, color: C.teal }}>
                {visibleProjects < projectsData.length ? 'Lihat Semua' : 'Tampilkan Lebih Sedikit'}
              </button>
            </div>
          )}
        </Section>

        {/* Contact */}
        <Section id="contact" title="Hubungi Saya" bg={C.offWhite}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-5">
              <p className="text-sm text-gray-500 leading-relaxed">
                Tertarik untuk berkolaborasi atau sekadar ngobrol? Kirimkan pesan dan saya akan segera merespons.
              </p>
              {[
                { icon: <FiMail size={16} />, label: data.email, href:`mailto:${data.email}` },
                { icon: <FiPhone size={16} />, label: data.phone_number },
                { icon: <FiMapPin size={16} />, label: data.address },
              ].map((item, i) => item.label && (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: C.tealLight, color: C.teal }}>{item.icon}</div>
                  {item.href
                    ? <a href={item.href} className="text-sm text-gray-700 hover:underline break-all">{item.label}</a>
                    : <span className="text-sm text-gray-700">{item.label}</span>}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { label:'Nama',   name:'name',    type:'text',  placeholder:'Nama Anda' },
                { label:'Email',  name:'email',   type:'email', placeholder:'Email Anda' },
                { label:'Subjek', name:'subject', type:'text',  placeholder:'Subjek' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: C.navy }}>{f.label}</label>
                  <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleFormChange}
                    placeholder={f.placeholder} required
                    className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors"
                    style={{ borderColor: C.border }}
                    onFocus={e => e.target.style.borderColor = C.teal}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: C.navy }}>Pesan</label>
                <textarea name="message" rows={4} value={formData.message} onChange={handleFormChange}
                  placeholder="Pesan Anda..." required
                  className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none resize-none transition-colors"
                  style={{ borderColor: C.border }}
                  onFocus={e => e.target.style.borderColor = C.teal}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
              <button type="submit"
                className="py-3 rounded-lg text-sm font-bold text-white transition-all hover:brightness-110"
                style={{ background: C.teal }}>
                Kirim Pesan
              </button>
            </form>
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-6 px-6 md:px-12 text-center text-xs flex flex-col items-center gap-2"
          style={{ background: C.navyDark, color:'rgba(255,255,255,0.45)' }}>
          <p>&copy; {new Date().getFullYear()} {data.fullname}. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Built with CareerSync</span>
            <img src={logo} alt="CareerSync" width={18} />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default TemplateProfessional;
