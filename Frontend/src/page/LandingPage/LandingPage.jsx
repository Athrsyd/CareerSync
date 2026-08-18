import { useState } from 'react'
import background from '../../assets/bg-auth.jpeg'
import logo from '../../assets/Logo_CareerSync.svg'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import AuthHooks from '../../hooks/AuthHooks';

const PopUp = ({ onClose, onclick, onclick2, username }) => {
    return (
        <div className="popup absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 px-4"
            onClick={onClose}>
            <div className="popup-content bg-white rounded-lg p-6 w-full max-w-sm text-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg sm:text-xl font-bold">Apakah anda ingin masuk sebagai {username}!</h2>
                <p className="text-gray-700 mb-8 text-sm sm:text-base">Jika bukan, silahkan login dengan akun lain.</p>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <button className="bg-[#06275A] transition-all ease-in-out duration-200 text-white py-2 px-4 rounded-full hover:bg-[#06275A]/80 text-sm"
                        onClick={onclick}>
                        Ya, itu saya!
                    </button>
                    <button className="bg-[#06275A] transition-all ease-in-out duration-200 text-white py-2 px-4 rounded-full hover:bg-[#06275A]/80 text-sm"
                        onClick={onclick2}>
                        Bukan
                    </button>
                </div>
            </div>
        </div>)
}

const LandingPage = () => {
    const { user } = useUser();
    const [popUp, setPopup] = useState(false);
    const token = localStorage.getItem('tokenCareerSync');
    const navigate = useNavigate();
    const { Logout } = AuthHooks();

    const handleOnClick = () => {
        if (token) {
            setPopup(true);
        } else {
            navigate('/auth');
        }
    }

    return (
        <div className="relative w-full h-screen flex items-center justify-center">
            <div className="bg absolute -z-10 opacity-50 blur-xl h-full w-full">
                <img src={background} alt="" className='w-full h-full object-cover' />
            </div>
            <div className="relative flex flex-col h-screen justify-center my-10 items-center px-4">
                <div className="mb-4">
                    <img src={logo} alt="" className="w-32 sm:w-40 md:w-44" />
                </div>
                <div className="mb-4 flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#33A9DC] text-center leading-tight">
                        Selamat datang di CareerSync
                    </h1>
                    <p className="text-base sm:text-xl md:text-2xl font-semibold mt-2 w-full sm:w-5/6 text-[#06275A] text-center">
                        Ayo kembangkan skill mu dan jadilah profesional yang siap untuk dunia Industri !
                    </p>
                </div>
                <button
                    className="bg-[#06275A] transition-all ease-in-out duration-200 text-white py-2 px-6 rounded-full hover:bg-[#06275A]/80 text-sm sm:text-base"
                    onClick={handleOnClick}
                >
                    {token ? 'Dashboard' : 'Login / Register'}
                </button>
            </div>

            {popUp && <PopUp
                onClose={() => setPopup(false)}
                onclick={() => navigate('/dashboard')}
                username={user?.username}
                onclick2={() => { Logout(); navigate('/auth'); }}
            />}
        </div>
    )
}

export default LandingPage
