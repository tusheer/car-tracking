import React from 'react';

type FileType = File & { url: string };

export type IRenderUploadedThumbsProps = {
    files: FileType[];
    onRemove: (index: number) => void;
    className?: string;
    RemoveIcon?: React.ReactElement;
    removeIconClassName?: string;
};
