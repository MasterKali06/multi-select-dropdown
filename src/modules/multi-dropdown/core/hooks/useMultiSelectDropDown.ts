import {ChangeEvent, MouseEvent, RefObject, useEffect, useRef, useState} from "react";
import useClickOutside from "./useClickOutside";
import {useEnterFunction} from "./useEnterFunction";


interface IMultiSelectDropDownHook {
    options: string[],
    canHaveDuplicate: boolean,
    onChangeOptions?: (data: string[]) => void

}

interface IMultiHookRes {
    dropdownRef: RefObject<HTMLDivElement>
    isDropdownOpen: boolean
    newOption: string
    onBoardOptions: string[]
    selectedOptions: string[]
    openDropdown: () => void
    handleOptionInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    changeDropdownStatus: (e: MouseEvent<HTMLDivElement>) => void
    onSelectAnOption: (option: string) => void
}

export const useMultiSelectDropDown = ({ options, canHaveDuplicate, onChangeOptions}: IMultiSelectDropDownHook) : IMultiHookRes => {

    const initialOptions: string[] = []
    const [onBoardCache, setOnBoardCache] = useState(options)
    const [onBoardOptions, setOnBoardOptions] = useState<string[]>(options)
    const [selectedOptions, setSelectedOptions] = useState(initialOptions)

    // new option to add options - main input value
    const [newOption, setNewOption] = useState('')

    // dropdown state
    const dropdownRef = useRef<any>()
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const openDropdown = () => setIsDropdownOpen(true)
    const closeDropdown = () => setIsDropdownOpen(false)
    useClickOutside(dropdownRef, closeDropdown)

    const handleOptionInputChange = (e: ChangeEvent<HTMLInputElement>) => setNewOption(e?.target?.value)
    const changeDropdownStatus = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDropdownOpen(state => !state)
    }

    // searching when input change
    useEffect(() => {
        if (!!newOption) {
            const newOnBoard = onBoardOptions.filter(x => x.includes(newOption))
            setOnBoardOptions(newOnBoard)
        }else {
            setOnBoardOptions(onBoardCache)
        }
    }, [newOption])

    const addItemToOptions = () => {
        if (!newOption) return
        const alreadyInList = onBoardCache.find(x => x === newOption)
        if (canHaveDuplicate || !alreadyInList) {
            const newState = [...onBoardCache]
            newState.unshift(newOption)
            setOnBoardCache(newState)
            setOnBoardOptions(newState)
            if (onChangeOptions) onChangeOptions(newState)
            setNewOption('')
        }
    }
    useEnterFunction(addItemToOptions)

    const onSelectAnOption = (option: string) => {
        setSelectedOptions(state => {
            const alreadySelected = state.find(x => x === option)
            let newState = [...state]
            if (alreadySelected) newState = newState.filter(x => x !== option)
            else newState.push(option)
            return newState
        })
    }

    return {
        dropdownRef, openDropdown,
        isDropdownOpen, newOption,
        handleOptionInputChange,
        changeDropdownStatus,
        onBoardOptions,
        selectedOptions,
        onSelectAnOption
    }
}
