"use client";
import {MenuExample} from "./menuExample"
import * as React from "react";
import ReactDOM from "react-dom";

import { Alignment, Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import { type ExampleProps } from "@blueprintjs/docs-theme";

export const NavbarExample: React.FC<ExampleProps> = () => {
    const [alignEnd] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Navbar>
            <NavbarGroup align={alignEnd ? Alignment.END : Alignment.START}>
                <NavbarHeading>Builder UI</NavbarHeading>
                <NavbarDivider />
                <Button
                    icon="menu"
                    text="Menu"
                    variant="minimal"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
                {isMenuOpen &&
                    ReactDOM.createPortal(
                        <div
                            ref={menuRef}
                            style={{
                                position: "fixed",
                                top: "50px",
                                left: "10px",
                                zIndex: 9999,
                            }}
                        >
                            <MenuExample id={""} />
                        </div>,
                        document.body // Renderiza el menú directamente en el body
                    )}
            </NavbarGroup>
        </Navbar>
    );
};
