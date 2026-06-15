import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'

type RSVPMenuButtonProps = {
    to: string
    className: string
    onClick: () => void
    children: React.ReactNode
}

const OUTER_INSET = 1
const INNER_INSET = 8
const OUTER_WIDTH = 4
const INNER_WIDTH = 2

// Fast-in / soft-out gives the stroke a confident drawn-by-hand feel
const DRAW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// wide angled shimmer that sweeps across once the border finishes
// drawing, then repeats on a 3s cycle while hovered.
const SHIMMER_TILT = -30 // degrees (negative leans the bar like "\")
const SHIMMER_SWEEP = 1.2 // seconds for one pass
const SHIMMER_PERIOD = 3 // seconds between sweeps
const SHIMMER_DELAY = 0.8 // approx outer-border draw duration
const SHIMMER_EASE = [0.45, 0, 0.55, 1]

type Corners = { tl: number; tr: number; br: number; bl: number }

const ZERO_CORNERS: Corners = { tl: 0, tr: 0, br: 0, bl: 0 }

// Shrink each corner radius by the inset so the frame stays concentric
// (parallel) to the button's own rounded corners.
const insetCorners = (r: Corners, d: number): Corners => ({
    tl: Math.max(0, r.tl - d),
    tr: Math.max(0, r.tr - d),
    br: Math.max(0, r.br - d),
    bl: Math.max(0, r.bl - d),
})

// Rounded-rect path traced clockwise, starting just past the top-left
// corner so the stroke still "draws in" from the top-left.
const framePath = (x: number, y: number, w: number, h: number, r: Corners) => {
    const max = Math.min(w, h) / 2
    const tl = Math.min(r.tl, max)
    const tr = Math.min(r.tr, max)
    const br = Math.min(r.br, max)
    const bl = Math.min(r.bl, max)
    return [
        `M ${x + tl} ${y}`,
        `H ${x + w - tr}`,
        tr ? `A ${tr} ${tr} 0 0 1 ${x + w} ${y + tr}` : '',
        `V ${y + h - br}`,
        br ? `A ${br} ${br} 0 0 1 ${x + w - br} ${y + h}` : '',
        `H ${x + bl}`,
        bl ? `A ${bl} ${bl} 0 0 1 ${x} ${y + h - bl}` : '',
        `V ${y + tl}`,
        tl ? `A ${tl} ${tl} 0 0 1 ${x + tl} ${y}` : '',
        'Z',
    ]
        .filter(Boolean)
        .join(' ')
}

// Outer line: strokes clockwise from the top-left on hover, rewinds on leave.
const outerVariants: Variants = {
    rest: {
        pathLength: 0,
        transition: { pathLength: { duration: 0.55, ease: 'easeInOut' } },
    },
    hover: {
        pathLength: 1,
        transition: { pathLength: { duration: 0.8, ease: DRAW_EASE } },
    },
}

// Inner frame: fades in alongside the outer draw, fades out a touch quicker.
const innerVariants: Variants = {
    rest: {
        opacity: 0,
        transition: { opacity: { duration: 0.3, ease: 'easeOut' } },
    },
    hover: {
        opacity: 1,
        transition: { opacity: { duration: 0.7, ease: 'easeOut' } },
    },
}

const RSVPMenuButton = ({
    to,
    className,
    onClick,
    children,
}: RSVPMenuButtonProps) => {
    const ref = useRef<HTMLAnchorElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [size, setSize] = useState({ w: 0, h: 0, radii: ZERO_CORNERS })

    // Track the rendered size *and* corner radii so the frame can be drawn
    // in real pixels and hug whatever rounding the button currently has.
    useEffect(() => {
        const el = ref.current
        if (!el) return

        const update = () => {
            const cs = getComputedStyle(el)
            const px = (v: string) => parseFloat(v) || 0
            setSize({
                w: el.offsetWidth,
                h: el.offsetHeight,
                radii: {
                    tl: px(cs.borderTopLeftRadius),
                    tr: px(cs.borderTopRightRadius),
                    br: px(cs.borderBottomRightRadius),
                    bl: px(cs.borderBottomLeftRadius),
                },
            })
        }
        update()

        const observer = new ResizeObserver(update)
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const { w, h, radii } = size
    const ready = w > 0 && h > 0
    const animateState = isHovered ? 'hover' : 'rest'

    const outerPath = framePath(
        OUTER_INSET,
        OUTER_INSET,
        w - OUTER_INSET * 2,
        h - OUTER_INSET * 2,
        insetCorners(radii, OUTER_INSET)
    )
    const innerPath = framePath(
        INNER_INSET,
        INNER_INSET,
        w - INNER_INSET * 2,
        h - INNER_INSET * 2,
        insetCorners(radii, INNER_INSET)
    )

    // Tall, flat band so the tilt reads across the short button; travels
    // from fully off the left to fully off the right.
    const bandWidth = Math.max(100, Math.round(w * 0.22))
    const shimmerFrom = -bandWidth - h
    const shimmerTo = w + h

    return (
        <Link
            ref={ref}
            to={to}
            className={`${className} relative block`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {ready && (
                <>
                    {/* Shimmer — clipped to the button's rounded shape */}
                    <div
                        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
                        style={{ borderRadius: 'inherit' }}
                        aria-hidden="true"
                    >
                        <motion.div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: -h * 0.5,
                                width: bandWidth,
                                height: h * 2,
                                rotate: SHIMMER_TILT,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            }}
                            initial={{ x: shimmerFrom }}
                            animate={
                                isHovered
                                    ? { x: [shimmerFrom, shimmerTo] }
                                    : { x: shimmerFrom }
                            }
                            //@ts-ignore
                            transition={
                                isHovered
                                    ? {
                                        x: {
                                            duration: SHIMMER_SWEEP,
                                            ease: SHIMMER_EASE,
                                            repeat: Infinity,
                                            repeatDelay:
                                                SHIMMER_PERIOD - SHIMMER_SWEEP,
                                            delay: SHIMMER_DELAY,
                                        },
                                    }
                                    : { duration: 0 }
                            }
                        />
                    </div>
                    {/* Picture-frame border */}
                    <svg
                        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
                        viewBox={`0 0 ${w} ${h}`}
                        fill="none"
                        aria-hidden="true"
                    >
                        <motion.path
                            d={innerPath}
                            fill="none"
                            stroke="white"
                            strokeWidth={INNER_WIDTH}
                            vectorEffect="non-scaling-stroke"
                            variants={innerVariants}
                            initial="rest"
                            animate={animateState}
                        />
                        <motion.path
                            d={outerPath}
                            fill="none"
                            stroke="white"
                            strokeWidth={OUTER_WIDTH}
                            vectorEffect="non-scaling-stroke"
                            variants={outerVariants}
                            initial="rest"
                            animate={animateState}
                        />
                    </svg>
                </>
            )}
            <span className="relative z-10">{children}</span>
        </Link>
    )
}

export default RSVPMenuButton
