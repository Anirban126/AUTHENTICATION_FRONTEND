const API_URL = 'https://authentication-backend-1-nqni.onrender.com//api/auth'


async function request(endpoint, options = {}) {

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },

            ...options,
        }
    )


    let data = {}

    try {
        data = await response.json()
    } catch {
        data = {}
    }


    if (!response.ok) {

        throw new Error(
            data.message ||
            `Request failed: ${response.status}`
        )

    }


    return data
}


export const authApi = {

    // REGISTER

    register: (data) =>
        request('/register', {
            method: 'POST',

            body: JSON.stringify(data),
        }),


    // VERIFY EMAIL

    verifyEmail: (data) =>
        request('/verify-email', {
            method: 'POST',

            body: JSON.stringify(data),
        }),


    // LOGIN

    login: (data) =>
        request('/login', {
            method: 'POST',

            body: JSON.stringify(data),
        }),


    // GET CURRENT USER

    getMe: (accessToken) =>
        request('/get-me', {
            method: 'GET',

            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }),


    // REFRESH ACCESS TOKEN

    refreshToken: () =>
        request('/refresh-token', {
            method: 'GET',
        }),


    // LOGOUT CURRENT DEVICE

    logout: () =>
        request('/logout', {
            method: 'GET',
        }),


    // LOGOUT ALL DEVICES

    logoutAll: () =>
        request('/logout-all', {
            method: 'GET',
        }),

}