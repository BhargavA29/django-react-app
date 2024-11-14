import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Function to get CSRF cookie value
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Add request interceptor to handle CSRF token
axiosInstance.interceptors.request.use(
    async config => {
        // Only get CSRF token for non-GET requests
        if (config.method !== 'get') {
            try {
                // Get CSRF token before the actual request
                await axios.get('http://localhost:8000/api/auth/csrf/', { withCredentials: true });

                // Get the CSRF token from cookies
                const csrfToken = getCookie('csrftoken');

                // Set the CSRF token in the header
                if (csrfToken) {
                    config.headers['X-CSRFToken'] = csrfToken;
                }
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;