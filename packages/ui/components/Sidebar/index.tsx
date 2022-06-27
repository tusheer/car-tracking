import React, { ReactElement } from 'react';
type LinkType = {
    icon: () => ReactElement;
    name: string;
    link: string;
    exact?: boolean;
};

interface ISidebar {
    links: LinkType[];
    renderLinks: (element: ReactElement, to: string) => ReactElement;
}

const Sidebar: React.FC<ISidebar> = ({ links, renderLinks }) => {
    return (
        <div className="w-52 ">
            {links.map((link) => {
                return renderLinks(
                    <div className="flex" key={link.name}>
                        {link.icon()}
                    </div>,
                    link.link
                );
            })}
        </div>
    );
};

export default Sidebar;
