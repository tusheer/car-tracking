import { IRenderUploadedThumbsProps } from './IRenderUploadedThumbsProps';
import { CrossIcon } from 'ui/icons';

const RenderUploadedFileThumbs: React.FC<IRenderUploadedThumbsProps> = ({
    files,
    onRemove,
    RemoveIcon,
    className,
    removeIconClassName,
}) => {
    const renderFileThumb = (file: File & { url: string }) => {
        if (file.type === 'jpg' || file.type === 'jpeg' || file.type === 'png')
            return (
                <img
                    className="min-w-full min-h-full object-cover"
                    src={file.url}
                    alt={file?.name}
                    title={file?.name}
                />
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
                                  <CrossIcon />
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
