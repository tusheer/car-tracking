import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className='flex w-full'>
            <div className='dashboard_width'>{children}</div>
        </div>
    );
};

export default DashboardLayout;
