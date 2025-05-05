import axiosInstance from "./axiosInstance";

// Login
export const loginUser = (loginData) => {
    return axiosInstance.post("User/LoginUser", loginData);
};

// Register
export const registerUser = (userData) => {
    return axiosInstance.post("User/RegisterNewUser", userData);
};

// Logout
export const logoutUser = () => {
    return axiosInstance.post("User/LogoutUser");
}

// Profile
export const fetchProfile = () => {
    return axiosInstance.get("User/Profile");
};

export const updateProfile = () => {
    return axiosInstance.post("User/");
};

// Search
export const searchGames = (config) => {
    return axiosInstance.get(`Games/Search`, config);
};

export const getAllGames = () => {
    return axiosInstance.get("Games");
};

// Add Game
export const addGame = (gameData) => {
    return axiosInstance.post("Games/NewGame", gameData);
};

// Game Wiki
export const getCurrentUser = () => {
    return axiosInstance.get("User/Me");
}

export const getGameById = (gameId) => {
    return axiosInstance.get(`Games/GetGame/${gameId}`);
};

export const getComments = (postId) => {
    return axiosInstance.get(`posts/${postId}/comments`);
};

/*export const addComment = (postId, content, token) => {
    return axiosInstance.post(`posts/${postId}/comments`, { text: content }, {
        headers: { Authorization : `Bearer ${token}` },
    });
};*/
export const addComment = (postId, content, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axiosInstance.post(`posts/${postId}/comments`, { text: content }, { headers });
};

export const deleteComment = (commentId, token) => {
    return axiosInstance.delete(`comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateComment = (commentId, content, token) => {
    return axiosInstance.put(`comments/${commentId}`, { text: content }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};