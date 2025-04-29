"use client";
import * as React from "react";
import { Breadcrumbs } from "@blueprintjs/core";
import Link from "next/link";

export const BreadcrumbsComponent: React.FC = () => {
    const calculateBreadcrumbs = () => {
        const pathSegments = window.location.pathname
            .split("/")
            .filter((segment) => segment);

        return [{ text: "Inicio", href: "/" }, ...pathSegments.map((segment, index) => ({
            text: segment.replace(/-/g, " ").charAt(0).toUpperCase() + segment.replace(/-/g, " ").slice(1),
            href: "/" + pathSegments.slice(0, index + 1).join("/"),
        }))];
    };

    const [breadcrumbItems, setBreadcrumbItems] = React.useState(calculateBreadcrumbs);

    React.useEffect(() => {
        const updateBreadcrumbs = () => {
            setBreadcrumbItems(calculateBreadcrumbs());
        };

        window.addEventListener("popstate", updateBreadcrumbs);
        return () => {
            window.removeEventListener("popstate", updateBreadcrumbs);
        };
    }, []);

    const handleInicioClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.history.pushState(null, "", "/");
        setBreadcrumbItems([{ text: "Inicio", href: "/" }]);
    };

    return (
        <div style={{ height: "32px", backgroundColor: "#f5f5f5", padding: "0 10px" }}>
            <Breadcrumbs
                items={breadcrumbItems.map((item, index) => ({
                    text: index === 0 ? (
                        <a
                            href={item.href}
                            onClick={handleInicioClick}
                            style={{ textDecoration: "none", fontWeight: "bold" }}
                        >
                            {item.text}
                        </a>
                    ) : index === breadcrumbItems.length - 1 ? (
                        <Link href={item.href} style={{ textDecoration: "none", fontWeight: "bold" }}>
                            {item.text}
                        </Link>
                    ) : (
                        <span style={{ fontWeight: "bold" }}>{item.text}</span>
                    ),
                    current: index === breadcrumbItems.length - 1,
                }))}
            />
        </div>
    );
};
