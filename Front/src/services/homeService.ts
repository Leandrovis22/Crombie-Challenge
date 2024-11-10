import { HomeData } from '../types/types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

/**
 * Fetches home data from the server. It sends a request to the '/home' endpoint with the authentication token stored in localStorage.
 * If the token is missing or the request fails, an error is thrown.
 */

export const fetchHomeData = async (): Promise<HomeData> => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/home`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    localStorage.removeItem('token');
    throw new Error('Failed to fetch home data');
  }

  return (await response.json()).user;
};