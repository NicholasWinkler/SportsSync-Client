import { API_BASE_URL, headers } from './index';

export const getTeams = async () => {
    const response = await fetch(`${API_BASE_URL}/teams/`, {
        method: 'GET',
        headers,
    });
    return response.json();
};

// other functions for teams CRUD operations...
