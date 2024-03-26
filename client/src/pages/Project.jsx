import React, { useState, useEffect } from 'react';
import Stepper from '../components/Stepper';
import ProgressBar from '../components/ProgressBar';
import CommentSection from '../components/CommentSection';
import S_card from '../components/sm_card';
import axios from 'axios';

function Project() {
  const [projectData, setProjectData] = useState(null); 
  const [link, setLink] = useState('');
  const [comments, setComments] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const projectId = window.location.pathname.split('/').pop(); 
    fetchProject(projectId);
    fetchComments(projectId);
  }, []);

  const fetchProject = async (projectId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}`);
      setProjectData(response.data[0]); 
      console.log('Project fetched:', response.data[0]);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const fetchComments = async (projectId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/comments`);
      setComments(response.data); 
      console.log('Comments fetched:', response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectId = window.location.pathname.split('/').pop(); 
      await axios.put(`http://127.0.0.1:8000/project/${projectId}`, { link }); 
      console.log('Link submitted:', link);
      fetchProject(projectId);
    } catch (error) {
      console.error('Error submitting link:', error);
    }
  };

  const addComment = async (commentText) => {
    try {
      const projectId = window.location.pathname.split('/').pop();
      const response = await axios.post(`http://127.0.0.1:8000/project/${projectId}/comments`, { comment: commentText });
      setComments([...comments, response.data]); 
      console.log('Comment added:', response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!projectData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container mx-auto">
      <Stepper />
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">{projectData.title}</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Client : {projectData.client}</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Developer : {projectData.developers}</p>
        <img className="w-full max-h-screen object-cover my-4 rounded-lg" src={`http://127.0.0.1:8000` + projectData.current_image} alt={projectData.title} />
        <ProgressBar startDate={projectData.created_at} endDate={projectData.deadline} />
        {role === 'client' && projectData.link && (
          <a className="block mt-4 w-max text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href={projectData.link} target="_blank" rel="noreferrer">
            Check Link
          </a>
        )}
        {role === 'developer' && (
          <>
            <form onSubmit={handleLinkSubmit} className="mt-4">
              <input type="text" value={link} onChange={handleLinkChange} placeholder="Add link..." className="w-full px-3 py-2 border rounded-lg" />
              <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit Link</button>
            </form>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update ETA</button>
          </>
        )}
      </div>
      <div className="mt-8 flex">
        <div className='text-white'>
          Previous Projects
          {/* {previousProject.map((project, index) => (
            <S_card
              key={index}
              title={project.title}
              {...(role === 'client' && { client: project.client })}
              {...(role === 'developer' && { developer: project.developer })}
              link={project.link}
            />
          ))} */}
        </div>
        <div className="w-1/2"></div>
        <div>
          <CommentSection projectId={projectData.id} comments={comments} addComment={addComment} /> 
        </div>
      </div>
    </div>
  );
}

export default Project;



