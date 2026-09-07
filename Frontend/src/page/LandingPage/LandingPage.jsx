import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import AuthHooks from '../../hooks/AuthHooks'
import API from '../../services/api'
import logo from '../../assets/Logo_CareerSync.svg'
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    AnimatePresence,
} from 'framer-motion'

// ── Inject font + keyframes once ─────────────────────────────────────────────
const STYLE_ID = 'careersync-landing-styles'
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
    const el = document.createElement('style')
    el.id = STYLE_ID
    el.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        :root {
            --font-jakarta: 'Plus Jakarta Sans', system-ui, sans-serif;
            --font-serif:   'Instrument Serif', Georgia, serif;
        }
        .cs-font  { font-family: var(--font-jakarta); }
        .cs-serif { font-family: var(--font-serif); }

        @keyframes cs-marquee-fwd {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
        }
        @keyframes cs-marquee-rev {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
        }
        @keyframes cs-float {
            0%,100% { transform: translateY(0px); }
            50%     { transform: translateY(-14px); }
        }
        .cs-marquee-fwd { animation: cs-marquee-fwd 38s linear infinite; }
        .cs-marquee-rev { animation: cs-marquee-rev 44s linear infinite; }
        .cs-float       { animation: cs-float 3s ease-in-out infinite; }
        .cs-marquee-fwd:hover,
        .cs-marquee-rev:hover { animation-play-state: paused; }
    `
    document.head.appendChild(el)
}

// ── Constants ─────────────────────────────────────────────────────────────────
const PRIMARY   = '#3B6CB7'
const PRIMARY_H = '#2f5a9e'
const DARK      = '#0D1E35'

const CAREERS = [
    { id: 'fullstack_dev',     label: 'Fullstack Developer' },
    { id: 'mekanik_motor',     label: 'Mekanik Motor' },
    { id: 'game_dev',          label: 'Game Developer' },
    { id: 'network_engineer',  label: 'Network Engineer' },
    { id: 'uiux_designer',     label: 'UI/UX Designer' },
    { id: 'drafter',           label: 'Drafter' },
    { id: 'plumber',           label: 'Plumber' },
    { id: 'painter_kendaraan', label: 'Painter Kendaraan' },
    { id: 'iot_engineer',      label: 'IoT Engineer' },
    { id: 'accountant',        label: 'Akuntan' },
]
const LEVELS = [
    { id: 1, label: 'Basic' },
    { id: 2, label: 'Intermediate' },
    { id: 3, label: 'Advanced' },
]

const TESTIMONIALS = [
    // hanya dummy data
    {image:'https://i.pravatar.cc/150?img=1', text: 'Saya tidak menyangka bisa tahu dengan jelas skill apa yang kurang. Setelah menyelesaikan 2 proyek rekomendasi, langsung dipanggil interview di startup.', name: 'Rizal Aditya', role: 'Fullstack Developer · SMKN 3 Jakarta', initials: 'RA', bg: '#E8EEF8', color: '#1E3A6E' },
    {image:'https://i.pravatar.cc/150?img=2', text: 'Fitur AI Insight-nya luar biasa. Analisisnya spesifik—bukan jawaban generik. Saya tahu persis framework mana yang harus dipelajari minggu ini.', name: 'Nurul Fadhilah', role: 'UI/UX Designer · Politeknik Negeri Jakarta', initials: 'NF', bg: '#E0EBF7', color: '#1A4580' },
    {image:'https://i.pravatar.cc/150?img=3', text: 'Portfolio builder-nya simpel tapi hasilnya profesional. Teman saya di HR bilang tampilan portofolio saya lebih meyakinkan dari kandidat 2 tahun lebih senior.', name: 'Bayu Pratama', role: 'IoT Engineer · SMKN 26 Jakarta', initials: 'BP', bg: '#DFF0FA', color: '#12567A' },
    {image:'https://i.pravatar.cc/150?img=4', text: 'Skor kesiapan kerja saya naik dari 42% ke 78% dalam sebulan. Sistemnya terasa nyata—bukan cuma angka, ada bukti proyeknya.', name: 'Siti Rahayu', role: 'Network Engineer · SMK Telkom Bandung', initials: 'SR', bg: '#E5EBF5', color: '#243F72' },
    {image:'https://i.pravatar.cc/150?img=56', text: 'Awalnya skeptis, tapi setelah coba rekomendasinya relevan banget. Proyek yang diberikan sesuai level saya—tidak terlalu mudah dan tidak mustahil.', name: 'Dimas Fauzan', role: 'Game Developer · SMKN 4 Surabaya', initials: 'DF', bg: '#E9EDF7', color: '#2B3F6A' },
    {image:'https://i.pravatar.cc/150?img=37', text: 'Link portofolio saya taruh di LinkedIn. Beberapa rekruter langsung DM karena tertarik lihat proyek-proyek yang saya kerjakan lewat CareerSync.', name: 'Ayu Lestari', role: 'Akuntan · SMK PGRI 1 Jakarta', initials: 'AL', bg: '#E3EFF8', color: '#174D7A' },
    {image:'https://i.pravatar.cc/150?img=38', text: 'Weighted scoring-nya masuk akal. Saya akhirnya paham kenapa skor masih 60%—bukan karena skill kurang, tapi bukti proyeknya belum lengkap.', name: 'Hendra Kurniawan', role: 'Drafter · Polman Bandung', initials: 'HK', bg: '#EAF0F7', color: '#1E3D5C' },
    {image:'https://i.pravatar.cc/150?img=39', text: 'Tampilannya bersih dan tidak bikin bingung. Dalam 15 menit pertama saya sudah paham cara kerjanya dan langsung bisa isi profil.', name: 'Melati Putri', role: 'Painter Kendaraan · SMK Karya Bangsa', initials: 'MP', bg: '#E2ECF6', color: '#1D4B73' },
]

const FAQS = [
    { q: 'Apakah CareerSync gratis?', a: 'Ya, CareerSync dapat diakses secara gratis. Kamu bisa melakukan analisis skill, mendapatkan rekomendasi proyek, dan membangun portofolio dasar tanpa biaya.' },
    { q: 'Bagaimana skor kesiapan kerja dihitung?', a: 'Skor dihitung menggunakan metode pembobotan (weighted scoring): setiap skill diberi bobot sesuai relevansinya di industri, lalu level penguasaanmu dibandingkan dengan level maksimal yang dibutuhkan. Hasilnya dalam persen—semakin tinggi, semakin siap kamu.' },
    { q: 'Apa itu "proof-based skill validation"?', a: 'Skill hanya dianggap valid jika dibuktikan melalui penyelesaian proyek nyata. Berbeda dengan sertifikat yang hanya mencatat kehadiran kursus, CareerSync mensyaratkan output konkret—kode, desain, laporan—sebagai bukti kompetensi yang bisa dilihat rekruter.' },
    { q: 'Bidang karir apa saja yang didukung?', a: 'CareerSync mendukung 10 bidang karir: Fullstack Developer, Mekanik Motor, Game Developer, Network Engineer, UI/UX Designer, Drafter, Plumber, Painter Kendaraan, IoT Engineer, dan Akuntan. Kami terus menambah bidang baru sesuai kebutuhan industri.' },
    { q: 'Apakah portofolio saya bisa dilihat rekruter?', a: 'Ya. Portofolio yang kamu buat di CareerSync memiliki URL publik yang bisa dibagikan. Rekruter atau siapapun bisa mengaksesnya tanpa perlu login.' },
    { q: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?', a: 'Tergantung level proyek. Basic biasanya 1–2 minggu, Intermediate 2–4 minggu, dan Advanced 4–8 minggu. Tidak ada batas waktu—kamu bisa mengerjakan sesuai ritme belajarmu sendiri.' },
]

const FEATURES = [
    {
        title: 'Analisis Kesenjangan Skill',
        desc: 'Sistem bobot industri mengukur seberapa jauh skill-mu dari standar yang dibutuhkan. Kamu tahu persis apa yang harus diperbaiki.',
        icon: <svg className="w-6 h-6 stroke-[#3B6CB7]" fill="none" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    },
    {
        title: 'Rekomendasi Proyek',
        desc: 'Berdasarkan skill yang belum dikuasai, sistem merekomendasikan proyek nyata berjenjang dari Basic hingga Advanced.',
        icon: <svg className="w-6 h-6 stroke-[#3B6CB7]" fill="none" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    },
    {
        title: 'Dashboard Monitoring',
        desc: 'Pantau perkembangan kesiapan kerja dari waktu ke waktu. Lihat grafik pertumbuhan skill dan posisimu relatif terhadap standar industri.',
        icon: <svg className="w-6 h-6 stroke-[#3B6CB7]" fill="none" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    },
    {
        title: 'Portfolio Builder',
        desc: 'Buat portofolio profesional dengan tiga pilihan tema. Bagikan satu tautan kepada rekruter—tanpa perlu bisa coding.',
        icon: <svg className="w-6 h-6 stroke-[#3B6CB7]" fill="none" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
    },
    {
        title: 'AI Insight',
        desc: 'Analisis AI personal yang mengevaluasi skill gap dan memberikan saran konkret untuk meningkatkan skor kesiapan kerjamu.',
        icon: <svg className="w-6 h-6 stroke-[#3B6CB7]" fill="none" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>,
    },
    {
        title: 'Pencarian Portfolio Publik',
        desc: 'Temukan portofolio pengguna lain untuk inspirasi, referensi, atau keperluan rekrutmen. Filter berdasarkan karir dan level.',
        icon: <svg className="w-6 h-6 stroke-[#3B6CB7]" fill="none" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" /></svg>,
    },
]

// ── Reusable animation variant — fade + blur reveal ───────────────────────────
// Dipakai di semua section whileInView
const fadeBlur = {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
    show:   { opacity: 1, filter: 'blur(0px)',  y: 0  },
}

// Stagger children helper
const stagger = (delayChildren = 0.05) => ({
    hidden: {},
    show:   { transition: { staggerChildren: delayChildren } },
})

// Reusable whileInView wrapper
const BlurReveal = ({ children, delay = 0, className = '', style = {} }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    return (
        <motion.div
            ref={ref}
            className={className}
            style={style}
            variants={fadeBlur}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.div>
    )
}

// ────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ────────────────────────────────────────────────────────────────────────────
const Navbar = ({ onCtaClick, token }) => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

    const navLinks = [
        { label: 'Tentang', id: 'about' },
        { label: 'Fitur', id: 'features' },
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'FAQ', id: 'faq' },
        { label: 'Testimoni', id: 'testimonials' },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 w-full z-50 px-5 md:px-10 cs-font"
                style={{
                    background: scrolled ? 'rgba(13,30,53,0.60)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(14px)' : 'none',
                    boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
                    transition: 'background 0.3s, box-shadow 0.3s',
                }}
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2.5 cursor-pointer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <img src={logo} alt="CareerSync" className="w-9 h-9 object-contain" />
                        <span className="font-bold text-white text-base tracking-tight">CareerSync</span>
                    </motion.button>

                    <div className="hidden md:flex items-center gap-7">
                        {navLinks.map((l, i) => (
                            <motion.button
                                key={l.id}
                                onClick={() => scrollTo(l.id)}
                                className="text-white/65 text-sm font-medium cursor-pointer relative"
                                whileHover={{ color: '#fff' }}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                            >
                                {l.label}
                                <motion.span
                                    className="absolute -bottom-0.5 left-0 h-px bg-white rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.25 }}
                                />
                            </motion.button>
                        ))}
                        <motion.button
                            onClick={onCtaClick}
                            className="text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer"
                            style={{ background: PRIMARY }}
                            whileHover={{ scale: 1.05, background: PRIMARY_H }}
                            whileTap={{ scale: 0.96 }}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                        >
                            {token ? 'Dashboard' : 'Mulai Gratis'}
                        </motion.button>
                    </div>

                    <motion.button
                        className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
                        onClick={() => setMenuOpen(o => !o)}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            className="block w-6 h-0.5 bg-white rounded-full origin-center"
                            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                        />
                        <motion.span
                            className="block w-6 h-0.5 bg-white rounded-full"
                            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.span
                            className="block w-6 h-0.5 bg-white rounded-full origin-center"
                            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                        />
                    </motion.button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 cs-font"
                        style={{ background: 'rgba(13,30,53,0.97)' }}
                    >
                        {navLinks.map((l, i) => (
                            <motion.button
                                key={l.id}
                                onClick={() => scrollTo(l.id)}
                                className="text-white text-2xl font-bold cursor-pointer"
                                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: 12 }}
                                transition={{ delay: i * 0.06, duration: 0.4 }}
                                whileHover={{ color: '#7AAEE8', x: 6 }}
                            >
                                {l.label}
                            </motion.button>
                        ))}
                        <motion.button
                            onClick={() => { setMenuOpen(false); onCtaClick() }}
                            className="text-white px-10 py-3.5 rounded-xl text-base font-bold cursor-pointer"
                            style={{ background: PRIMARY }}
                            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.32, duration: 0.4 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            {token ? 'Dashboard' : 'Mulai Gratis'}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// ────────────────────────────────────────────────────────────────────────────
// HERO
// ────────────────────────────────────────────────────────────────────────────
const Hero = ({ onCtaClick }) => {
    const { scrollY } = useScroll()
    // Parallax: dot grid moves slower than scroll
    const dotY = useTransform(scrollY, [0, 600], [0, 80])

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center px-5 md:px-10 pt-24 pb-16 overflow-hidden cs-font"
            style={{ background: 'linear-gradient(135deg, #0D1E35 0%, #1a3255 50%, #0D1E35 100%)' }}
        >
            {/* Parallax dot grid */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(196,220,255,0.10) 1px, transparent 1.5px)',
                    backgroundSize: '32px 32px',
                    y: dotY,
                }}
            />
            {/* Glow orb — subtle pulse */}
            <motion.div
                className="absolute -top-32 -right-32 w-125 h-125 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(59,108,183,0.22) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
                <div className="flex-1 min-w-0 text-center lg:text-left">
                    {/* Eyebrow */}
                    <motion.p
                        className="text-xs font-bold tracking-widest mb-5 uppercase"
                        style={{ color: '#7AAEE8', letterSpacing: '0.14em' }}
                        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                    >
                        Platform Kesiapan Kerja SMK/SMA
                    </motion.p>

                    {/* Heading */}
                    <motion.h1
                        className="cs-serif text-white leading-[1.1] mb-5"
                        style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 400, fontStyle: 'italic' }}
                        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.3, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Ukur Kesiapan Kerjamu.
                        <br />
                        <motion.span
                            className="cs-font not-italic"
                            style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.1rem)', color: '#7AAEE8' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.6 }}
                        >
                            Buktikan
                        </motion.span>
                        <motion.span
                            className="cs-font not-italic"
                            style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.1rem)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.65, duration: 0.6 }}
                        >
                            {' '}dengan Proyek Nyata.
                        </motion.span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-white/55 text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-9 leading-relaxed"
                        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, delay: 1.0 }}
                    >
                        CareerSync menganalisis kesenjangan skill-mu secara objektif, merekomendasikan proyek industri, dan membantu membangun portofolio yang berbicara sendiri.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        className="flex flex-wrap gap-3 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 1.0 }}
                    >
                        <motion.button
                            onClick={onCtaClick}
                            className="text-white px-7 py-3.5 rounded-xl font-bold text-sm cursor-pointer"
                            style={{ background: PRIMARY }}
                            whileHover={{ scale: 1.06, background: PRIMARY_H, boxShadow: '0 8px 24px rgba(59,108,183,0.4)' }}
                            whileTap={{ scale: 0.96 }}
                        >
                            {localStorage.getItem('tokenCareerSync') ? 'Buka Dashboard' : 'Mulai Gratis'}
                        </motion.button>
                        <motion.button
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-white px-7 py-3.5 rounded-xl font-bold text-sm cursor-pointer"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)' }}
                            whileHover={{ background: 'rgba(255,255,255,0.14)', scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Pelajari Fitur
                        </motion.button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="flex gap-8 mt-12 pt-8 justify-center lg:justify-start flex-wrap"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.35, duration: 1.2 }}
                    >
                        {[['10+', 'Bidang Karir'], ['3 Level', 'Tingkat Skill'], ['AI', 'Analisis Cerdas']].map(([v, l], i) => (
                            <motion.div
                                key={l}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                            >
                                <div className="text-2xl font-extrabold text-white leading-none">{v}</div>
                                <div className="text-xs text-white/40 mt-1 font-medium">{l}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// ────────────────────────────────────────────────────────────────────────────
// ABOUT
// ────────────────────────────────────────────────────────────────────────────
const AboutPoint = ({ icon, title, desc, delay }) => (
    <BlurReveal delay={delay} className="flex gap-4 items-start">
        <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: 'rgba(59,108,183,0.18)' }}
            whileHover={{ scale: 1.12, background: 'rgba(59,108,183,0.30)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
            {icon}
        </motion.div>
        <div>
            <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>{desc}</p>
        </div>
    </BlurReveal>
)

const About = () => (
    <section id="about" className="py-24 px-5 md:px-10 bg-white cs-font">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <BlurReveal>
                    <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: PRIMARY, letterSpacing: '0.12em' }}>
                        Tentang CareerSync
                    </p>
                </BlurReveal>
                <BlurReveal delay={0.1}>
                    <h2
                        className="cs-serif leading-snug mb-6"
                        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: DARK, fontWeight: 400, fontStyle: 'italic' }}
                    >
                        Lebih dari sekadar belajar—
                        <br />
                        <span className="cs-font not-italic font-extrabold" style={{ color: DARK }}>ini tentang siap bekerja.</span>
                    </h2>
                </BlurReveal>
                <BlurReveal delay={0.18}>
                    <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#4B6380' }}>
                        Banyak lulusan dan pelajar ragu apakah keterampilan mereka sudah sesuai kebutuhan industri yang terus berubah. CareerSync hadir untuk menjawab pertanyaan itu secara objektif dan terstruktur.
                    </p>
                </BlurReveal>
                <BlurReveal delay={0.24}>
                    <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#4B6380' }}>
                        Kami menggunakan sistem pembobotan berbasis standar industri (weighted scoring) untuk mengukur kesiapan kerja, mengidentifikasi skill gap, dan mengarahkan pengguna ke proyek nyata sebagai bukti kompetensi—bukan sekadar sertifikat.
                    </p>
                </BlurReveal>
                <BlurReveal delay={0.30}>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: '#4B6380' }}>
                        Terintegrasi dengan AI, CareerSync memberikan evaluasi personal yang relevan dengan tren kebutuhan tenaga kerja saat ini.
                    </p>
                </BlurReveal>
            </div>

            <BlurReveal delay={0.12} className="rounded-2xl p-8 flex flex-col gap-7" style={{ background: DARK }}>
                <AboutPoint
                    delay={0.18}
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#7AAEE8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    title="Proof-Based Skill Validation"
                    desc="Skill hanya dianggap valid jika dibuktikan melalui hasil proyek nyata, bukan pengakuan atau sertifikat semata."
                />
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
                <AboutPoint
                    delay={0.26}
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#7AAEE8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
                    title="Smart AI Analysis"
                    desc="Evaluasi keterampilan berbasis AI yang memahami kebutuhan industri dan memberikan saran pengembangan yang actionable."
                />
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
                <AboutPoint
                    delay={0.34}
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#7AAEE8"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>}
                    title="Portfolio Builder Profesional"
                    desc="Tiga pilihan template portofolio yang bisa dipersonalisasi dan dibagikan ke rekruter dengan satu tautan."
                />
            </BlurReveal>
        </div>
    </section>
)

// ────────────────────────────────────────────────────────────────────────────
// FEATURES
// ────────────────────────────────────────────────────────────────────────────
const Features = () => (
    <section id="features" className="py-24 px-5 md:px-10 cs-font" style={{ background: '#F0F4FA' }}>
        <div className="max-w-6xl mx-auto">
            <BlurReveal>
                <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: PRIMARY, letterSpacing: '0.12em' }}>Fitur Unggulan</p>
            </BlurReveal>
            <BlurReveal delay={0.1}>
                <h2
                    className="cs-serif leading-snug mb-4"
                    style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: DARK, fontWeight: 400, fontStyle: 'italic' }}
                >
                    Semua yang kamu butuhkan<br />
                    <span className="cs-font not-italic font-extrabold">untuk siap masuk industri.</span>
                </h2>
            </BlurReveal>
            <BlurReveal delay={0.18}>
                <p className="text-sm md:text-base max-w-xl mb-14 leading-relaxed" style={{ color: '#4B6380' }}>
                    Dari analisis hingga portofolio, CareerSync merancang perjalanan belajarmu agar terarah dan terukur.
                </p>
            </BlurReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {FEATURES.map((f, i) => (
                    <BlurReveal key={f.title} delay={0.08 * i}>
                        <motion.div
                            className="bg-white rounded-2xl p-7 relative overflow-hidden h-full"
                            style={{ border: '0.5px solid #D8E4F0', boxShadow: '0 1px 3px rgba(13,30,53,0.04)' }}
                            whileHover={{
                                y: -6,
                                boxShadow: '0 16px 48px rgba(59,108,183,0.14)',
                                borderColor: PRIMARY,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        >
                            <div
                                className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl"
                                style={{ background: `linear-gradient(90deg, ${PRIMARY}, #7AAEE8)` }}
                            />
                            <motion.div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                style={{ background: '#EEF3FB' }}
                                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {f.icon}
                            </motion.div>
                            <h3 className="font-bold text-base mb-2" style={{ color: DARK }}>{f.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: '#5E7A97' }}>{f.desc}</p>
                        </motion.div>
                    </BlurReveal>
                ))}
            </div>
        </div>
    </section>
)

// ────────────────────────────────────────────────────────────────────────────
// PORTFOLIO SEARCH
// ────────────────────────────────────────────────────────────────────────────
const PortfolioCard = ({ portfolio }) => {
    const navigate = useNavigate()
    const initial = (portfolio.fullname || '?').charAt(0).toUpperCase()
    const about = portfolio.about_me
        ? portfolio.about_me.substring(0, 110) + (portfolio.about_me.length > 110 ? '…' : '')
        : ''
    const username = portfolio.username || portfolio.portfolio_id || ''

    return (
        <motion.div
            onClick={() => navigate(`/portfolio/${username}`)}
            className="rounded-2xl p-6 cursor-pointer cs-font"
            style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)' }}
            whileHover={{ y: -5, background: 'rgba(255,255,255,0.17)', borderColor: 'rgba(122,174,232,0.5)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg mb-4 shrink-0"
                style={{ background: `linear-gradient(135deg, #1E3A5F, ${PRIMARY})` }}
            >
                {initial}
            </div>
            <p className="font-bold text-white text-sm mb-1 truncate">{portfolio.fullname || '—'}</p>
            <p className="text-xs mb-2" style={{ color: '#7AAEE8' }}>{portfolio.career_name || ''}</p>
            <p className="text-xs leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.50)' }}>{about}</p>
            {portfolio.level && (
                <span className="inline-block mt-3 text-[10px] font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(59,108,183,0.25)', color: '#7AAEE8' }}>
                    {portfolio.level}
                </span>
            )}
        </motion.div>
    )
}

const PortfolioSearch = () => {
    const [query, setQuery] = useState('')
    const [career, setCareer] = useState('')
    const [level, setLevel] = useState('')
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const doSearch = useCallback(async () => {
        if (!query.trim()) { setError('Kata kunci tidak boleh kosong.'); return }
        setError(''); setLoading(true); setResults(null)
        try {
            const body = { query: query.trim() }
            if (career) body.career = parseInt(career, 10)
            if (level) body.level = parseInt(level, 10)
            const res = await API.post('/portfolio/search', body)
            setResults(res.data?.data?.portfolios || [])
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal terhubung ke server. Pastikan backend aktif.')
        } finally { setLoading(false) }
    }, [query, career, level])

    const selectStyle = {
        appearance: 'none',
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.20)',
        borderRadius: 12,
        padding: '12px 36px 12px 16px',
        color: '#fff',
        fontSize: 14,
        outline: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-jakarta)',
    }

    return (
        <section
            id="portfolio"
            className="py-24 px-5 md:px-10 relative overflow-hidden cs-font"
            style={{ background: `linear-gradient(135deg, ${DARK} 0%, #1a3255 100%)` }}
        >
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(196,220,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="max-w-6xl mx-auto relative z-10">
                <BlurReveal>
                    <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: '#7AAEE8', letterSpacing: '0.12em' }}>Direktori Portfolio</p>
                </BlurReveal>
                <BlurReveal delay={0.1}>
                    <h2 className="cs-serif leading-snug mb-4 text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 400, fontStyle: 'italic' }}>
                        Temukan Portfolio<br /><span className="cs-font not-italic font-extrabold">Profesional.</span>
                    </h2>
                </BlurReveal>
                <BlurReveal delay={0.18}>
                    <p className="text-sm md:text-base max-w-xl mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        Cari berdasarkan nama, bidang keahlian, atau pengalaman. Filter untuk menemukan kandidat yang tepat.
                    </p>
                </BlurReveal>

                <BlurReveal delay={0.22} className="rounded-2xl p-6 md:p-8 mb-8" style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(16px)' }}>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text" value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && doSearch()}
                            placeholder="Cari nama, pengalaman, pendidikan..."
                            className="flex-1 min-w-0 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200"
                            style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)', fontFamily: 'var(--font-jakarta)' }}
                            onFocus={e => e.currentTarget.style.borderColor = 'rgba(122,174,232,0.60)'}
                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)'}
                        />
                        <div className="relative">
                            <select value={career} onChange={e => setCareer(e.target.value)} style={selectStyle}>
                                <option value="" style={{ background: '#1a3255' }}>Semua Karir</option>
                                {CAREERS.map(c => <option key={c.id} value={c.id} style={{ background: '#1a3255' }}>{c.label}</option>)}
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.50)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </div>
                        {/* <div className="relative">
                            <select value={level} onChange={e => setLevel(e.target.value)} style={selectStyle}>
                                <option value="" style={{ background: '#1a3255' }}>Semua Level</option>
                                {LEVELS.map(l => <option key={l.id} value={l.id} style={{ background: '#1a3255' }}>{l.label}</option>)}
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.50)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </div> */}
                        <motion.button
                            onClick={doSearch} disabled={loading}
                            className="text-white px-7 py-3 rounded-xl font-bold text-sm cursor-pointer whitespace-nowrap w-full sm:w-auto"
                            style={{ background: loading ? 'rgba(59,108,183,0.50)' : PRIMARY }}
                            whileHover={!loading ? { scale: 1.04, background: PRIMARY_H } : {}}
                            whileTap={!loading ? { scale: 0.96 } : {}}
                        >
                            {loading ? 'Mencari...' : 'Cari Portfolio'}
                        </motion.button>
                    </div>
                    {error && <p className="mt-3 text-red-400 text-xs">{error}</p>}
                </BlurReveal>

                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16 text-sm" style={{ color: 'rgba(255,255,255,0.40)' }}>
                            Mencari portfolio...
                        </motion.div>
                    )}
                    {!loading && results === null && !error && (
                        <motion.div key="empty" initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }} className="text-center py-16 flex flex-col items-center gap-4" style={{ color: 'rgba(255,255,255,0.30)' }}>
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" /></svg>
                            <p className="text-sm">Masukkan kata kunci untuk mencari portfolio pengguna CareerSync.</p>
                        </motion.div>
                    )}
                    {!loading && results !== null && results.length === 0 && (
                        <motion.div key="noresult" initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }} className="text-center py-16 flex flex-col items-center gap-4" style={{ color: 'rgba(255,255,255,0.30)' }}>
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>
                            <p className="text-sm">Tidak ada portfolio yang cocok dengan pencarian ini.</p>
                        </motion.div>
                    )}
                    {!loading && results !== null && results.length > 0 && (
                        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>{results.length} portfolio ditemukan</p>
                            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={stagger(0.06)} initial="hidden" animate="show">
                                {results.map((p, i) => (
                                    <motion.div key={p.portfolio_id || i} variants={fadeBlur} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                                        <PortfolioCard portfolio={p} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

// ────────────────────────────────────────────────────────────────────────────
// FAQ
// ────────────────────────────────────────────────────────────────────────────
const FaqItem = ({ q, a, delay }) => {
    const [open, setOpen] = useState(false)
    return (
        <BlurReveal delay={delay}>
            <div style={{ borderBottom: '1px solid #E2ECF8' }}>
                <motion.button
                    onClick={() => setOpen(o => !o)}
                    className="w-full flex items-center justify-between text-left py-5 gap-4 cursor-pointer text-sm md:text-base font-semibold cs-font"
                    style={{ color: open ? PRIMARY : DARK }}
                    whileHover={{ color: PRIMARY }}
                >
                    <span>{q}</span>
                    <motion.svg
                        className="w-5 h-5 shrink-0"
                        style={{ stroke: open ? PRIMARY : '#9BB5D0' }}
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        fill="none" viewBox="0 0 24 24" strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </motion.svg>
                </motion.button>
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
                            animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                            exit={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden text-sm leading-relaxed cs-font pb-5"
                            style={{ color: '#5E7A97' }}
                        >
                            {a}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </BlurReveal>
    )
}

const Faq = () => (
    <section id="faq" className="py-24 px-5 flex justify-center items-center md:px-10 bg-white cs-font">
        <div className="max-w-6xl mx-auto w-full">
            <div className="flex justify-center items-center flex-col text-center mb-12">
                <BlurReveal>
                    <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: PRIMARY, letterSpacing: '0.12em' }}>FAQ</p>
                </BlurReveal>
                <BlurReveal delay={0.1}>
                    <h2 className="cs-serif leading-snug max-w-sm" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: DARK, fontWeight: 400, fontStyle: 'italic' }}>
                        Pertanyaan yang sering<br />
                        <span className="cs-font not-italic font-extrabold">ditanyakan.</span>
                    </h2>
                </BlurReveal>
            </div>
            <div className="max-w-3xl mx-auto">
                {FAQS.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} delay={i * 0.06} />)}
            </div>
        </div>
    </section>
)

// ────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS — Marquee dua baris
// ────────────────────────────────────────────────────────────────────────────
const TestimonialCard = ({ t }) => (
    <motion.div
        className="flex flex-col gap-4 cursor-default"
        style={{
            background: '#fff',
            border: '0.5px solid #D8E4F0',
            borderRadius: 18,
            padding: '26px 28px',
            width: 340,
            flexShrink: 0,
        }}
        whileHover={{
            y: -5,
            borderColor: PRIMARY,
            boxShadow: '0 12px 36px rgba(59,108,183,0.12)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
        <div className="cs-serif leading-none select-none" style={{ fontSize: 52, fontStyle: 'italic', color: '#D8E4F0', marginBottom: -4 }}>"</div>
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#3D556B', lineHeight: 1.68 }}>{t.text}</p>
        <div className="flex items-center gap-3" style={{ borderTop: '0.5px solid #EFF4FA', paddingTop: 14 }}>
            <motion.div
                className="flex items-center justify-center text-xs font-bold shrink-0"
                style={{ width: 36, height: 36, borderRadius: '50%', background: t.bg, color: t.color, letterSpacing: '0.02em' }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400 }}
            >
                <img className='rounded-full' src={t.image} alt={t.name} />
            </motion.div>
            <div>
                <p className="text-xs font-bold" style={{ color: DARK, margin: 0 }}>{t.name}</p>
                <p className="text-[11px] font-medium" style={{ color: '#7A9BBD', margin: '2px 0 0' }}>{t.role}</p>
            </div>
        </div>
    </motion.div>
)

const Testimonials = () => {
    const row1 = [...TESTIMONIALS, ...TESTIMONIALS]
    const row2 = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)]

    return (
        <section id="testimonials" className="py-20 overflow-hidden cs-font" style={{ background: '#F0F4FA' }}>
            <div className="max-w-6xl mx-auto px-5 md:px-10 pb-12">
                <BlurReveal>
                    <p className="text-xs font-bold tracking-widest mb-4 block" style={{ color: PRIMARY, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        testimonial
                    </p>
                </BlurReveal>
                <BlurReveal delay={0.1}>
                    <h2 className="cs-serif leading-snug mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: DARK, fontWeight: 400, fontStyle: 'italic' }}>
                        Yang mereka katakan<br />
                        <span className="cs-font not-italic font-extrabold">tentang CareerSync.</span>
                    </h2>
                </BlurReveal>
                <BlurReveal delay={0.18}>
                    <p className="text-sm leading-relaxed max-w-md" style={{ color: '#5A7799' }}>
                        Perubahan nyata yang dirasakan pengguna dalam perjalanan karir mereka—bukan sekadar ulasan.
                    </p>
                </BlurReveal>
            </div>

            {/* Row 1 — ke kiri */}
            <div className="relative mb-5">
                <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #F0F4FA, transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, #F0F4FA, transparent)' }} />
                <div className="cs-marquee-fwd" style={{ display: 'flex', gap: 20, width: 'max-content' }}>
                    {row1.map((t, i) => <TestimonialCard key={i} t={t} />)}
                </div>
            </div>

            {/* Row 2 — ke kanan */}
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #F0F4FA, transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, #F0F4FA, transparent)' }} />
                <div className="cs-marquee-rev" style={{ display: 'flex', gap: 20, width: 'max-content' }}>
                    {row2.map((t, i) => <TestimonialCard key={i} t={t} />)}
                </div>
            </div>
        </section>
    )
}

// ────────────────────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────────────────────
const Footer = () => {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    return (
        <footer className="px-5 md:px-10 pt-16 pb-8 cs-font" style={{ background: DARK, color: 'rgba(255,255,255,0.50)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="lg:col-span-1">
                        <motion.div className="flex items-center gap-2.5 mb-4" whileHover={{ x: 3 }}>
                            <img src={logo} alt="CareerSync" className="w-8 h-8 object-contain" />
                            <span className="font-bold text-white text-base tracking-tight">CareerSync</span>
                        </motion.div>
                        <h3 className="text-white font-semibold text-sm mb-2">Buktikan Kesiapan Kerjamu.</h3>
                        <p className="text-xs leading-relaxed max-w-xs">
                            Platform analisis skill dan portfolio builder yang membantu pelajar dan lulusan SMK/SMA siap menghadapi dunia industri.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white text-xs font-bold mb-5 tracking-wide">Platform</h4>
                        {[['Tentang', 'about'], ['Fitur', 'features'], ['Cari Portfolio', 'portfolio']].map(([l, id]) => (
                            <motion.button key={id} onClick={() => scrollTo(id)} className="block text-xs mb-3 cursor-pointer text-left" whileHover={{ color: '#fff', x: 3 }} transition={{ duration: 0.2 }}>
                                {l}
                            </motion.button>
                        ))}
                        <motion.a href="/auth" className="block text-xs mb-3" whileHover={{ color: '#fff', x: 3 }} transition={{ duration: 0.2 }}>Masuk</motion.a>
                        <motion.a href="/auth" className="block text-xs" whileHover={{ color: '#fff', x: 3 }} transition={{ duration: 0.2 }}>Daftar Gratis</motion.a>
                    </div>
                    <div>
                        <h4 className="text-white text-xs font-bold mb-5 tracking-wide">Bidang Karir</h4>
                        {['Fullstack Developer', 'UI/UX Designer', 'IoT Engineer', 'Network Engineer', 'Akuntan'].map(c => (
                            <p key={c} className="text-xs mb-3">{c}</p>
                        ))}
                    </div>
                    <div>
                        <h4 className="text-white text-xs font-bold mb-5 tracking-wide">Tim</h4>
                        {['Alif Athaullah Rasyad', 'Khuzaefah Hauna', 'Lutfi Idham Puro', 'SMKN 26 Jakarta'].map(n => (
                            <p key={n} className="text-xs mb-3">{n}</p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-7 text-xs" style={{ color: 'rgba(255,255,255,0.30)' }}>
                    <span>&copy; 2026 CareerSync · Tim "Kata Bu Kuri kita harus DUMOR" · SMK Negeri 26 Jakarta</span>
                </div>
            </div>
        </footer>
    )
}

// ────────────────────────────────────────────────────────────────────────────
// POPUP
// ────────────────────────────────────────────────────────────────────────────
const PopUp = ({ onClose, onclick, onclick2, username }) => (
    <AnimatePresence>
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4 cs-font"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white rounded-2xl p-8 w-full max-w-sm text-center"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.20)' }}
                initial={{ scale: 0.88, opacity: 0, filter: 'blur(8px)', y: 20 }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ scale: 0.92, opacity: 0, filter: 'blur(4px)' }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-2" style={{ color: DARK }}>
                    Masuk sebagai <span style={{ color: PRIMARY }}>{username}</span>?
                </h2>
                <p className="text-sm mb-8 leading-relaxed" style={{ color: '#5E7A97' }}>Jika bukan, silakan login dengan akun lain.</p>
                <div className="flex gap-3 justify-center">
                    <motion.button
                        onClick={onclick}
                        className="text-white py-2.5 px-6 rounded-xl text-sm font-semibold cursor-pointer"
                        style={{ background: PRIMARY }}
                        whileHover={{ scale: 1.05, background: PRIMARY_H }}
                        whileTap={{ scale: 0.96 }}
                    >
                        Ya, itu saya!
                    </motion.button>
                    <motion.button
                        onClick={onclick2}
                        className="text-sm font-semibold cursor-pointer py-2.5 px-6 rounded-xl"
                        style={{ border: '1px solid #E2ECF8', color: DARK, background: '#fff' }}
                        whileHover={{ background: '#EEF4FC', scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        Bukan
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
)

// ────────────────────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────────────────────
const LandingPage = () => {
    const { user } = useUser()
    const [popUp, setPopup] = useState(false)
    const token = localStorage.getItem('tokenCareerSync')
    const navigate = useNavigate()
    const { Logout } = AuthHooks()

    const handleCtaClick = () => {
        if (token) setPopup(true)
        else navigate('/auth')
    }

    return (
        <div className="min-h-screen cs-font">
            <Navbar onCtaClick={handleCtaClick} token={token} />
            <Hero onCtaClick={handleCtaClick} />
            <About />
            <Features />
            <PortfolioSearch />
            <Faq />
            <Testimonials />
            <Footer />

            <AnimatePresence>
                {popUp && (
                    <PopUp
                        onClose={() => setPopup(false)}
                        onclick={() => { setPopup(false); navigate('/dashboard') }}
                        onclick2={() => { Logout(); navigate('/auth') }}
                        username={user?.username}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default LandingPage