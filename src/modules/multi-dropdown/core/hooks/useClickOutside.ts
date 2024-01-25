import {RefObject, useEffect, useRef} from "react";

const useClickOutside = (ref: RefObject<HTMLDivElement>, callback = () => {}) => {
    const callbackRef = useRef<any>()
    callbackRef.current = callback

    useEffect(() => {

        const handleClickOutside = (e: any) => {
            if (!ref?.current?.contains(e.target) && callbackRef.current) {
                callbackRef.current(e)
            }
        }
        document.addEventListener('click', handleClickOutside, true)

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [callbackRef, ref])
}

export default useClickOutside;
