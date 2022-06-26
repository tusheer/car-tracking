import PassEyeIcon from '../../icons/PassEyeIcon';
import React, { Fragment, useState, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './TextInput.module.scss';

interface ILabelProps {
    labelText: string;
    className?: string;
}
interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    rootClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    label?: string;
    error?: boolean;
    errorText?: string;
    type?: string;
    textArea?: boolean;
    rows?: number;
    defaultStyle?: boolean;
    placeholder?: string;
    EndIcon?: React.ReactElement;
}

const Label: React.FC<ILabelProps> = ({ labelText, className }) => {
    return <span className={`${className} ${styles.label}`}>{labelText}</span>;
};

const TextInput: React.FC<ITextInputProps> = ({
    type = 'text',
    textArea,
    errorText,
    defaultStyle = true,
    label,
    inputClassName = '',
    className = '',
    labelClassName,
    EndIcon,
    rows = 2,
    rootClassName = '',
    error,
    placeholder,
    ...rest
}) => {
    const [inputType, setInputType] = useState(type);
    const handleEyesign = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    };
    return (
        <label
            className={classNames(
                {
                    [styles.root]: defaultStyle,
                    [styles.error]: error,
                    [styles.text_area]: textArea,
                },
                className,
                'relative',
                'block'
            )}
        >
            <div
                className={classNames(
                    styles.input_wraper,
                    'block',

                    rootClassName
                )}
            >
                {textArea ? (
                    <textarea
                        {...rest}
                        rows={rows}
                        className={classNames(inputClassName)}
                        placeholder={placeholder || '.'}
                    />
                ) : (
                    <input
                        {...rest}
                        type={inputType}
                        className={classNames(inputClassName)}
                        placeholder={placeholder || '.'}
                    />
                )}
                {label && <Label labelText={label} className={classNames(labelClassName, styles.label)} />}

                <span className={`${!defaultStyle && 'absolute top-2 left-2'}`}>{EndIcon}</span>
                {type === 'password' && (
                    <div className="cursor-pointer flex items-center mr-3" onClick={handleEyesign}>
                        <PassEyeIcon
                            className={`fill-current ${
                                inputType === 'password' ? 'text-dh-gray-600' : 'text-cm-purple-700'
                            } `}
                        />
                    </div>
                )}
            </div>

            {error ? <span className={styles.error_text}>{errorText}</span> : null}
        </label>
    );
};

export default TextInput;
