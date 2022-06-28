import { CrossIcon } from 'ui/icons';

type File = {
    name: string;
    url: string;
    type?: string;
};

type IRenderUploadedThumbsProps = {
    files: File[];
    onRemove: (index: number) => void;
    className?: string;
    RemoveIcon?: React.ReactChild;
    removeIconClassName?: string;
};

const PDF_THUMB = '/static/assets/icons/pdf.svg';
const WORD_THUMB = '/static/assets/icons/word.svg';

const RenderUploadedFileThumbs: React.FC<IRenderUploadedThumbsProps> = ({
    files,
    onRemove,
    RemoveIcon,
    className,
    removeIconClassName,
}) => {
    const renderFileThumb = (file: File) => {
        if (file.type === 'pdf')
            return (
                <div className="min-w-full min-h-full flex justify-center items-center bg-[#f8f8f8] border border-dh-gray-200">
                    <img className="w-9 h-9 object-cover" src={PDF_THUMB} alt={file?.name} title={file?.name} />
                </div>
            );

        if (file.type === 'jpg' || file.type === 'jpeg' || file.type === 'png')
            return (
                <img
                    className="min-w-full min-h-full object-cover"
                    src={file.url}
                    alt={file?.name}
                    title={file?.name}
                />
            );

        if (file.type === 'doc' || file.type === 'docx')
            return (
                <div className="min-w-full min-h-full flex justify-center items-center bg-[#f8f8f8] border border-dh-gray-200">
                    <img className="w-9 h-9 object-cover" src={WORD_THUMB} alt={file?.name} title={file?.name} />
                </div>
            );
    };

    return (
        <>
            {files?.length
                ? files.map((file, index) => (
                      <div key={index} className={`relative`}>
                          <div className={`${className} overflow-hidden`}>{renderFileThumb(file)}</div>
                          {RemoveIcon || (
                              <button onClick={() => onRemove(index)} className={`absolute ${removeIconClassName}`}>
                                  <CrossIcon className="h-6 w-6" />
                              </button>
                          )}
                      </div>
                  ))
                : null}
        </>
    );
};

RenderUploadedFileThumbs.defaultProps = {
    className: '',
    removeIconClassName: '',
};

export default RenderUploadedFileThumbs;
