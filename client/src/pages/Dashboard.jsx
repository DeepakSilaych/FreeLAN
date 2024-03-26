import React, { useState, useEffect } from 'react';
import ProjectCards from '../components/ProjectCards';
import axios from 'axios';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const userid = localStorage.getItem('id');

  useEffect(() => {
    fetchProjects(userid, searchQuery);
  }, [userid, searchQuery]);

  const fetchProjects = async (userId, query) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/project/", { id: userId, query: query });
      console.log(response.data);

      const projects = response.data;
      const ongoing = projects.ongoing_projects || [];
      const completed = projects.completed_projects || [];
      setOngoingProjects(ongoing);
      setCompletedProjects(completed);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      <div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Ongoing Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {ongoingProjects.map((project, index) => (
              <ProjectCards
                key={index}
                title={project.title}
                client={project.client}
                developer={project.developer}
                image={`http://127.0.0.1:8000${ project.image }`}
                deadline={project.deadline}
              />
            ))}
          </div>
        </div>     

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Completed Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {completedProjects.map((project, index) => (
              <ProjectCards
                key={index}
                title={project.title}
                client={project.client}
                developer={project.developer}
                image={`http://127.0.0.1:8000${ project.image }`}
                completedDate={project.completed}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;



function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); 
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="flex">
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
        <div className="relative w-full">
          <input 
            type="search" 
            id="search-dropdown" 
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
            placeholder="Search Mockups, Logos, Design Templates..." 
            required 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
