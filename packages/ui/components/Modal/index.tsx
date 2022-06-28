import React, { Fragment, ReactElement, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

interface IDialog {
    className?: string;
    children: ReactElement;
    onClose: () => void;
    open: boolean;
}

const Modal: React.FC<IDialog> = ({ className = '', children, onClose, open }) => {
    const [isBrowser, setIsBrower] = useState<boolean>(false);
    const [root, setRoot] = useState<HTMLBodyElement | null>(null);

    const memorizedRoot = useMemo(() => root, [root]);

    useEffect(() => {
        setIsBrower(true);
        const appRoot = document.getElementsByTagName('body')[0];
        setRoot(appRoot || null);

        return () => {
            setRoot(null);
        };
    }, []);
    const DialogElement = (
        <Fragment>
            <div
                onClick={onClose}
                className={` fixed inset-0 px-5 transition-all flex justify-center items-center bg-black bg-opacity-50 ${
                    open ? 'block' : 'hidden'
                }`}
                style={{ zIndex: '1000' }}
            >
                <div onClick={(e) => e.stopPropagation()} className={`max-h-screen bg-white   w-full    ${className} `}>
                    {children}
                </div>
            </div>
        </Fragment>
    );

    if (isBrowser && memorizedRoot) {
        return ReactDOM.createPortal(DialogElement, memorizedRoot);
    } else return null;
};

export default Modal;
