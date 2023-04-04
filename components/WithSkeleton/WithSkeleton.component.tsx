import React from 'react'
import Skeleton from 'react-loading-skeleton'

import WithSkeletonStyle from './style'

interface SkeletonProps {
  isLoading: boolean
  otherClasses?: string[]
  [key: string]: any
}

const WithSkeleton = (WrappedComponent: React.ElementType) => {
  const SkeletonLoader = ({ 
    isLoading, 
    otherClasses, 
    ...otherProps 
  }: SkeletonProps) => {
    return isLoading ? (
      <WithSkeletonStyle
        className={otherClasses?.join(' ')}
      >
        <header>
          <Skeleton count={1} height={100} />
        </header>
        <main>
          <Skeleton count={5} />
        </main>
      </WithSkeletonStyle>
    ) : (
      <WrappedComponent {...otherProps} />
    )
  }

  return SkeletonLoader
}

export default WithSkeleton
