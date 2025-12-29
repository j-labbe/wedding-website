/// <reference types="vite/client" />

declare module '*.svg?react' {
    import { FunctionComponent, SVGProps } from 'react'
    const content: FunctionComponent<SVGProps<SVGSVGElement>>
    export default content
}

declare module '*.jpg?lqip' {
    const content: {
        src: string
        lqip: string
        width: number
        height: number
    }
    export default content
}

declare module '*.jpeg?lqip' {
    const content: {
        src: string
        lqip: string
        width: number
        height: number
    }
    export default content
}

declare module '*.JPEG?lqip' {
    const content: {
        src: string
        lqip: string
        width: number
        height: number
    }
    export default content
}

declare module '*.JPG?lqip' {
    const content: {
        src: string
        lqip: string
        width: number
        height: number
    }
    export default content
}

declare module '*.png?lqip' {
    const content: {
        src: string
        lqip: string
        width: number
        height: number
    }
    export default content
}

declare module '*.PNG?lqip' {
    const content: {
        src: string
        lqip: string
        width: number
        height: number
    }
    export default content
}
