import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add security headers to all requests
api.interceptors.request.use(
    (config) => {
        const securityHeaders = {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
        };
        config.headers = { ...config.headers, ...securityHeaders };
        return config;
    }
);

// Credit APIs
export const creditAPI = {
    // Get credit statistics
    getStats: () => api.get('/credits/stats'),
    
    // Get credits by type
    getCreditsByType: (type) => api.get(`/credits/by-type/${type}`),
    
    // Get credits by state
    getCreditsByState: (state) => api.get(`/credits/by-state/${state}`),
    
    // Get trading history
    getTradingHistory: () => api.get('/credits/trading-history'),
    
    // Get sustainability metrics
    getSustainabilityMetrics: () => api.get('/credits/sustainability'),
    
    // Add new credit
    addCredit: (creditData) => api.post('/credits', creditData),
    
    // Buy credit
    buyCredit: (creditId) => api.post(`/credits/buy/${creditId}`),
    
    // Get all credits
    getAllCredits: () => api.get('/credits')
};

// User APIs
export const userAPI = {
    // Register new user
    register: (userData) => api.post('/auth/register', userData),
    
    // Login user
    login: (credentials) => api.post('/auth/login', credentials),
    
    // Get user profile
    getProfile: () => api.get('/users/profile'),
    
    // Update user profile
    updateProfile: (userData) => api.put('/users/profile', userData),
    
    // Get all users
    getAllUsers: () => api.get('/users'),
    
    // Verify user
    verifyUser: (userId) => api.post(`/users/verify/${userId}`)
};

// Blog APIs
export const blogAPI = {
    // Get all posts
    getAllPosts: () => api.get('/blog/posts'),
    
    // Get post by id
    getPost: (postId) => api.get(`/blog/posts/${postId}`),
    
    // Create new post
    createPost: (postData) => api.post('/blog/posts', postData),
    
    // Update post
    updatePost: (postId, postData) => api.put(`/blog/posts/${postId}`, postData),
    
    // Delete post
    deletePost: (postId) => api.delete(`/blog/posts/${postId}`),
    
    // Add comment
    addComment: (postId, comment) => api.post(`/blog/posts/${postId}/comments`, comment),
    
    // Get post comments
    getComments: (postId) => api.get(`/blog/posts/${postId}/comments`)
};

// Insurance APIs
export const insuranceAPI = {
    // Get insurance quotes
    getQuote: (projectData) => api.post('/insurance/quote', projectData),
    
    // Get available plans
    getPlans: () => api.get('/insurance/plans'),
    
    // Purchase insurance
    purchaseInsurance: (planId, details) => api.post(`/insurance/purchase/${planId}`, details),
    
    // File claim
    fileClaim: (policyId, claimData) => api.post(`/insurance/claims/${policyId}`, claimData),
    
    // Get policy details
    getPolicy: (policyId) => api.get(`/insurance/policies/${policyId}`),
    
    // Get claims history
    getClaimsHistory: () => api.get('/insurance/claims')
};

// Article 6.4 APIs
export const article64API = {
    // Get project cycle status
    getProjectStatus: (projectId) => api.get(`/article64/projects/${projectId}/status`),
    
    // Submit project for validation
    submitProject: (projectData) => api.post('/article64/projects', projectData),
    
    // Update project details
    updateProject: (projectId, updates) => api.put(`/article64/projects/${projectId}`, updates),
    
    // Get verification status
    getVerificationStatus: (projectId) => api.get(`/article64/projects/${projectId}/verification`),
    
    // Submit verification documents
    submitDocuments: (projectId, documents) => api.post(`/article64/projects/${projectId}/documents`, documents),
    
    // Get project templates
    getTemplates: () => api.get('/article64/templates')
};

// Support APIs
export const supportAPI = {
    // Create support ticket
    createTicket: (ticketData) => api.post('/support/tickets', ticketData),
    
    // Get ticket status
    getTicketStatus: (ticketId) => api.get(`/support/tickets/${ticketId}`),
    
    // Update ticket
    updateTicket: (ticketId, updates) => api.put(`/support/tickets/${ticketId}`, updates),
    
    // Get FAQ
    getFAQ: () => api.get('/support/faq'),
    
    // Get knowledge base articles
    getKnowledgeBase: () => api.get('/support/knowledge-base')
};

// News APIs
export const newsAPI = {
    // Get all news
    getAllNews: () => api.get('/news'),
    
    // Get news by category
    getNewsByCategory: (category) => api.get(`/news/category/${category}`),
    
    // Get featured news
    getFeaturedNews: () => api.get('/news/featured'),
    
    // Subscribe to newsletter
    subscribeNewsletter: (email) => api.post('/news/subscribe', { email })
};

export default api;
