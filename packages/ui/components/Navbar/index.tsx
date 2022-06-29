import React from 'react';
import Container from '../Container';

interface INavbar {
    title?: string;
}

const Navbar: React.FC<INavbar> = ({ title }) => {
    return (
        <nav style={{ zIndex: 9999999 }} className="bg-ct-purple-700 z-50 h-20 sticky top-0 shadow-md ">
            <Container className="flex justify-between items-center h-full">
                <h3 className="text-white text-2xl font-bold">{title}</h3>
            </Container>
        </nav>
    );
};

export default Navbar;
