import React from 'react';
import styles from './Checkbox.module.scss';
interface CheckboxProps {
    name?: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, checked, onChange }) => {
    return (
        <div className={`relative h-5 w-5 ${styles.checkbox}`}>
            <input
                className="absolute h-5 w-5 cursor-pointer left-0 opacity-0 z-40"
                onChange={onChange}
                type="checkbox"
                name={name}
                checked={checked}
            />
            <span className={` relative ${styles.checkmarkspan}`}></span>
        </div>
    );
};

export default Checkbox;
