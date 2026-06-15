import { apiRequest } from './client';

const getRSVPFlag = async (): Promise<boolean> => {
    const response = await apiRequest('/flag/rsvp-page');
    const { enabled } = await response.json();
    return enabled;
}

export default getRSVPFlag;