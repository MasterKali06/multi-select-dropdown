import {useEffect, useRef} from "react";


export const useEnterFunction = (callback = () => {}) => {

    const ref = useRef<any>()
    const handler = (e: any) => {
        if (e?.keyCode === 13) {
            callback()
        }
    }

    useEffect(() => {
        ref.current = handler
    }, [handler])


    useEffect(() => {

        const isSupported = window && window.addEventListener

        if (!isSupported) return

        const eventListener = (event: any) => ref.current(event)

        window.addEventListener('keyup', eventListener)

        return () => window.removeEventListener('keyup', eventListener)
    }, [window])

}
