import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const WelcomeDashSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Main welcome card skeleton */}
      <div className="flex-1 min-h-52 rounded-2xl overflow-hidden">
        <Skeleton height={210} style={{ borderRadius: '1rem', display: 'block' }} />
      </div>
      {/* Score card skeleton */}
      <div className="w-full lg:w-64 shrink-0">
        <Skeleton height={210} style={{ borderRadius: '1rem', display: 'block' }} />
      </div>
    </div>
  )
}

export default WelcomeDashSkeleton
