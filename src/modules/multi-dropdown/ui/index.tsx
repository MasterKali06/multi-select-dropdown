import '../styles/index.css';
import {FC, ReactNode, useEffect, useRef, useState} from "react";
import { IoChevronDown } from "react-icons/io5";
import useClickOutside from "../core/hooks/useClickOutside";
import { BsFileEarmarkText } from "react-icons/bs";
import {useEnterFunction} from "../core/hooks/useEnterFunction";
import { FaCheck } from "react-icons/fa6";
import {useMultiSelectDropDown} from "../core/hooks/useMultiSelectDropDown";


interface IMultiDropdown {
    inputClassName?: string
    textClassName?: string
    dropdownClassName?: string
    dropdownItemClassName?: string
    placeholder?: string
    options?: string[]
    noDataElement?: ReactNode
    canHaveDuplicate?: boolean,
    onChangeOptions?: (data: string[]) => void
}

/**
 * @component
 * @example
 * ```
 *  <MultiDropdown textClassName='text-lg' />
 * ```
 * @param {string} inputClassName - className that added to the input of dropdown
 * @param {string} textClassName - you can change the text size and weight of input
 * @param {string} dropdownClassName - you can change dropdown className
 * @param {string} dropdownItemClassName - you can change dropdown items
 * @param {string} placeholder - placeholder of dropdown input
 * @param {string} options - default options if you have
 * @param {ReactNode} noDataElement - tsx/jsx to put when there is no data
 * @param {boolean} canHaveDuplicate - can have duplicate options or not
 *
 * @constructor
 */
const MultiDropdown: FC<IMultiDropdown> = ({
    inputClassName  = '',
    textClassName= '',
    dropdownClassName= '',
    dropdownItemClassName= '',
    placeholder = '',
    options = [],
    noDataElement,
    canHaveDuplicate= false,
    onChangeOptions,
}) => {

    const {
        dropdownRef, openDropdown,
        isDropdownOpen, newOption,
        handleOptionInputChange,
        changeDropdownStatus,
        onBoardOptions,
        selectedOptions,
        onSelectAnOption
    } = useMultiSelectDropDown({ options, canHaveDuplicate, onChangeOptions})

    return (
        <div className={'relative'} ref={dropdownRef}>
            <div className={`input-outline ${isDropdownOpen ? 'input-outline-active' : ''} `} onClick={openDropdown}>
                <div className={'input-wrapper ' + inputClassName}>
                    <input
                        className={'main-input ' + textClassName}
                        placeholder={placeholder || 'Search Or Add Option'}
                        value={newOption}
                        onChange={handleOptionInputChange}
                    />
                    <div className={`${isDropdownOpen ? 'rotate-180' : 'rotate-0'} transition text-gray-600`} onClick={changeDropdownStatus}>
                        <IoChevronDown size={20} />
                    </div>
                </div>
            </div>
            {isDropdownOpen ?
                <div
                    className={'dropdown dropdown-anim ' + dropdownClassName}
                >
                    {onBoardOptions.length ?
                        <div className={'flex flex-col'}>
                            {onBoardOptions.map((option, idx) => {
                                const isActive = selectedOptions.find(x => x === option)
                                return (
                                    <div
                                        key={option}
                                        className={`dropdown-item ${isActive ? 'bg-primaryHover text-primarySelected' : ''} ` + dropdownItemClassName}
                                        onClick={() => onSelectAnOption(option)}
                                    >
                                        <span>{option}</span>
                                        {isActive ?
                                            <FaCheck size={18} />
                                        : null}
                                    </div>
                                )
                            })}
                        </div>
                        :
                        (noDataElement ?
                            noDataElement
                                :
                            <div className={'w-full h-full min-h-[144px] flex-center flex-col gap-2 text-gray-600'}>
                                <BsFileEarmarkText size={42} />
                                <span>No Data Found</span>
                            </div>
                        )
                    }
                </div>
            : null}
        </div>
    )
}

export default MultiDropdown
