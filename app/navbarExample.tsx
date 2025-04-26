"use client";
import {MenuExample} from "./menuExample"
import * as React from "react";

import { Alignment, Button, H5, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Switch } from "@blueprintjs/core";
import { type ExampleProps, handleBooleanChange } from "@blueprintjs/docs-theme";

export const NavbarExample: React.FC<ExampleProps> = props => {
    const [alignEnd, setAlignEnd] = React.useState(false);

    return (
        <Navbar>
            <NavbarGroup align={alignEnd ? Alignment.END : Alignment.START}>
                <NavbarHeading>Builder UI</NavbarHeading>
                <NavbarDivider />
                <Button icon="home" text="Home" variant="minimal" />
                <Button icon="document" text="Files" variant="minimal" />
                <MenuExample id={""}/>
            </NavbarGroup>
        </Navbar>
    );
};
