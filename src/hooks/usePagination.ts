"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const usePagination = (initialLimit = 10) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // read from URL
    const { page, limit } = useMemo(() => {
        const rawPage = searchParams.get("page");
        const rawLimit = searchParams.get("limit");

        const parsedPage = rawPage ? parseInt(rawPage, 10) : 1;
        const parsedLimit = rawLimit ? parseInt(rawLimit, 10) : initialLimit;

        return {
            page: isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage,
            limit: isNaN(parsedLimit) || parsedLimit < 1 ? initialLimit : parsedLimit,
        };
    }, [searchParams, initialLimit]);

    // construct and push the new URL
    const updateUrl = useCallback(
        (newPage: number, newLimit: number) => {
            const params = new URLSearchParams(searchParams.toString());

            if (newPage > 1) {
                params.set("page", newPage.toString());
            } else {
                params.delete("page");
            }

            if (newLimit !== initialLimit && newLimit > 0) {
                params.set("limit", newLimit.toString());
            } else {
                params.delete("limit");
            }

            const queryString = params.toString();
            const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

            router.push(newUrl, { scroll: false });
        },
        [searchParams, pathname, router, initialLimit]
    );

    const handlePageChange = useCallback(
        (newPage: number) => {
            if (newPage !== page) {
                updateUrl(newPage, limit);
            }
        },
        [page, limit, updateUrl]
    );

    const handleLimitChange = useCallback(
        (newLimit: number) => {
            if (newLimit !== limit) {
                // When limit changes, we must reset the page to 1 
                // to avoid ending up on an empty out-of-bounds page.
                updateUrl(1, newLimit);
            }
        },
        [limit, updateUrl]
    );

    return {
        page,
        limit,
        handlePageChange,
        handleLimitChange,
    };
};