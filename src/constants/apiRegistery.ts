
export const ADMIN_COOKIES =  {
    accessToken: "__admin-atkn",
    refreshToken: "__admin-rtkn",
} as const;

export const QUERY_REGISTRY = {
    getProfile: "get-profile",

    getProductList: "get-product-list",
    getProductDetail: "get-product-detail",

    getBrandAndAttributesCount: "get-brand-and-attributes-count",

    getBrandList: "get-brand-list",
    
    getAllSizes: "get-all-sizes",
    getAllColors: "get-all-colors",
    getAllMaterials: "get-all-materials",
}


export const MUTATION_REGISTRY = {
    login: 'login',
    logout: 'logout',
    changePassword: 'change-password',
    
    createSignature: 'create-signature',
    uploadToCloudinary: 'upload-to-cloudinary',
    
    createProduct: 'create-product',
    updateProduct: 'update-product',

    createBrand: 'create-brand',
    updateBrand: 'update-brand',

    createSize: 'create-size',
    updateSize: 'update-size',

    createColor: 'create-color',
    updateColor: 'update-color',

    createMaterial: 'create-material',
    updateMaterial: 'update-material',
};