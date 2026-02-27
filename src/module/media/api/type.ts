
export interface MediaSignatureResponse {
    timestamp: number,
    signature: string,
    cloud_name: string,
    api_key: string,
    folder: string,
    transformation: string;
}


export interface CloudinaryUploadPayload {
    data: MediaSignatureResponse;
    file: File;
}

export interface CloudinaryUploadResponse {
    public_id: string;
    original_filename: string;
    url: string;
}