import React, { ReactElement } from "react";
import { IDropdownContext, useDropdownContext } from "./index";

interface IItem {
	children: ({ toggle, open }: IDropdownContext) => ReactElement;
}

const Item: React.FC<IItem> = (props) => {
	const { open, toggle }: IDropdownContext = useDropdownContext();

	if (!open) return null;

	return props.children({ toggle, open });
};

export default Item;
