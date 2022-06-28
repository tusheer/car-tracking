export function getFileType(filename: string) {
    if (filename) {
        const fileType = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
        return fileType === 'jpg' ? 'jpeg' : fileType;
    }
    return null;
}
