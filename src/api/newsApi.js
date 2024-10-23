import { API_BASE_URL, headers } from './index';

export const getNews = async () => {
    const response = await fetch(`${API_BASE_URL}/news/`, {
        method: 'GET',
        headers,
    });
    return response.json();
};

// other functions for news CRUD operations...
