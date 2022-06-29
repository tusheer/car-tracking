import React, { ReactElement } from "react";
import { IDropdownContext, useDropdownContext } from "./index";

interface IMenu {
	children: ({ toggle, open }: IDropdownContext) => ReactElement;
}

const Menu: React.FC<IMenu> = (props) => {
	const { open, toggle }: IDropdownContext = useDropdownContext();

	return props.children({ toggle, open });
};

export default Menu;
