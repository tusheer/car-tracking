import React from 'react';

interface IContiner {
    children: React.ReactElement | React.ReactElement[];
    className?: string;
}

const Container: React.FC<IContiner> = ({ children, className = '' }) => {
    return <section className={`max-w-6xl px-5 mx-auto ${className}`}>{children}</section>;
};

export default Container;
