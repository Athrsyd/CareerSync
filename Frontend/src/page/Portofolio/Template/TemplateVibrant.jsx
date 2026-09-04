/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import logo from '../../../assets/Logo_CareerSync.svg';

// ─── colour tokens (Creative Vibrant)
const C = {
  bg:       '#0f0f12',
  bgCard:   '#18181f',
  bgCard2:  '#1e1e27',
  coral:    '#FF6B6B',
  teal:     '#4ECDC4',
  yellow:   '#FFE66D',
  white:    '#ffffff',
  muted:    'rgba(255,255,255,0.5)',
  border:   'rgba(255,255,255,0.08)',
};

// accent cycling
const accents = [C.coral, C.teal, C.yellow];
const accent  = (i) => accents[i % 3];

const TemplateVibrant = ({ data, skillsData, projectsData }) => {
  const [activeNav,      setActiveNav]      = useState('home');
  const [visibleSkills,  setVisibleSkills]  = useState(6);
  const [visibleProjects,setVisibleProjects]= useState(4);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [formData,       setFormData]       = useState({ name:'', email:'', subject:'', message:'' });

  const navItems = ['home','about','skills','projects','contact'];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) { alert('Harap isi semua field!'); return; }
    const link = `mailto:${data.email}?subject=${encodeURIComponent(formData.subject || 'Pesan dari Portfolio')}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = link;
    setFormData({ name:'', email:'', subject:'', message:'' });
  };

  /* ── glowing accent pill ── */
  const Pill = ({ text, color }) => (
    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border"
      style={{ borderColor: color, color, background: `${color}18` }}>
      {text}
    </span>
  );

  /* ── section wrapper ── */
  const Section = ({ id, children, className='' }) => (
    <section id={id} className={`py-20 px-4 sm:px-8 lg:px-16 ${className}`}
      style={{ background: id === 'about' || id === 'contact' ? C.bgCard2 : C.bg }}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );

  /* ── section title ── */
  const SectionTitle = ({ title, accent: ac }) => (
    <div className="mb-12">
      <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ac }}>
        ◆ {title}
      </span>
      <h2 className="text-3xl md:text-4xl font-black text-white mt-1">{title}</h2>
      <div className="h-1 w-12 rounded-full mt-3" style={{ background: ac }} />
    </div>
  );

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(15,15,18,0.85)', backdropFilter:'blur(12px)', borderBottom:`1px solid ${C.border}` }}>
        <a href="#home" className="text-sm font-black tracking-wider" style={{ color: C.coral }}>
          {data.fullname?.split(' ')[0]?.toUpperCase() || 'PORTFOLIO'}
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)}
              className="text-sm font-semibold capitalize transition-all duration-200"
              style={{ color: activeNav === item ? C.coral : C.muted }}>
              {item}
            </button>
          ))}
        </div>

        <button onClick={() => scrollTo('contact')}
          className="hidden md:flex items-center gap-2 text-xs font-bold px-5 py-2 rounded-full transition-all hover:brightness-110"
          style={{ background: C.coral, color:'#fff' }}>
          Hubungi <FiArrowRight size={13} />
        </button>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 pt-16"
          style={{ background: 'rgba(15,15,18,0.97)' }}
          onClick={() => setMenuOpen(false)}>
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)}
              className="text-2xl font-black capitalize" style={{ color: C.white }}>
              {item}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-24 pb-20 relative overflow-hidden"
        style={{ background: C.bg }}>

        {/* decorative blobs */}
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: C.coral }} />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ background: C.teal }} />

        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.teal }}>
            Available for opportunities
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6">
            <span style={{ color: C.white }}>Hai, saya </span>
            <span style={{
              backgroundImage: `linear-gradient(90deg, ${C.coral}, ${C.yellow})`,
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>
              {data.fullname}
            </span>
          </h1>
          <p className="text-lg md:text-xl font-semibold mb-3" style={{ color: C.teal }}>
            {data.level} {data.career_name}
          </p>
          <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: C.muted }}>
            {data.about_me?.substring(0, 200)}{data.about_me?.length > 200 ? '...' : ''}
          </p>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollTo('projects')}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-black transition-all hover:scale-105"
              style={{ background: `linear-gradient(90deg, ${C.coral}, ${C.yellow})`, color:'#0f0f12' }}>
              Lihat Projects <FiArrowRight />
            </button>
            <button onClick={() => scrollTo('contact')}
              className="px-8 py-3.5 rounded-full text-sm font-bold border transition-all hover:bg-white/5"
              style={{ borderColor:'rgba(255,255,255,0.2)', color: C.white }}>
              Hubungi Saya
            </button>
          </div>

          {/* quick stats */}
          <div className="flex flex-wrap gap-6 mt-16 pt-8 border-t" style={{ borderColor: C.border }}>
            {[
              { value: skillsData?.length || 0,   label:'Skills Dikuasai' },
              { value: (projectsData||[]).length,  label:'Projects Selesai' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-black" style={{ color: accent(i) }}>{s.value}+</p>
                <p className="text-xs" style={{ color: C.muted }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <Section id="about">
        <SectionTitle title="About" ac={C.teal} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-base leading-relaxed" style={{ color:'rgba(255,255,255,0.7)' }}>{data.about_me}</p>
            {/* social row */}
            <div className="flex gap-4 mt-6">
              {data.linkedin_link  && <a href={data.linkedin_link}  target="_blank" rel="noopener noreferrer" style={{ color: C.teal }} className="hover:opacity-70"><FaLinkedin size={20} /></a>}
              {data.instagram_link && <a href={data.instagram_link} target="_blank" rel="noopener noreferrer" style={{ color: C.coral }} className="hover:opacity-70"><FaInstagram size={20} /></a>}
              {data.github_link    && <a href={data.github_link}    target="_blank" rel="noopener noreferrer" style={{ color:'#fff' }} className="hover:opacity-70"><FaGithub size={20} /></a>}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label:'🎓 Pendidikan', value: data.education,  ac: C.coral },
              { label:'🎯 Pengalaman', value: data.experience, ac: C.teal  },
              { label:'🎨 Hobi',       value: data.hobbies,    ac: C.yellow},
            ].map(item => item.value && (
              <div key={item.label} className="p-5 rounded-xl border"
                style={{ background: C.bgCard, borderColor: C.border }}>
                <p className="text-xs font-bold mb-1" style={{ color: item.ac }}>{item.label}</p>
                <p className="text-sm" style={{ color:'rgba(255,255,255,0.7)' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="skills">
        <SectionTitle title="Skills" ac={C.yellow} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsData.slice(0, visibleSkills).map((skill, i) => (
            <div key={skill.id} className="p-5 rounded-2xl border flex flex-col gap-3 hover:scale-[1.02] transition-transform"
              style={{ background: C.bgCard, borderColor: `${accent(i)}40`, borderWidth: 1 }}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white">{skill.title}</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background:`${accent(i)}20`, color: accent(i) }}>
                  ✓
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{skill.description}</p>
              <div className="h-1 rounded-full w-full mt-auto overflow-hidden" style={{ background: C.border }}>
                <div className="h-full rounded-full w-full" style={{ background: `linear-gradient(90deg, ${accent(i)}, ${accent(i+1)})`, opacity:0.8 }} />
              </div>
            </div>
          ))}
        </div>
        {skillsData.length > 6 && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setVisibleSkills(v => v < skillsData.length ? skillsData.length : 6)}
              className="px-8 py-2.5 rounded-full text-sm font-bold border transition-all hover:bg-white/5"
              style={{ borderColor: C.yellow, color: C.yellow }}>
              {visibleSkills < skillsData.length ? 'Lihat Semua Skills' : 'Tampilkan Lebih Sedikit'}
            </button>
          </div>
        )}
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects">
        <SectionTitle title="Projects" ac={C.coral} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(projectsData || []).slice(0, visibleProjects).map((proj, i) => (
            <div key={proj.id || i} className="rounded-2xl overflow-hidden border hover:scale-[1.01] transition-transform"
              style={{ background: C.bgCard, borderColor: C.border }}>
              {/* card header gradient */}
              <div className="h-32 flex items-center justify-center relative overflow-hidden"
                style={{ background:`linear-gradient(135deg, ${accent(i)}33, ${accent(i+1)}22)` }}>
                <div className="absolute inset-0" style={{ background:`linear-gradient(135deg, ${accent(i)}20, transparent)` }} />
                <span className="text-5xl font-black opacity-20 select-none" style={{ color: accent(i) }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute top-4 right-4">
                  <Pill text="Completed" color={accent(i)} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-white mb-2">{proj.project_title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>{proj.project_description}</p>
                {proj.project_output && (
                  <p className="text-xs mb-4 italic" style={{ color: `${accent(i)}99` }}>
                    Output: {proj.project_output}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {(proj.tools_used || []).map((t, ti) => (
                    <Pill key={ti} text={t} color={accent(ti)} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {(projectsData || []).length > 4 && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setVisibleProjects(v => v < projectsData.length ? projectsData.length : 4)}
              className="px-8 py-2.5 rounded-full text-sm font-bold border transition-all hover:bg-white/5"
              style={{ borderColor: C.coral, color: C.coral }}>
              {visibleProjects < projectsData.length ? 'Lihat Semua Projects' : 'Tampilkan Lebih Sedikit'}
            </button>
          </div>
        )}
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact">
        <SectionTitle title="Contact" ac={C.teal} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* info */}
          <div className="flex flex-col gap-5">
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              Punya ide proyek seru atau ingin berkolaborasi? Saya selalu terbuka untuk kesempatan baru. Yuk ngobrol!
            </p>
            {[
              { icon:<FiMail size={15}/>,  value: data.email,        href:`mailto:${data.email}`, color: C.coral  },
              { icon:<FiPhone size={15}/>, value: data.phone_number, href: null,                  color: C.teal   },
              { icon:<FiMapPin size={15}/>,value: data.address,      href: null,                  color: C.yellow },
            ].map((item, i) => item.value && (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background:`${item.color}20`, color: item.color }}>{item.icon}</div>
                {item.href
                  ? <a href={item.href} className="text-sm hover:opacity-80 transition-opacity break-all" style={{ color:'rgba(255,255,255,0.8)' }}>{item.value}</a>
                  : <span className="text-sm" style={{ color:'rgba(255,255,255,0.8)' }}>{item.value}</span>}
              </div>
            ))}
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { label:'Nama',   name:'name',    type:'text',  ph:'Nama Anda' },
              { label:'Email',  name:'email',   type:'email', ph:'Email Anda' },
              { label:'Subjek', name:'subject', type:'text',  ph:'Subjek' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-xs font-bold mb-1.5" style={{ color: C.teal }}>{f.label}</label>
                <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange}
                  placeholder={f.ph} required
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{ background: C.bgCard2, border:`1px solid ${C.border}`, color:'#fff' }}
                  onFocus={e => e.target.style.borderColor = C.teal}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: C.teal }}>Pesan</label>
              <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                placeholder="Ceritakan idenya..." required
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                style={{ background: C.bgCard2, border:`1px solid ${C.border}`, color:'#fff' }}
                onFocus={e => e.target.style.borderColor = C.teal}
                onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <button type="submit"
              className="py-3 rounded-xl text-sm font-black transition-all hover:brightness-110 hover:scale-[1.02]"
              style={{ background:`linear-gradient(90deg, ${C.teal}, ${C.coral})`, color:'#0f0f12' }}>
              Kirim Pesan →
            </button>
          </form>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 text-center" style={{ background: '#0a0a0d', borderTop:`1px solid ${C.border}` }}>
        <p className="text-xs mb-2" style={{ color: C.muted }}>
          &copy; {new Date().getFullYear()} <span style={{ color: C.coral }}>{data.fullname}</span>. All rights reserved.
        </p>
        <div className="flex justify-center items-center gap-1.5 text-xs" style={{ color: C.muted }}>
          <span>Built with CareerSync</span>
          <img src={logo} alt="CareerSync" width={16} />
        </div>
      </footer>
    </div>
  );
};

export default TemplateVibrant;
