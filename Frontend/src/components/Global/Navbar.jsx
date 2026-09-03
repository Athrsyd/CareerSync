import React from 'react'
import Search from '../../assets/searchIcon.svg'
import Notif from "../../assets/Notif.svg";
import { useUser } from '../../context/UserContext'
import { useCareer } from '../../context/CareerContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Navbar = () => {
    const { user } = useUser();
    const { careerData } = useCareer();

    return (
        <div className="flex flex-row items-center justify-between gap-2 px-4 py-3 w-full overflow-x-hidden min-w-0">
            {/* Search bar */}
            <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mt-0">
                <input
                    type="search"
                    placeholder="Jelajahi..."
                    className="bg-[#D9D9D9]/30 text-sm rounded-xl w-full h-10 outline-0 pl-10 pr-3"
                />
                <img
                    src={Search}
                    className="w-5 absolute left-3 top-1/2 -translate-y-1/2"
                />
            </div>

            {/* Right side - notif + user */}
            <div className="flex flex-row items-center gap-2 shrink-0">
                <img src={Notif} className="w-5 h-5" />
                <div className="w-[1.25px] h-8 mx-1 bg-black/10 hidden sm:block"></div>
                <div className="hidden sm:flex flex-col justify-center leading-4 ml-1">
                    {user
                        ? <h1 className="text-xs sm:text-sm font-bold font-montserrat">{user?.username}</h1>
                        : <Skeleton width={80} height={10} />}
                    {careerData?.career_name
                        ? <h2 className="text-[11px] sm:text-xs font-semibold font-montserrat text-black/30">{careerData?.career_name}</h2>
                        : <Skeleton width={120} height={10} />}
                </div>
                {user?.username
                    ? <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ml-1 flex justify-center items-center bg-nav shrink-0">
                        <h1 className="text-primary text-base font-bold flex items-center justify-center h-full">
                            {user.username[0].toUpperCase()}
                        </h1>
                    </div>
                    : <Skeleton circle={true} width={36} height={36} />
                }
            </div>
        </div>
    )
}

export default Navbar
