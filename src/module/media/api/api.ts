import axios from "axios";
import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { CloudinaryUploadPayload, CloudinaryUploadResponse, MediaSignatureResponse } from "./type";
import { MediaUploadPayload } from "../utils/mediaUpload";
import { Log } from "@/lib/utils";

export const createSignature = async (payload: MediaUploadPayload): Promise<ApiResponse<MediaSignatureResponse>> => {
    const res = await api.post("/media/signature", payload);
    return res.data;
}


export const uploadToCloudinary = async (payload: CloudinaryUploadPayload): Promise<CloudinaryUploadResponse> => {
    const formData = new FormData();

    formData.append('file', payload.file);
    formData.append('api_key', payload.data.api_key);
    formData.append('timestamp', payload.data.timestamp.toString());
    formData.append('signature', payload.data.signature);
    formData.append('folder', payload.data.folder);
    formData.append('transformation', payload.data.transformation);

    const URL = `https://api.cloudinary.com/v1_1/${payload.data.cloud_name}/image/upload`;

    const res = await axios.post(URL, formData);

    Log('Cloudinary upload response:', res.data);

    return {
        public_id: res.data.public_id,
        original_filename: res.data.original_filename,
        url: res.data.secure_url,
    };
}