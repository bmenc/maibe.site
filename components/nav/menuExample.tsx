"use client";

import * as React from "react";
import { Classes, Menu, MenuItem, type Size } from "@blueprintjs/core";
import menuData from "./data.json";

export function MenuExample({ menuTitle }: { menuTitle: string }) {
    const [size] = React.useState<Size>("medium");
    const menu = menuData.find((m) => m.title === menuTitle);

    if (!menu) return null;

    return (
        <div style={{ marginTop: "6px", zIndex: 9999 }}>
            <Menu className={Classes.ELEVATION_1} size={size}>
                {menu.submenus.map((submenu) => (
                    <MenuItem key={submenu.name} text={submenu.name} href={submenu.url} />
                ))}
            </Menu>
        </div>
    );
}