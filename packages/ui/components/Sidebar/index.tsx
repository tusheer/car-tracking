import React, { ReactElement } from 'react';
type LinkType = {
    icon: (active: boolean) => ReactElement;
    name: string;
    link: string;
    exact?: boolean;
    isActive: boolean;
};

interface ISidebar {
    links: LinkType[];
    renderLinks: (element: ReactElement, to: string) => ReactElement;
}

const Sidebar: React.FC<ISidebar> = ({ links, renderLinks }) => {
    return (
        <aside className="w-52 sticky h-screen  top-0  " style={{ boxShadow: ' 0 2px 3px 0 rgb(0 0 0 / 6%)' }}>
            <h1 className="text-2xl text-ct-purple-700 font-bold mt-6 px-5">CarTracking</h1>
            <ul className="pt-20">
                {links.map((link) => {
                    return renderLinks(
                        <li
                            className={`flex px-4 gap-4 py-2.5 text-lg ${
                                link.isActive
                                    ? 'bg-ct-purple-700 bg-opacity-10 border-l-4 border-ct-purple-700'
                                    : 'border-l-4 border-transparent'
                            }`}
                            key={link.name}
                        >
                            {link.icon(link.isActive)}

                            {link.name}
                        </li>,
                        link.link
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
