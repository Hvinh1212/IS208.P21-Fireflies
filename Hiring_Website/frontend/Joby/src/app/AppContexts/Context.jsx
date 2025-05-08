"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext([]);

export const AppProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocation] = useState([]);
  const [jobType, setJobType] = useState([]);


  const fetchCompanies = async () => {
    axios
      .get("http://localhost:5000/employers")
      .then((res) => {
        console.log(res.data);
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchJobs = async () => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCategories = async () => {
    axios
      .get("http://localhost:5000/professions")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchLocations = async () => {
    axios
      .get("http://localhost:5000/locations")
      .then((res) => {
        console.log(res.data);
        setLocation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchJobTypes = async () => {
    axios
      .get("http://localhost:5000/jobtypes")
      .then((res) => {
        console.log(res.data);
        setJobType(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    fetchCompanies();
    fetchJobs();
    fetchCategories();
    fetchLocations();
    fetchJobTypes();
  }, []);

  return (
    <DataContext.Provider value={[
      companies,
      fetchCompanies,
      jobs,
      fetchJobs,
      categories,
      setCategories,
      locations,
      setLocation,
      jobType,
      setJobType,

    ]}>
      {children}
    </DataContext.Provider>
  );
};
