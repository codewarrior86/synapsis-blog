import { createContext, useContext, useState } from "react";


const GlobalContext = createContext();

export function useGlobalContext() {
    return useContext(GlobalContext);
}

export function GlobalProvider(props) {

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update state to force render
        // A function that increment 👆🏻 the previous state like here 
        // is better than directly setting `setValue(value + 1)`
    }
    const forceUpdate = useForceUpdate();




    // export value
    const value = {
        forceUpdate
    }
    return <GlobalContext.Provider value={value} {...props} />;
}


