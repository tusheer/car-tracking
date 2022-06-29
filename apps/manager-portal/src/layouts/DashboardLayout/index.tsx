import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Sidebar from 'ui/components/Sidebar';
import Navbar from 'ui/components/Navbar';
import { CityIcon } from 'ui/icons';
import { isStringMatched } from 'utils';

type Props = {
    children: ReactNode;
    title?: string;
};
const DashboardLayout: React.FC<Props> = ({ children, title }) => {
    const router = useRouter();

    return (
        <div className="flex w-full">
            <Sidebar
                links={[
                    {
                        name: 'City',
                        icon: (active) => (
                            <CityIcon className={`w-6 h-6 ${active ? 'text-ct-purple-700' : 'text-black'}`} />
                        ),
                        link: '/city',
                        isActive: isStringMatched(router.pathname, 'city'),
                    },
                ]}
                renderLinks={(element, to) => (
                    <Link key={to} href={to}>
                        <a>{element}</a>
                    </Link>
                )}
            />
            <div className="w-[calc(100vw-208px)] flex flex-col">
                <Navbar title={title} />
                <div className="bg-ct-gray-200 w-full flex-1">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
