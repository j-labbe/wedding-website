import React, { useState } from 'react'

interface LQIPData {
    lqip: string
    src: string
    width: number
    height: number
}

interface PictureFrameProps {
    lqip: LQIPData
    size?: 'small' | 'medium' | 'large' // small: square, medium: 4:3, large: 16:9
    alt?: string
}

const PictureFrame: React.FC<PictureFrameProps> = ({
    lqip,
    size = 'medium',
    alt = 'Picture',
}) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const aspectRatioClass = {
        small: 'aspect-square',
        medium: 'aspect-[4/3]',
        large: 'aspect-video',
    }[size]

    const sizeClass = {
        small: 'w-64',
        medium: 'w-96',
        large: 'w-full',
    }[size]

    return (
        <div
            className={`relative z-0 ${sizeClass} ${size === 'large' ? 'border-3 p-1 md:border-6 border-picture-frame-border bg-transparent' : ''}`}
        >
            <div
                className={`relative overflow-hidden ${aspectRatioClass} ${size === "large" ? 'border-2' : 'border-3'} md:border-4 border-picture-frame-border`}
                style={{
                    backgroundImage: `url("${lqip.lqip}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Optimized image with progressive loading */}
                <img
                    src={lqip.src}
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                    style={{ opacity: isLoaded ? 1 : 0 }}
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
        </div>
    )
}

export default PictureFrame
