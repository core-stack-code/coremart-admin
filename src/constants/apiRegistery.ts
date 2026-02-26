
export const ADMIN_COOKIES =  {
    accessToken: "__admin-atkn",
    refreshToken: "__admin-rtkn",
} as const;

export const QUERY_REGISTRY = {
    getProfile: "get-profile",

}


export const MUTATION_REGISTRY = {
    login: 'login',
    logout: 'logout',
    changePassword: 'change-password'
};