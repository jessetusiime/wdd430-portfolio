'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(pageNumber: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    }

    function goToPage(pageNumber: number) {
        router.push(createPageURL(pageNumber));
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className='mt-8 flex items-center justify-center gap-4'>
            <button
                type='button'
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className='rounded border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50'
            >
                Previous
            </button>

            <span className='text-sm text-gray-700'>
                Page {currentPage} of {totalPages}
            </span>

            <button
                type='button'
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className='rounded border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50'
            >
                Next
            </button>
        </div>
    );
}