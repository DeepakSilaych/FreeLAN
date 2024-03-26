import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [name, setName] = useState(localStorage.getItem('username'));
  const [stars, setStars] = useState(0);
  const [ongoingProjects, setOngoingProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [position, setPosition] = useState(localStorage.getItem('role'));
  const userid = localStorage.getItem('id');


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/user/profile/',{
          id: userid,
        });
        const data = response.data;
        console.log(data);
        setStars(data.rating);
        setOngoingProjects(data.ongoing_projects);  
        setCompletedProjects(data.completed_projects);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData(); 
  }, []); 

  return (
    <div className="w-full mt-40 flex justify-center">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center pb-10 mx-auto">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User Avatar" />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">{position}</span>
              {position == 'developer' && (
              <div className="flex items-center mt-4">
                {[...Array(Math.floor(stars))].map((_, index) => (
                  <svg key={index} className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                ))}
                {stars % 1 !== 0 && (
                  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M19.124 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L5.365 5.847l-5.051.734A1.535 1.535 0 0 0 .463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L19.537 9.2a1.523 1.523 0 0 0 .387-1.575zM11 15.862l3.862 2.032-.734-4.277 3.128-3.046-4.345-.63L11 7.133V15.862z"/>
                  </svg>
                )}
                {[...Array(5 - Math.ceil(stars))].map((_, index) => (
                  <svg key={index} className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                ))}
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stars.toFixed(1)}</p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mx-1">out of</p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
              </div> )}

              <div className="flex mt-4 md:mt-6">
                <span className="inline-flex items-center px-4 py-2 text-center dark:text-white">{ongoingProjects} <br /> Ongoing Projects</span>
                <span className="inline-flex items-center px-4 py-2 text-center dark:text-white">{completedProjects} <br /> Completed Projects</span>
              </div>

          <Link to="/logout" className="mt-4 px-4 w-full text-center py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
