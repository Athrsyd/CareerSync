import React from 'react'

const levelColor = (level) => {
  if (level === 'basic')        return { bg: 'bg-green-500/20', text: 'text-green-600',  fill: '#16A34A' };
  if (level === 'intermediate') return { bg: 'bg-yellow-500/20', text: 'text-yellow-500', fill: '#EAB308' };
  if (level === 'advanced')     return { bg: 'bg-red-500/20',    text: 'text-red-600',    fill: '#DC2626' };
  return { bg: 'bg-gray-200', text: 'text-black', fill: '#000000' };
};

const StyleTools = ({ tools }) => (
  <div className="flex flex-row gap-2 flex-wrap">
    {tools.map((tool, i) => (
      <div key={i} className="px-3 py-1 bg-nav rounded-full text-xs sm:text-sm font-semibold font-montserrat text-[#06275A]">
        {tool}
      </div>
    ))}
  </div>
);

const LevelAndTools = ({ project }) => {
  const lc = levelColor(project?.level);
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">

      {/* Level card */}
      <div className="flex flex-row items-center gap-3 flex-1 h-auto min-h-32 py-4 px-4 bg-white shadow-lg rounded-2xl outline-2 outline-primary">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex justify-center items-center shrink-0 ${lc.bg}`}>
          <svg width="44" height="44" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.5718 0.706024C37.8205 1.41205 37.8205 2.54699 37.8205 4.81928V36.1446C37.8205 38.4169 37.8205 39.5518 38.5718 40.2578C39.3231 40.9639 40.5308 40.9639 42.9487 40.9639C45.3667 40.9639 46.5744 40.9639 47.3256 40.2578C48.0769 39.5518 48.0769 38.4169 48.0769 36.1446V4.81928C48.0769 2.54699 48.0769 1.41205 47.3256 0.706024C46.5744 -7.18128e-08 45.3667 0 42.9487 0C40.5308 0 39.3231 -7.18128e-08 38.5718 0.706024ZM19.8718 12.0482C19.8718 9.7759 19.8718 8.64096 20.6231 7.93494C21.3744 7.22892 22.5821 7.22892 25 7.22892C27.4179 7.22892 28.6256 7.22892 29.3769 7.93494C30.1282 8.64096 30.1282 9.7759 30.1282 12.0482V36.1446C30.1282 38.4169 30.1282 39.5518 29.3769 40.2578C28.6256 40.9639 27.4179 40.9639 25 40.9639C22.5821 40.9639 21.3744 40.9639 20.6231 40.2578C19.8718 39.5518 19.8718 38.4169 19.8718 36.1446V12.0482ZM2.67436 17.5735C1.92308 18.2795 1.92308 19.4145 1.92308 21.6867V36.1446C1.92308 38.4169 1.92308 39.5518 2.67436 40.2578C3.42564 40.9639 4.63333 40.9639 7.05128 40.9639C9.46923 40.9639 10.6769 40.9639 11.4282 40.2578C12.1795 39.5518 12.1795 38.4169 12.1795 36.1446V21.6867C12.1795 19.4145 12.1795 18.2795 11.4282 17.5735C10.6769 16.8675 9.46923 16.8675 7.05128 16.8675C4.63333 16.8675 3.42564 16.8675 2.67436 17.5735ZM1.92308 46.3855C1.41305 46.3855 0.923903 46.5759 0.563256 46.9149C0.202609 47.2538 0 47.7135 0 48.1928C0 48.6721 0.202609 49.1318 0.563256 49.4707C0.923903 49.8096 1.41305 50 1.92308 50H48.0769C48.587 50 49.0761 49.8096 49.4367 49.4707C49.7974 49.1318 50 48.6721 50 48.1928C50 47.7135 49.7974 47.2538 49.4367 46.9149C49.0761 46.5759 48.587 46.3855 48.0769 46.3855H1.92308Z" fill={lc.fill} />
          </svg>
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-xs font-semibold font-montserrat text-black/50 uppercase tracking-wide">Level Kesulitan</p>
          <p className={`text-xl sm:text-2xl font-bold font-montserrat capitalize ${lc.text}`}>
            {project?.level || '—'}
          </p>
          <span className="inline-block text-xs font-semibold font-montserrat bg-gray-100 py-1 px-3 rounded-full text-black/50 w-fit">
            Estimasi: {project?.duration || '—'}
          </span>
        </div>
      </div>

      {/* Tools card */}
      <div className="flex flex-row items-center gap-3 flex-1 h-auto min-h-32 py-4 px-4 bg-white shadow-lg rounded-2xl outline-2 outline-primary">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex justify-center items-center bg-nav shrink-0">
          <svg width="38" height="38" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.7959 16.5375L18.75 10.6812L12.8292 4.76457C14.0375 4.37916 15.3292 4.16666 16.6667 4.16666C18.6191 4.16609 20.5446 4.62288 22.2887 5.50044C24.0328 6.37799 25.5471 7.65191 26.7102 9.22008C27.8733 10.7883 28.6529 12.6071 28.9865 14.5308C29.3201 16.4545 29.1985 18.4297 28.6313 20.2979L41.6667 33.3333C42.2139 33.8805 42.6479 34.5301 42.944 35.245C43.2402 35.9599 43.3926 36.7262 43.3926 37.5C43.3926 38.2738 43.2402 39.0401 42.944 39.755C42.6479 40.4699 42.2139 41.1195 41.6667 41.6667C41.1195 42.2138 40.4699 42.6479 39.755 42.944C39.0401 43.2401 38.2739 43.3925 37.5 43.3925C36.7262 43.3925 35.96 43.2401 35.245 42.944C34.5301 42.6479 33.8805 42.2138 33.3334 41.6667L20.2979 28.6312C18.1149 29.2951 15.7918 29.3488 13.5805 28.7864C11.3692 28.2241 9.35391 27.0672 7.7532 25.4412C6.15249 23.8151 5.02738 21.782 4.49983 19.5621C3.97228 17.3422 4.06241 15.0202 4.76045 12.8479L10.675 18.75L16.5354 16.7979L16.7959 16.5375Z" fill="#5482B4" />
          </svg>
        </div>
        <div className="flex flex-col gap-2 min-w-0">
          <p className="text-xs font-semibold font-montserrat text-black/50 uppercase tracking-wide">Alat yang digunakan</p>
          <StyleTools tools={project?.tools || []} />
        </div>
      </div>
    </div>
  );
}

export default LevelAndTools
