'use client';

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ProjectSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        params.set('page', '1');

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className='mt-6'>
            <label
                htmlFor='project-search'
                className='mb-2 block font-medium text-gray-900'
            >
                Search projects
            </label>

            <input
                id='project-search'
                type='search'
                placeholder='Search projects...'
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(event) => handleSearch(event.target.value)}
                className='w-full rounded border border-gray-300 px-4 py-2'
            />
        </div>
    );
}