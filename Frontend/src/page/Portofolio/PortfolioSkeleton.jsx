import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Skeleton kerangka halaman Portfolio publik (Template2): navbar, hero, skills, projects.
const PortfolioSkeleton = () => {
    return (
        <div className="bg-white text-gray-900 min-h-screen">
            {/* Navbar */}
            <nav className="w-full shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Skeleton width={160} height={20} />
                        <div className="hidden md:flex gap-8">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} width={50} height={14} />
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-16 pb-16 bg-blue-50/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-center gap-12 items-center py-10">
                        <div className="w-full md:w-1/2 flex flex-col items-start gap-4">
                            <Skeleton width="80%" height={40} />
                            <Skeleton width="60%" height={40} />
                            <Skeleton count={3} />
                            <div className="flex gap-4 mt-2">
                                <Skeleton width={160} height={44} borderRadius={12} />
                                <Skeleton width={160} height={44} borderRadius={12} />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center">
                            <Skeleton circle width={220} height={220} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Skeleton width={200} height={28} className="mb-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} height={120} style={{ borderRadius: '1rem' }} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Skeleton width={200} height={28} className="mb-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Skeleton key={i} height={180} style={{ borderRadius: '1rem' }} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PortfolioSkeleton
