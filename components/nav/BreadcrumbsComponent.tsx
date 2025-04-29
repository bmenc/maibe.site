"use client";
import * as React from "react";
import { Breadcrumbs } from "@blueprintjs/core";
import Link from "next/link";

export const BreadcrumbsComponent: React.FC = () => {
    const [breadcrumbItems, setBreadcrumbItems] = React.useState<{ text: string; href: string }[]>([]);

    React.useEffect(() => {
        const updateBreadcrumbs = () => {
            const pathSegments = window.location.pathname
                .split("/")
                .filter((segment) => segment);

            const items = pathSegments.map((segment, index) => ({
                text: segment.charAt(0).toUpperCase() + segment.slice(1),
                href: "/" + pathSegments.slice(0, index + 1).join("/"),
            }));

            setBreadcrumbItems([{ text: "Inicio", href: "/" }, ...items]);
        };

        updateBreadcrumbs();
        window.addEventListener("popstate", updateBreadcrumbs); // Escuchar cambios en el historial
        return () => {
            window.removeEventListener("popstate", updateBreadcrumbs);
        };
    }, []);

    const handleInicioClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        window.history.pushState(null, "", "/"); // Actualizar la URL manualmente
        setBreadcrumbItems([{ text: "Inicio", href: "/" }]); // Forzar actualización del estado
    };

    if (breadcrumbItems.length === 0) {
        return null;
    }

    return (
        <div style={{ height: "32px", backgroundColor: "#f5f5f5", padding: "0 10px" }}>
            <Breadcrumbs
                items={breadcrumbItems.map((item, index) => ({
                    text: index === 0 ? ( // "Inicio" es clicable
                        <a
                            href={item.href}
                            onClick={handleInicioClick}
                            style={{ textDecoration: "none", fontWeight: "bold" }}
                        >
                            {item.text}
                        </a>
                    ) : index === breadcrumbItems.length - 1 ? ( // Último segmento es clicable
                        <Link href={item.href} style={{ textDecoration: "none", fontWeight: "bold" }}>
                            {item.text}
                        </Link>
                    ) : (
                        <span style={{ fontWeight: "bold" }}>{item.text}</span> // Intermedios no clicables
                    ),
                    current: index === breadcrumbItems.length - 1,
                }))}
            />
        </div>
    );
};
