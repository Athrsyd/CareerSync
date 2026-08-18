import { useState, useEffect } from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import AuthHooks from '../../hooks/AuthHooks'
import background from '../../assets/bg-auth.jpeg'
import { useUser } from '../../context/UserContext'
import { useCareer } from '../../context/CareerContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        message, setMessage,
        AuthLoading, setAuthLoading,
        handleRegister, handleChange, handleLogin } = AuthHooks();
    const { refetchUser, user } = useUser();
    const { fetchCareer } = useCareer();
    const [isSignIn, setIsSignIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && localStorage.getItem('tokenCareerSync')) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const toggleButton = () => {
        setIsSignIn(!isSignIn);
        setShowPassword(false);
    }

    const handleLoginSubmit = async (e) => {
        await handleLogin(e);
        await refetchUser();
        await fetchCareer();
    }

    return (
        <div className='w-full h-screen items-center justify-center gap-4'>
            {/* Background */}
            <div className="background flex justify-start w-full h-screen relative -z-30">
                <img src={background} alt="background" className='w-full h-full object-cover' />
            </div>

            {/* Auth Container */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-[#021124]/30 w-11/12 sm:w-10/12 md:w-7/8 lg:w-7/8 max-w-4xl h-auto min-h-[70vh] md:h-4/5 rounded-xl backdrop-blur-xl flex items-center gap-6 overflow-hidden">

                {/* Left Panel - hidden on mobile */}
                <div className={`hidden md:flex flex-col justify-center w-1/2 h-full text-white transition-all duration-700 ease-in-out transform ${isSignIn ? 'translate-x-full opacity-100' : 'translate-x-0 opacity-100'}`}>
                    <div className={`relative ${isSignIn ? 'text-end items-end px-10' : 'items-start text-justify pl-10 p-10'}`}>
                        <h1 className='text-2xl lg:text-4xl font-bold mb-2'>
                            {isSignIn ? 'Terus tingkatkan skill mu' : 'Ayo bangun skill masa depan'}
                        </h1>
                        <p className={`${isSignIn ? 'text-base lg:text-xl' : 'text-sm lg:text-lg'}`}>
                            {isSignIn
                                ? 'Lanjutkan perjalanan belajar mu dan raih impian karirmu dengan terus meningkatkan skill yang kamu miliki.'
                                : 'Capai impian karirmu dengan membangun skill yang relevan untuk masa depan. Mulai perjalanan belajarmu sekarang dan raih kesuksesan di dunia kerja.'}
                        </p>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className={`w-full md:w-1/2 h-full bg-[#021124]/90 rounded-xl text-white transition-all duration-700 ease-in-out transform
                    ${isSignIn ? 'md:-translate-x-full' : 'md:translate-x-0'}`}>
                    <div className="flex flex-row items-center justify-center h-full w-full">
                        <div className="w-3/4 h-full flex flex-col items-start justify-center gap-4 py-8">
                            <h1 className={`font-bold text-2xl lg:text-3xl text-start px-5 transition-all duration-300 ease-in-out ${isSignIn ? '-translate-x-1' : 'translate-x-0'}`}>
                                {isSignIn ? 'Selamat Datang Kembali!' : 'Buat Akun Anda'}
                            </h1>
                            <form action="" method="post" className='flex flex-col justify-center items-start w-9/10 pl-5 py-3 gap-6 lg:gap-10' onSubmit={isSignIn ? handleLoginSubmit : handleRegister}>
                                {!isSignIn && (
                                    <>
                                        <input autoComplete='off' type="text" name='username' placeholder='Nama Anda' onChange={handleChange}
                                            className='w-full outline-0 border-b border-b-white/50 py-2 transition-opacity duration-300' />
                                        <input autoComplete='off' type="text" name='email' placeholder='Email Anda' onChange={handleChange}
                                            className='w-full outline-0 border-b border-b-white/50 py-2 transition-opacity duration-300' />
                                        <div className="relative w-full flex items-center transition-opacity duration-300">
                                            <input autoComplete='off' type={showPassword ? "text" : "password"} name='password' placeholder='Buat Password'
                                                className='w-full outline-0 border-b border-b-white/50 py-2' onChange={handleChange} />
                                            <button className='opacity-50 w-10 h-10 hover:opacity-100 transition-opacity' type="button" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </>
                                )}
                                {isSignIn && (
                                    <>
                                        <input autoComplete='off' type="text" name='email' placeholder='Email Anda' onChange={handleChange}
                                            className='w-full outline-0 border-b border-b-white/50 py-2 transition-opacity duration-300' />
                                        <div className="relative w-full flex items-center flex-row transition-opacity duration-300">
                                            <input autoComplete='off' type={showPassword ? "text" : "password"} name='password' placeholder='Password Anda' onChange={handleChange}
                                                className='w-full outline-0 border-b border-b-white/50 py-2' />
                                            <button className='opacity-50 w-10 h-10 hover:opacity-100 transition-opacity' type='button' onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </>
                                )}
                                <div className="w-full flex flex-col items-center justify-center gap-2">
                                    {message && <p className='text-white text-sm'>{message}</p>}
                                    <button disabled={AuthLoading} onClick={() => setShowPassword(false)} className={`w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-[#4a6fa3] transition-colors duration-300 ${AuthLoading ? 'cursor-not-allowed opacity-70' : ''}`}>
                                        {AuthLoading ? (isSignIn ? 'Signing In...' : 'Signing Up...') : (isSignIn ? 'Sign In' : 'Sign Up')}
                                    </button>
                                    <p className='text-center font-light text-white/50 text-sm'>
                                        {isSignIn ? 'Belum punya akun?' : 'Sudah punya akun?'}
                                        <span onClick={() => { toggleButton(); setMessage('') }} className='text-primary font-semibold cursor-pointer hover:text-white transition-colors duration-300'>
                                            {' '}{isSignIn ? 'Sign Up' : 'Sign In'}
                                        </span>
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Divider - hidden on very small screens */}
                        <div className="hidden sm:flex w-px h-full opacity-50 flex-col items-center justify-center gap-3 mx-2">
                            <div className="bg-white w-0.5 h-28"></div>
                            <p className='text-white text-xs'>ATAU</p>
                            <div className="bg-white w-0.5 h-28"></div>
                        </div>

                        {/* Social Buttons */}
                        <div className="hidden sm:flex flex-col items-center justify-center gap-5 px-3">
                            <button className='flex items-center justify-center w-8 h-8 bg-primary rounded-full text-[#021124] hover:bg-[#4a6fa3] transition-colors duration-300'><FaInstagram /></button>
                            <button className='flex items-center justify-center w-8 h-8 bg-primary rounded-full text-[#021124] hover:bg-[#4a6fa3] transition-colors duration-300'><FaGoogle /></button>
                            <button className='flex items-center justify-center w-8 h-8 bg-primary rounded-full text-[#021124] hover:bg-[#4a6fa3] transition-colors duration-300'><FaFacebook /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
