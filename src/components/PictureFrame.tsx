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

    const frameStyles = {
        small: {
            dimensions: 'w-64 h-64',
            aspectRatio: 'aspect-square',
            outer: '',
            inner: 'border-3',
        },
        medium: {
            dimensions: 'w-96',
            aspectRatio: 'aspect-[4/3]',
            outer: 'border-5 p-1',
            inner: 'border-3',
        },
        large: {
            dimensions: 'w-full',
            aspectRatio: 'aspect-video',
            outer: 'border-3 md:border-6 p-1.5',
            inner: 'border-2 md:border-4',
        },
    }[size]

    return (
        <div
            className={`relative z-0 ${frameStyles.dimensions} ${frameStyles.outer} ${frameStyles.outer ? 'border-picture-frame-border bg-transparent' : ''}`}
        >
            <div
                className={`relative overflow-hidden ${frameStyles.aspectRatio} ${frameStyles.inner} border-picture-frame-border`}
            >
                {/* LQIP placeholder */}
                <img
                    src={lqip.lqip}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{ imageOrientation: 'from-image' }}
                    aria-hidden="true"
                />
                {/* Full resolution image */}
                <img
                    src={lqip.src}
                    alt={alt}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                    style={{ opacity: isLoaded ? 1 : 0, imageOrientation: 'from-image' }}
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
        </div>
    )
}

export default PictureFrame
