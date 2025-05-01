"use client";
import { MenuExample } from "./menuExample";
import { BreadcrumbsComponent } from "./BreadcrumbsComponent"; // Import the new component
import * as React from "react";
import ReactDOM from "react-dom";
import { Alignment, Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import menuData from "./data.json";

interface NavbarExampleProps {
  id: string;
}

export const NavbarExample: React.FC<NavbarExampleProps> = ({ id }) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);
    const menuRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
    const buttonRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isOutsideMenu = Object.values(menuRefs.current).every(
                (ref) => ref && !ref.contains(event.target as Node)
            );
            const isOutsideButton = Object.values(buttonRefs.current).every(
                (ref) => ref && !ref.contains(event.target as Node)
            );

            if (isOutsideMenu && isOutsideButton) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <Navbar id={id}>
                <NavbarGroup align={Alignment.START}>
                    <NavbarHeading>Admin</NavbarHeading>
                    <NavbarDivider />
                    {menuData.map((menu) => (
                        <React.Fragment key={menu.title}>
                            <Button
                                ref={(el) => {
                                    buttonRefs.current[menu.title] = el;
                                }}
                                text={menu.title}
                                variant="minimal"
                                onClick={() => setOpenMenu(openMenu === menu.title ? null : menu.title)}
                            />
                            {openMenu === menu.title &&
                                ReactDOM.createPortal(
                                    <div
                                        ref={(el) => {
                                            menuRefs.current[menu.title] = el;
                                        }}
                                        style={{
                                            position: "absolute",
                                            top: buttonRefs.current[menu.title]?.getBoundingClientRect().bottom || 0,
                                            left: buttonRefs.current[menu.title]?.getBoundingClientRect().left || 0,
                                            zIndex: 9999,
                                        }}
                                    >
                                        <MenuExample menuTitle={menu.title} />
                                    </div>,
                                    document.body
                                )}
                        </React.Fragment>
                    ))}
                </NavbarGroup>
            </Navbar>
            <BreadcrumbsComponent
            />
        </>
    );
};
