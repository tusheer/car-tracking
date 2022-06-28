import { AxiosResponse } from 'axios';
import axios from '../../config/http';

const apiurl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const imageUpload = async (file: File) => {
    const formData = new FormData();

    formData.append('file', file);

    try {
        const { name, url } = await axios
            .post(`/uploads/image`, formData)
            .then((response: AxiosResponse<{ url: string; name: string }>) => response.data);
        return {
            isError: false,
            filename: name,
            url: `${apiurl}${url}`,
        };
    } catch (error) {
        return {
            isError: true,
            filename: '',
            url: '',
        };
    }
};
