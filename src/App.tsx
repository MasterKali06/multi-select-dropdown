import MultiDropdown from "./modules/multi-dropdown/ui";
import React, {useState} from "react";


const App = () => {

    /* example with options */
    const [options, setOptions] = useState(['hello', 'world', 'john'])

    return (
        <MultiDropdown
            options={options}
            onChangeOptions={setOptions}
        />
    )

    /* raw example with style change */
    return (
        <MultiDropdown
            inputClassName={'w-[600px] h-[48px]'}
            textClassName={'text-lg'}
            dropdownClassName={'max-h-[400px]'}
        />
    )
}

export default App
