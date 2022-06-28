import { useState, useEffect } from 'react';
import { getFileType } from 'utils';

interface IUseFileUpload {
    previousUploadedFiles: { name: string; url: string }[];
    multiple?: boolean;
    uploadEvent: (files: File) => Promise<{
        isError: boolean;
        filename: string;
        url: string;
    }>;
}

interface IFile extends Partial<File> {
    name?: string;
    url?: string;
}

export interface IFileWithType {
    type: string;
    name: string;
    url: string;
    isDefault?: boolean;
}

interface IUseFileUploadReturn {
    files: IFileWithType[];
    onUpload: () => Promise<{ name: string; url: string }[]>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clear: () => void;
    onRemove: (index: number) => void;
}

const useFileUpload = ({
    previousUploadedFiles,
    multiple = true,
    uploadEvent,
}: IUseFileUpload): IUseFileUploadReturn => {
    const [files, setFiles] = useState<IFile[]>([]);

    useEffect(() => {
        if (previousUploadedFiles.length) {
            setFiles([...previousUploadedFiles]);
        }
    }, [previousUploadedFiles]);

    const clear = () => {
        setFiles([]);
    };

    const onUpload = async (): Promise<{ name: string; url: string }[]> => {
        const _files = files.filter((file) => file.lastModified);
        const response = await Promise.all(
            _files.map(async (file) => {
                return await uploadEvent(file as File);
            })
        );
        const filterResponse = response
            .filter((file) => file.isError === false)
            .map(({ filename, url }) => ({ name: filename, url: url || '' }));
        const previousFiles = files
            .filter((file) => !file.lastModified)
            .map(({ name, url }) => ({ name: name || '', url: url || '' }));
        return [...previousFiles, ...filterResponse];
    };

    const onChange = ({ currentTarget: input }: React.ChangeEvent<HTMLInputElement>) => {
        if (input.files === null) return;
        if (multiple) {
            setFiles([...files, ...input.files]);
        } else {
            setFiles([...input.files]);
        }
    };

    const onRemove = (index: number) => {
        const _files = [...files];
        _files.splice(index, 1);
        setFiles(_files);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const genaretedPreviousUploadedTypes = (file: any): IFileWithType => {
        const ext = getFileType(file.url);
        return {
            ...file,
            type: ext,
        };
    };

    const genaretedSelectFilesTypeAndUrl = (): IFileWithType[] => {
        return files.map((file) => {
            if (file.lastModified) {
                const type = getFileType(file.name ? file.name : '') || '';
                const url = URL.createObjectURL(file as File);
                const name = file.name ? file.name : '';

                return {
                    type,
                    url,
                    name,
                };
            } else {
                return genaretedPreviousUploadedTypes(file);
            }
        });
    };

    return {
        files: genaretedSelectFilesTypeAndUrl(),
        onUpload,
        clear,
        onChange,
        onRemove,
    };
};

export default useFileUpload;
