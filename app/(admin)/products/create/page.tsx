import React from 'react';
import CreateProductForm from '@mod/product/components/create-product-form';

const CreateProductPage: React.FC = () => {
    return (
        <div className="w-full h-full p-4 md:p-6">
            <CreateProductForm />
        </div>
    );
}

export default CreateProductPage;
