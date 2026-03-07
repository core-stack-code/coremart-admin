"use client"
import React from 'react'
import { PaginationType } from '@/types/common'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@ui/pagination'
import { Typography } from "@ui/typography"
import SelectField from "@/components/form/select-field"

interface PaginationComponentProps {
    pagination: PaginationType
    onPageChange: (newPage: number) => void
    onLimitChange?: (newLimit: number) => void
}


const PaginationComponent: React.FC<PaginationComponentProps> = ({ 
    pagination, 
    onPageChange,
    onLimitChange 
}) => {
    const { page, totalPages, isPrevPage, isNextPage, limit, totalItems } = pagination

    const handlePageChange = (newPage: number) => {
        onPageChange(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleLimitChange = (value: string) => {
        if(onLimitChange) {
            onLimitChange(Number(value));
        }
    }

    const getVisiblePages = (): number[] => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        if (page === 1) {
            return [1, 2, 3]
        }

        if (page === totalPages) {
            return [totalPages - 2, totalPages - 1, totalPages]
        }

        return [page - 1, page, page + 1]
    }

    if (totalItems === 0) return null;

    const visiblePages = getVisiblePages()
    const showStartEllipsis = visiblePages[0] > 1
    const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages

    return (
        <div className='w-full flex flex-col md:flex-row items-center justify-between py-4 px-2 gap-4 mt-4'>
            <div className="flex items-center">
                <Typography variant="small" className="text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{(page - 1) * limit + 1}</span> to <span className="font-medium text-foreground">{Math.min(page * limit, totalItems)}</span> of <span className="font-medium text-foreground">{totalItems}</span> results
                </Typography>
            </div>
            
            <div className="flex items-center gap-4 lg:gap-8">
                {onLimitChange && (
                    <div className="flex items-center gap-2">
                        <Typography variant="small" className="font-medium">Rows per page</Typography>
                        <SelectField 
                            value={limit.toString()} 
                            onChange={handleLimitChange}
                            selectTriggerClass="h-8 w-[70px] bg-transparent"
                            containerClass="mb-0 gap-0"
                            options={[10, 20, 30, 40, 50].map(size => ({
                                label: size.toString(),
                                value: size.toString()
                            }))}
                        />
                    </div>
                )}

                {totalPages > 1 && (
                    <Pagination className="justify-end w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => isPrevPage && handlePageChange(page - 1)}
                                    className={!isPrevPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>

                            {showStartEllipsis && (
                                <>
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => handlePageChange(1)}
                                            className='cursor-pointer'
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                </>
                            )}

                            {visiblePages.map((pageNum) => (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        onClick={() => handlePageChange(pageNum)}
                                        isActive={page === pageNum}
                                        className='cursor-pointer'
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {showEndEllipsis && (
                                <>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => handlePageChange(totalPages)}
                                            className='cursor-pointer'
                                        >
                                            {totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => isNextPage && handlePageChange(page + 1)}
                                    className={!isNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    )
}

export default PaginationComponent
