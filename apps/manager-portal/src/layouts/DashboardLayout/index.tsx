import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Sidebar from 'ui/components/Sidebar';
import CityIcon from 'ui/icons/CityIcon';
import { isStringMatched } from 'utils';

type Props = {
    children: ReactNode;
};
const DashboardLayout: React.FC<Props> = ({ children }) => {
    const router = useRouter();

    return (
        <div className="flex w-full">
            <Sidebar
                links={[
                    {
                        name: 'City',
                        icon: () => (
                            <CityIcon
                                className={`w-6 h-6 ${
                                    isStringMatched(router.pathname, 'city') ? 'text-ct-purple-700' : 'text-black'
                                }`}
                            />
                        ),
                        link: '/city',
                    },
                ]}
                renderLinks={(element, to) => (
                    <Link href={to}>
                        <a>{element}</a>
                    </Link>
                )}
            />
            <div className="dashboard_width">{children}</div>
        </div>
    );
};

export default DashboardLayout;
