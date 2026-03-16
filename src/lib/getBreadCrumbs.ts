
const PAGES_MAP: Record<string, string> = {
    "products": "Products",
    "brand-and-attributes": "Brand & Attributes",
    "customers": "Customers",
    "categories": "Categories",
    "orders": "Orders",
    "discount": "Discounts",
    "edit": "Edit",
    "create": "Create",
}

export const getBreadCrumbs = (pathName: string) => {
    if(pathName === "/") {
        return { segment: "Dashboard", href: "/" }
    }

    const segments = pathName.split('/').filter(Boolean);

    const breadCrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        return {
            segment: PAGES_MAP[segment.toLowerCase()] || segment,
            href
        }
    });
    return breadCrumbs;
}