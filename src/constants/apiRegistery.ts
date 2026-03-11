
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
    
    getActiveAttributes: "get-active-attributes",
    getCategoryOptions: "get-category-options",

    getCustomersList: "get-customers-list",
    getCustomerDetails: "get-customer-details",

    getCategoryList: "get-category-list",
    getCategoryTree: "get-category-tree",

    getOrderList: "get-order-list",
    getOrderDetails: "get-order-details",
    
    getOverViewMatrix: "get-overview-matrix",
    getRevenueAnalysis: "get-revenue-analysis",
    getStatusAnalysis: "get-status-analysis",
}


export const MUTATION_REGISTRY = {
    login: 'login',
    logout: 'logout',
    changePassword: 'change-password',
    updateProfile: 'update-profile',
    
    createSignature: 'create-signature',
    uploadToCloudinary: 'upload-to-cloudinary',
    
    createProduct: 'create-product',
    updateProduct: 'update-product',

    createBrand: 'create-brand',
    updateBrand: 'update-brand',
    assignProductToBrand: 'assign-product-brand',
    removeProductFromBrand: 'remove-product-brand',

    assignProductToCategory: 'assign-product-category',
    removeProductFromCategory: 'remove-product-category',
    createCategory: 'create-category',
    updateCategory: 'update-category',

    createSize: 'create-size',
    updateSize: 'update-size',

    createColor: 'create-color',
    updateColor: 'update-color',

    createMaterial: 'create-material',
    updateMaterial: 'update-material',

    createVariant: 'create-variant',
    updateVariantImage: 'update-variant-image',
    updateSku: 'update-sku',
    deleteVariant: 'delete-variant',

    updateOrderStatus: 'update-order-status',
    updatePaymentStatus: 'update-payment-status',
};