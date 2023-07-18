import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../providers/AuthProvider/AuthProvider';

const axiosSecure = axios.create({
  baseURL: 'https://art-craf-server-jabedweb.vercel.app', 
});

const UseAxiosSecure = () => {
  const { SignOut } = useContext(authContext); 
  const navigate = useNavigate(); 

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('token', token);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await SignOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [SignOut, navigate]);

  return [axiosSecure];
};

export default UseAxiosSecure;