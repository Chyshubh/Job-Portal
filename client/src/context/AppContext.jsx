import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { user } = useUser()
    const { getToken } = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: ""
    });

    const [isSearched, setIsSearched] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showRLogin, setShowRLogin] = useState(false);
    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);

    //Function for fetch jobs data

    const fetchjobsData = async () => {

        try {
            const endpoint = `${backendUrl}/api/jobs`
            const { data } = await axios.get(endpoint)

            if (data.success) {
                setJobs(data.jobs);
                console.log(data.jobs);
            } else {
                console.log(data.message);
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    //Function to fetch company data
    const fetchCompanyData = async () => {
        try {
            const endpoint = `${backendUrl}/api/company/company`;

            const { data } = await axios.get(endpoint, { headers: { token: companyToken } });

            if (data.success) {
                setCompanyData(data.company)
                console.log(data);

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch user data
const fetchUserData = async () => {
    try {
        const endpoint = `${backendUrl}/api/users/user`; // Update URL if needed
        const token = await getToken(); // Retrieve token from Clerk

        const { data } = await axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });

        if (data.success) {
            setUserData(data.user); // Set user data in state
        } else {
            toast.error(data.message); // Display the error message from the backend
        }

    } catch (error) {
        console.error("Error fetching user data:", error.message);
        toast.error(error.message || "An unexpected error occurred.");
    }
};

    useEffect(() => {
        fetchjobsData();

        const storedCompanyToken = localStorage.getItem('companyToken')

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken])

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user])


    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs, fetchjobsData,
        showRLogin, setShowRLogin,
        companyData, setCompanyData,
        companyToken, setCompanyToken,
        backendUrl
    }
    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}

export default AppContext;