import React from 'react';
import { UserIcon } from '../../icons';
import Container from '../Container';
import Dropdown from '../Dropdown';

interface INavbar {
    title?: string;
    onLogout: () => void;
}

const Navbar: React.FC<INavbar> = ({ title, onLogout }) => {
    return (
        <nav style={{ zIndex: 9999 }} className="bg-ct-purple-700 z-50 h-20 sticky top-0 shadow-md ">
            <Container className="flex justify-between items-center h-full">
                <h3 className="text-white text-2xl font-bold">{title}</h3>
                <Dropdown className="relative">
                    <Dropdown.Menu>
                        {({ toggle, open }) => (
                            <div
                                onClick={() => toggle(!open)}
                                className="h-9 cursor-pointer flex justify-center items-center w-9 rounded-full bg-ct-gray-200"
                            >
                                <UserIcon className="w-6 h-6" />
                            </div>
                        )}
                    </Dropdown.Menu>
                    <Dropdown.Item>
                        {({}) => (
                            <div
                                onClick={onLogout}
                                className="w-32 cursor-pointer text-base font-semibold bg-white px-5 py-3 rounded-md shadow-md absolute top-10 right-0"
                            >
                                Logout
                            </div>
                        )}
                    </Dropdown.Item>
                </Dropdown>
            </Container>
        </nav>
    );
};

export default Navbar;
