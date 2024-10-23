import { API_BASE_URL, headers } from './index';

export const getGames = async () => {
    const response = await fetch(`${API_BASE_URL}/games/`, {
        method: 'GET',
        headers,
    });
    return response.json();
};

// other functions for games CRUD operations...
