import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        title:"",
        location:""
    });

    const [isSearched, setIsSearched] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showRLogin, setShowRLogin] = useState(false);
    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    //Function for fetch jobs data

    const fetchjobsData =async ()=>{
        setJobs(jobsData);
    }

    useEffect(()=>{
        fetchjobsData();
    },[])

    const value ={
        searchFilter, setSearchFilter, isSearched, setIsSearched,jobs, setJobs,fetchjobsData, showRLogin, setShowRLogin, companyData, setCompanyData,companyToken, setCompanyToken, backendUrl
    }
    return(<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}

export default AppContext;