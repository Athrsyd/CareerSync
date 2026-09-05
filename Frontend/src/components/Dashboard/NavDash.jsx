import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo_CareerSync.svg'
import AuthHooks from '../../hooks/AuthHooks';
import { useLocation } from 'react-router-dom';

const NavIcon = [
  {
    id: 1,
    icon: (
      <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99984 31.6667H14.9998V21.6667H24.9998V31.6667H29.9998V16.6667L19.9998 9.16667L9.99984 16.6667V31.6667ZM6.6665 35V15L19.9998 5L33.3332 15V35H21.6665V25H18.3332V35H6.6665Z" fill="#021124" />
      </svg>
    ),
    title: "Home",
    path: "/dashboard",
  },
  {
    id: 2,
    icon: (
      <svg width="18" height="18" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.16672 18.55V29.9333C8.16672 30.6141 7.89631 31.2669 7.41496 31.7482C6.93362 32.2296 6.28078 32.5 5.60005 32.5H2.58339C2.24493 32.5022 1.90938 32.4374 1.59605 32.3094C1.28272 32.1814 0.997802 31.9927 0.757697 31.7542C0.517591 31.5156 0.32704 31.2319 0.197012 30.9194C0.0669844 30.6069 4.73363e-05 30.2718 5.44722e-05 29.9333V18.55C-0.00215971 18.2101 0.0631484 17.8732 0.192189 17.5588C0.321229 17.2444 0.511432 16.9587 0.751759 16.7184C0.992086 16.478 1.27775 16.2878 1.59218 16.1588C1.9066 16.0298 2.24352 15.9645 2.58339 15.9667H5.60005C5.93852 15.9667 6.27365 16.0336 6.58614 16.1636C6.89863 16.2937 7.18232 16.4842 7.42088 16.7243C7.65944 16.9644 7.84815 17.2493 7.97615 17.5627C8.10415 17.876 8.16892 18.2115 8.16672 18.55ZM19.3334 2.58333V29.9333C19.3334 30.2718 19.2665 30.6069 19.1364 30.9194C19.0064 31.2319 18.8159 31.5156 18.5757 31.7542C18.3356 31.9927 18.0507 32.1814 17.7374 32.3094C17.4241 32.4374 17.0885 32.5022 16.7501 32.5H13.7334C13.0511 32.5 12.3966 32.2301 11.9126 31.7493C11.4286 31.2684 11.1545 30.6156 11.1501 29.9333V2.58333C11.1544 1.89954 11.428 1.24499 11.9115 0.761469C12.395 0.277944 13.0496 0.00436942 13.7334 0H16.7501C17.4352 0 18.0923 0.272172 18.5767 0.756641C19.0612 1.24111 19.3334 1.89819 19.3334 2.58333ZM30.4834 11.2167V29.9333C30.4834 30.6141 30.213 31.2669 29.7316 31.7482C29.2503 32.2296 28.5974 32.5 27.9167 32.5H24.9001C24.5616 32.5022 24.226 32.4374 23.9127 32.3094C23.5994 32.1814 23.3145 31.9927 23.0744 31.7542C22.8343 31.5156 22.6437 31.2319 22.5137 30.9194C22.3836 30.6069 22.3167 30.2718 22.3167 29.9333V11.2167C22.3167 10.8774 22.3835 10.5415 22.5134 10.2281C22.6432 9.91464 22.8335 9.62986 23.0734 9.38997C23.3132 9.15009 23.598 8.9598 23.9115 8.82998C24.2249 8.70015 24.5608 8.63333 24.9001 8.63333H27.9834C28.654 8.65498 29.2899 8.93667 29.7564 9.41882C30.223 9.90096 30.4837 10.5457 30.4834 11.2167Z" fill="#021124" />
      </svg>
    ),
    title: "Analysis",
    path: "/dashboard/analysis",
  },
  {
    id: 3,
    icon: (
      <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.66683 30L3.3335 27.6667L15.6668 15.25L22.3335 21.9167L31.0002 13.3333H26.6668V10H36.6668V20H33.3335V15.6667L22.3335 26.6667L15.6668 20L5.66683 30Z" fill="#021124" />
      </svg>
    ),
    title: "Progress",
    path: "/dashboard/progress",
  },
  {
    id: 4,
    icon: (
      <svg width="18" height="18" viewBox="0 0 34 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33333 26.6667C2.41667 26.6667 1.63222 26.3406 0.98 25.6883C0.327778 25.0361 0.00111111 24.2511 0 23.3333V3.33333C0 2.41667 0.326667 1.63222 0.98 0.98C1.63333 0.327777 2.41778 0.00111111 3.33333 0H13.3333L16.6667 3.33333H30C30.9167 3.33333 31.7017 3.66 32.355 4.31333C33.0083 4.96667 33.3344 5.75111 33.3333 6.66667V23.3333C33.3333 24.25 33.0072 25.035 32.355 25.6883C31.7028 26.3417 30.9178 26.6678 30 26.6667H3.33333ZM3.33333 23.3333H30V6.66667H15.2917L11.9583 3.33333H3.33333V23.3333Z" fill="#021124" />
      </svg>
    ),
    title: "Projects",
    path: "/dashboard/project",
  },
  {
    id: 5,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
      <path fill="currentColor" d="M4 5H.78c-.37 0-.74.32-.69.84l1.56 9.99S3.5 8.47 3.86 6.7c.11-.53.61-.7.98-.7H10s-.7-2.08-.77-2.31C9.11 3.25 8.89 3 8.45 3H5.14c-.36 0-.7.23-.8.64C4.25 4.04 4 5 4 5m4.88 0h-4s.42-1 .87-1h2.13c.48 0 1 1 1 1M2.67 16.25c-.31.47-.76.75-1.26.75h15.73c.54 0 .92-.31 1.03-.83c.44-2.19 1.68-8.44 1.68-8.44c.07-.5-.3-.73-.62-.73H16V5.53c0-.16-.26-.53-.66-.53h-3.76c-.52 0-.87.58-.87.58L10 7H5.59c-.32 0-.63.19-.69.5c0 0-1.59 6.7-1.72 7.33c-.07.37-.22.99-.51 1.42M15.38 7H11s.58-1 1.13-1h2.29c.71 0 .96 1 .96 1" />
    </svg>,
    title: "Portfolio",
    path: "/dashboard/portfolio",
  },
];

const LogoutIcon = () => (
  <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M26.8751 20C26.8751 19.6685 26.7434 19.3505 26.509 19.1161C26.2746 18.8817 25.9566 18.75 25.6251 18.75H7.33678L10.6051 15.95C10.7299 15.8432 10.8324 15.7129 10.9068 15.5664C10.9811 15.42 11.026 15.2604 11.0386 15.0966C11.0513 14.9329 11.0317 14.7683 10.9807 14.6121C10.9298 14.456 10.8486 14.3114 10.7418 14.1867C10.635 14.0619 10.5046 13.9594 10.3582 13.885C10.2118 13.8106 10.0522 13.7658 9.88842 13.7531C9.72468 13.7404 9.56004 13.7601 9.40391 13.8111C9.24778 13.862 9.10321 13.9432 8.97845 14.05L3.14512 19.05C3.00789 19.1673 2.89772 19.313 2.82218 19.477C2.74664 19.641 2.70752 19.8194 2.70752 20C2.70752 20.1806 2.74664 20.359 2.82218 20.523C2.89772 20.687 3.00789 20.8326 3.14512 20.95L8.97845 25.95C9.2304 26.1657 9.55773 26.2725 9.88842 26.2469C10.2191 26.2212 10.5261 26.0653 10.7418 25.8133C10.9575 25.5614 11.0643 25.234 11.0386 24.9034C11.013 24.5727 10.8571 24.2657 10.6051 24.05L7.33845 21.25H25.6251C25.9566 21.25 26.2746 21.1183 26.509 20.8839C26.7434 20.6495 26.8751 20.3315 26.8751 20Z" fill="#021124" />
    <path d="M15.625 13.3333C15.625 14.5033 15.625 15.0883 15.9067 15.51C16.028 15.6913 16.1837 15.847 16.365 15.9683C16.7867 16.25 17.3717 16.25 18.5417 16.25H25.625C26.6196 16.25 27.5734 16.6451 28.2766 17.3483C28.9799 18.0516 29.375 19.0054 29.375 20C29.375 20.9946 28.9799 21.9484 28.2766 22.6516C27.5734 23.3549 26.6196 23.75 25.625 23.75H18.5417C17.3717 23.75 16.7867 23.75 16.365 24.03C16.1835 24.1518 16.0278 24.3081 15.9067 24.49C15.625 24.9117 15.625 25.4967 15.625 26.6667C15.625 31.38 15.625 33.7383 17.09 35.2017C18.5533 36.6667 20.91 36.6667 25.6233 36.6667H27.29C32.0067 36.6667 34.3617 36.6667 35.8267 35.2017C37.2917 33.7383 37.2917 31.38 37.2917 26.6667V13.3333C37.2917 8.61999 37.2917 6.26166 35.8267 4.79833C34.3617 3.33499 32.005 3.33333 27.2917 3.33333H25.625C20.91 3.33333 18.5533 3.33333 17.09 4.79833C15.625 6.26166 15.625 8.61999 15.625 13.3333Z" fill="#021124" />
  </svg>
);

const SidebarIcon = ({ item, menuActive }) => {
  return (
    <div className={`flex flex-row transition-all ease-in duration-200 items-center justify-start w-full
      h-10 cursor-pointer hover:scale-105 rounded-l-full ${menuActive === item.id ? 'bg-white' : ''}`}>
      <div className="flex flex-col justify-center items-center h-12 w-12 pl-2 lg:pl-0">
        {item.icon}
      </div>
      <div className="w-20">
        <h1 className="hidden lg:block text-sm font-bold font-inclusive-sans ml-2">
          {item.title}
        </h1>
      </div>
    </div>
  );
}

const NavDash = () => {
  const location = useLocation();
  const menuActive = NavIcon.find(item => item.path === location.pathname)?.id;
  const { Logout } = AuthHooks();

  return (
    <>
      {/* ── Desktop / Tablet Sidebar (md+) ── */}
      <aside className="hidden md:flex bg-nav m-3 h-[96%] rounded-2xl md:w-16 lg:w-40 border-t-0 fixed left-0 top-0 z-50">
        <div className="flex w-full h-full flex-col items-center justify-start gap-7 lg:gap-8 py-8 lg:py-10">
          {/* Logo */}
          <div className="flex flex-row justify-center items-center mb-2 w-full">
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src={Logo} alt="logo" className="w-8 h-8" />
              <h1 className="hidden lg:block text-[12px] font-bold text-primary font-inclusive-sans mt-2 text-center">
                CareerSync
              </h1>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
            {NavIcon.map((item) => (
              <Link to={item.path} key={item.id} className="w-full md:pl-4 lg:pl-4">
                <SidebarIcon
                  item={item}
                  menuActive={menuActive}
                />
              </Link>
            ))}
          </div>

          <div className="md:w-12 lg:w-35 h-[1.25px] bg-primary mt-auto mb-2"></div>
          <div onClick={Logout} className="flex flex-row items-center lg:justify-start lg:w-35 h-10 md:pl-0 lg:pl-2
            cursor-pointer hover:bg-white hover:scale-105 transition-all ease-in-out duration-300 rounded-full w-full">
            <div className="flex flex-col justify-center items-center h-12 w-full lg:w-12">
              <LogoutIcon />
            </div>
            <div className="hidden lg:block w-20">
              <h1 className="text-sm font-bold font-inclusive-sans ml-2">Logout</h1>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Mobile Bottom Navigation Bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-nav rounded-t-2xl shadow-lg">
        <div className="flex flex-row justify-around items-center py-2 px-2">
          {NavIcon.map((item) => (
            <Link
              to={item.path}
              key={item.id}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${menuActive === item.id ? 'bg-white scale-105 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] -translate-y-4 ' : ''}`}
            >
              <div className="flex items-center justify-center w-8 h-8">
                {item.icon}
              </div>
              <span className="text-[9px] font-bold font-inclusive-sans mt-0.5 text-[#021124]">
                {item.title}
              </span>
            </Link>
          ))}
          {/* Logout button di mobile */}
          <button
            onClick={Logout}
            className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 hover:bg-white"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <LogoutIcon />
            </div>
            <span className="text-[9px] font-bold font-inclusive-sans mt-0.5 text-[#021124]">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavDash
