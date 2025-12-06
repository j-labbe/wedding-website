import React, { useState } from 'react'

interface LQIPData {
    lqip: string
    src: string
    width: number
    height: number
}

interface ProfileImageProps {
    lqip: LQIPData
    size?: 'small' | 'medium' | 'large'
    alt?: string
    name?: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({
    lqip,
    size = 'medium',
    alt = 'Profile picture',
    name,
}) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const sizeClasses = {
        small: 'w-32 h-32',
        medium: 'w-48 h-48',
        large: 'w-64 h-64',
    }[size]

    const borderWidth = {
        small: 'border-3',
        medium: 'border-4 md:border-5',
        large: 'border-5 md:border-6',
    }[size]

    return (
        <div className="flex flex-col items-center gap-3">
            <div
                className={`relative ${sizeClasses} rounded-full ${borderWidth} border-picture-frame-border overflow-hidden`}
            >
                <div className="relative w-full h-full">
                    {/* LQIP placeholder */}
                    <img
                        src={lqip.lqip}
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        aria-hidden="true"
                    />
                    {/* Full resolution image */}
                    <img
                        src={lqip.src}
                        alt={alt}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                        style={{ opacity: isLoaded ? 1 : 0 }}
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
            </div>
            {name && (
                <p className="text-center font-semibold text-lg md:text-xl">
                    {name}
                </p>
            )}
        </div>
    )
}

export default ProfileImage
