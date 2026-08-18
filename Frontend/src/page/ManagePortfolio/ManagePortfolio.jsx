/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import { useCareer } from '../../context/CareerContext'
import useManagePortfolio from '../../hooks/UseManagePortfolio'
import { PORTFOLIO_STYLES, PORTFOLIO_TIPS } from '../../data/portfolioData'
import { useNavigate } from 'react-router-dom'
import PortfolioHooks from '../../hooks/PortfolioHooks'
import NavDash from '../../components/Dashboard/NavDash'
import Navbar from '../../components/Global/Navbar'


const ManagePortfolio = () => {
    const { user } = useUser()
    const { careerData } = useCareer()
    const navigate = useNavigate()
    const { loading, error, showSuccess, portfolioId, initialFormData,
        submitPortfolio, fetchPortfolioByUsername, updatePortfolio,
        setShowSuccess, setError } = useManagePortfolio()
    const [selectedStyle, setSelectedStyle] = useState('style1')
    const [formData, setFormData] = useState(initialFormData)
    const [photoPreview, setPhotoPreview] = useState(null)
    const [mode, setMode] = useState('create')
    const [existingPortfolioId, setExistingPortfolioId] = useState(null)

    useEffect(() => {
        const initializePortfolio = async () => {
            if (careerData?.id && user?.id) {
                setFormData(prev => ({
                    ...prev,
                    career_id: careerData.id,
                    user_id: user?.id || ''
                }))

                const existingPortfolio = await fetchPortfolioByUsername(user.username)
                if (existingPortfolio) {
                    setMode('update')
                    setExistingPortfolioId(user?.username)
                    setFormData(prev => ({
                        ...prev,
                        fullname: existingPortfolio.fullname || '',
                        about_me: existingPortfolio.about_me || '',
                        address: existingPortfolio.address || '',
                        education: existingPortfolio.education || '',
                        hobbies: existingPortfolio.hobbies || '',
                        experience: existingPortfolio.experience || '',
                        email: existingPortfolio.email || '',
                        linkedin_link: existingPortfolio.linkedin_link || '',
                        instagram_link: existingPortfolio.instagram_link || '',
                        phone_number: existingPortfolio.phone_number || '',
                        style: existingPortfolio.style || 'style1',
                        photo: null
                    }))
                    setSelectedStyle(existingPortfolio.style || 'style1')
                    if (existingPortfolio.photo) {
                        setPhotoPreview(existingPortfolio.photo)
                    }
                } else {
                    setMode('create')
                }
            }
        }
        initializePortfolio()
    }, [careerData?.id, user?.id, user?.username])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({ ...prev, photo: file }))
            // Generate preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhotoPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user?.id) {
            setError('User ID tidak ditemukan')
            return
        }

        let success
        if (mode === 'update' && existingPortfolioId) {
            success = await updatePortfolio(formData, existingPortfolioId)
        } else {
            success = await submitPortfolio(formData)
        }

        if (success) {
            setFormData(initialFormData)
            setPhotoPreview(null)
            setSelectedStyle('style1')
        }
    }



    const portfolioUrl = portfolioId && user?.username
        ? `${window.location.origin}/portfolio/${user.username}`
        : ''
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        if (portfolioUrl) {
            navigator.clipboard.writeText(portfolioUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <>
        <NavDash />
        <div className="md:ml-16 lg:ml-45 pb-24 md:pb-10 w-full overflow-x-hidden">
            <Navbar />
            <div className="mt-8 mb-8">
                <h1 className="text-3xl font-bold text-[#021124] font-montserrat mb-2">
                    {mode === 'update' ? 'Perbarui Portfolio Anda' : 'Buat Portfolio Anda'}
                </h1>
                <p className="text-gray-600 font-medium">
                    {mode === 'update'
                        ? 'Ubah informasi portfolio Anda untuk diperbarui'
                        : 'Lengkapi informasi berikut untuk membuat portfolio profesional Anda'
                    }
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6">
                {/* Form Section */}
                <div className="flex-1">
                    <div className="bg-white/10 rounded-3xl backdrop-blur-md shadow-xl outline-2 outline-primary p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-xl">
                                <p className="text-red-700 font-semibold text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Personal Information */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold text-[#021124] mb-6 pb-3 border-b-2 border-primary">
                                    Informasi Pribadi
                                </h2>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama lengkap Anda"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124]"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        Tentang Anda <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="about_me"
                                        value={formData.about_me}
                                        onChange={handleChange}
                                        placeholder="Ceritakan tentang diri Anda, latar belakang, dan tujuan karir Anda"
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124] resize-none"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        Alamat <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Masukkan alamat lengkap Anda"
                                        rows={3}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124] resize-none"
                                    />
                                </div>
                            </div>

                            {/* Photo Upload */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold text-[#021124] mb-6 pb-3 border-b-2 border-primary">
                                    Foto Profil
                                </h2>
                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-3">
                                        Pilih Foto (Rasio 1:1)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="photo-input"
                                        />
                                        <label
                                            htmlFor="photo-input"
                                            className="block w-full px-6 py-4 border-2 border-dashed border-primary rounded-xl cursor-pointer hover:bg-blue-50 transition-colors text-center"
                                        >
                                            <p className="text-primary font-semibold">
                                                {formData.photo ? formData.photo.name : 'Klik atau drag foto di sini'}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">PNG, JPG, GIF - Max 2MB</p>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Background */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold text-[#021124] mb-6 pb-3 border-b-2 border-primary">
                                    Latar Belakang
                                </h2>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        Pendidikan <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        placeholder="Masukkan riwayat pendidikan Anda (Sekolah, Universitas, dll)"
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124] resize-none"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        Hobi
                                    </label>
                                    <input
                                        type="text"
                                        name="hobbies"
                                        value={formData.hobbies}
                                        onChange={handleChange}
                                        placeholder="Contoh: Membaca, Fotografi, Traveling"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124]"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        Pengalaman
                                    </label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="Contoh: 2 tahun sebagai Web Developer di PT ABC"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124]"
                                    />
                                </div>
                            </div>

                            {/* Contact & Social Media */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold text-[#021124] mb-6 pb-3 border-b-2 border-primary">
                                    Informasi Kontak & Media Sosial
                                </h2>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="nama@email.com"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124]"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        Nomor Telepon <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        placeholder="+62 812-3456-7890"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124]"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        LinkedIn (Opsional)
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedin_link"
                                        value={formData.linkedin_link}
                                        onChange={handleChange}
                                        placeholder="https://linkedin.com/in/username"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124]"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-[#021124] mb-2">
                                        Instagram (Opsional)
                                    </label>
                                    <input
                                        type="url"
                                        name="instagram_link"
                                        value={formData.instagram_link}
                                        onChange={handleChange}
                                        placeholder="https://instagram.com/username"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white/50 text-[#021124]"
                                    />
                                </div>
                            </div>

                            {/* Portfolio Style */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold text-[#021124] mb-6 pb-3 border-b-2 border-primary">
                                    Pilih Gaya Portfolio
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {PORTFOLIO_STYLES.map((style) => (
                                        <div
                                            key={style.id}
                                            onClick={() => {
                                                setSelectedStyle(style.id)
                                                setFormData(prev => ({ ...prev, style: style.id }))
                                            }}
                                            className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${selectedStyle === style.id
                                                ? 'border-primary bg-primary/10 shadow-lg'
                                                : 'border-gray-300 bg-white/5 hover:border-primary/50'
                                                }`}
                                        >
                                            {selectedStyle === style.id && (
                                                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}

                                            <div className="flex gap-4">
                                                <div className="flex gap-2">
                                                    {style.colors.map((color, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="w-8 h-8 rounded-lg border border-gray-300"
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-[#021124] text-sm">{style.name}</h3>
                                                    <p className="text-xs text-gray-600 mt-1">{style.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 flex gap-4 flex-col">
                                {selectedStyle !== 'style1' && (
                                    <p className=' font-semibold text-center text-yellow-500'> mohon maaf untuk saat ini, anda hanya bisa menggunakan style 1</p>
                                )}
                                <div className="flex flex-row gap-5">

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#4a6fa5] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                    >
                                        {loading ? (mode === 'update' ? 'Memperbarui...' : 'Membuat...') : (mode === 'update' ? 'Perbarui Portfolio' : 'Buat Portfolio')}
                                    </button>
                                    <button
                                        type="reset"
                                        className="flex-1 px-6 py-3 bg-gray-300 text-[#021124] font-bold rounded-xl hover:bg-gray-400 transition-all"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="w-80 h-full">
                    <div className="bg-white/10 rounded-3xl backdrop-blur-md shadow-xl outline-2 outline-primary p-8 sticky top-20">
                        <h3 className="text-xl font-bold text-[#021124] mb-6">
                            Pratinjau Portfolio
                        </h3>

                        <div className="space-y-4">
                            {/* Style Preview */}
                            <div>
                                <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Gaya Terpilih:</p>
                                {PORTFOLIO_STYLES.map((style) => {
                                    if (style.id === selectedStyle) {
                                        return (
                                            <div key={style.id} className="rounded-xl p-4 text-white"
                                                style={{ backgroundImage: `linear-gradient(135deg, ${style.colors[0]} 0%, ${style.colors[1]} 100%)` }}>
                                                <p className="font-bold text-sm">{style.name}</p>
                                                <p className="text-xs opacity-90 mt-1">{style.description}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>

                            <div className="bg-gray-200 rounded-full w-full h-64 flex items-center justify-center overflow-hidden">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm text-gray-500">Preview Foto Profil</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase">Nama</p>
                                    <p className="text-sm font-bold text-[#021124]">{formData.fullname || 'Nama Anda'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase">Email</p>
                                    <p className="text-sm text-primary">{formData.email || 'email@example.com'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase">Tentang</p>
                                    <p className="text-sm text-gray-700">{formData.about_me ? formData.about_me.substring(0, 60) + '...' : 'Deskripsi singkat Anda'}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t-2 border-gray-300">
                                <p className="text-xs text-gray-600 mb-3 font-semibold">Tips untuk Portfolio Terbaik:</p>
                                <ul className="text-xs text-gray-700 space-y-2">
                                    {PORTFOLIO_TIPS.map((tip, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-primary font-bold">•</span>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-center text-[#021124] mb-3">
                            {mode === 'update' ? 'Portfolio Berhasil Diperbarui!' : 'Portfolio Berhasil Dibuat!'}
                        </h3>
                        <p className="text-center text-gray-600 mb-6 font-medium">
                            {mode === 'update' ? 'Portfolio Anda sudah diperbarui.' : 'Portfolio Anda sudah siap dibagikan kepada dunia.'}
                        </p>

                        <div className="bg-blue-50 rounded-2xl p-4 mb-6 border-2 border-blue-200">
                            <p className="text-sm text-gray-600 mb-2 font-medium">Link Portfolio Anda:</p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={portfolioUrl}
                                    readOnly
                                    className="flex-1 bg-white border border-blue-300 rounded-lg px-3 py-2 text-sm text-gray-700 truncate"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    {copied ? '✓ Disalin' : 'Salin'}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="flex-1 px-4 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-[#4a6fa5] transition-colors"
                            >
                                Tutup
                            </button>
                            <button
                                onClick={() => window.open(portfolioUrl, '_blank')}
                                className="flex-1 px-4 py-3 bg-gray-200 text-[#021124] font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                            >
                                Lihat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        {/* </div> */}
        </div>
        </>
    )
}

export default ManagePortfolio