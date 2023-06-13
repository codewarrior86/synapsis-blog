import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function useGlobalContext() {
    return useContext(GlobalContext);
}

export function GlobalProvider(props) {

    const [valueForce, setValue] = useState(false); // boolean state
    function useForceUpdate() {
        return () => setValue(!valueForce); // update state to force render
    }
    const forceUpdate = useForceUpdate();



    // export value
    const value = {
        forceUpdate,
        valueForce
    }
    return <GlobalContext.Provider value={value} {...props} />;
}


