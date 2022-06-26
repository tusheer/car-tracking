import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    uppercase?: boolean;
    className?: string;
    rounded?: boolean;
    color?: 'primary' | 'secondary' | 'gray' | 'lightGrey';
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    children: React.ReactElement | React.ReactElement[] | string;
}

const Button: React.FC<IButtonProps> = ({
    children,
    startIcon,
    endIcon,
    rounded,
    fullWidth,
    uppercase,
    className,
    color,
    size,
    ...rest
}) => {
    return (
        <button
            className={classNames(
                styles.button,
                {
                    [styles.sm]: size === 'sm',
                    [styles.md]: size === 'md',
                    [styles.lg]: size === 'lg',
                    [styles.rounded]: rounded === true,
                    uppercase: uppercase,
                    'w-full': fullWidth,
                    [styles.primary]: color === 'primary',
                    [styles.secondary]: color === 'secondary',
                    [styles.gray]: color === 'gray',
                    [styles.lightGrey]: color === 'lightGrey',
                },
                className
            )}
            {...rest}
        >
            {startIcon}
            {children}
            {endIcon}
        </button>
    );
};

Button.defaultProps = {
    fullWidth: false,
    uppercase: false,
    className: '',
    color: 'primary',
    size: 'md',
    rounded: false,
};

export default Button;
