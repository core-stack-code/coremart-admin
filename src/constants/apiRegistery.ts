
export const ADMIN_COOKIES =  {
    accessToken: "__admin-atkn",
    refreshToken: "__admin-rtkn",
} as const;

export const QUERY_REGISTRY = {
    getProfile: "get-profile",

    getProductList: "get-product-list",
}


export const MUTATION_REGISTRY = {
    login: 'login',
    logout: 'logout',
    changePassword: 'change-password',
    
    createSignature: 'create-signature',
    uploadToCloudinary: 'upload-to-cloudinary',
    
    createProduct: 'create-product',
    updateProduct: 'update-product'
};