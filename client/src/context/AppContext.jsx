import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props)=>{

    const [searchFilter, setSearchFilter] = useState({
        title:"",
        location:""
    });

    const [isSearched, setIsSearched] = useState(false);
    const [jobs, setJobs] = useState([]);

    //Function for fetch jobs data

    const fetchjobsData =async ()=>{
        setJobs(jobsData);
    }

    useEffect(()=>{
        fetchjobsData();
    },[])

    const value ={
        searchFilter, setSearchFilter, isSearched, setIsSearched,jobs, setJobs,fetchjobsData
    }
    return(<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}

export default AppContext;