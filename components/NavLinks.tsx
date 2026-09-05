'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label='Main navigation'>
            <ul className='flex gap-6'>
                <li>
                    <Link
                        href='/'
                        className={
                            pathname === '/'
                                ? 'font-bold underline underline-offset-4'
                                : 'hover:underline hover:underline-offset-4'
                        }
                        aria-current={pathname === '/' ? 'page' : undefined}
                    >
                        Home
                    </Link>
                </li>

                <li>
                    <Link
                        href='/about'
                        className={
                            pathname === '/about'
                                ? 'font-bold underline underline-offset-4'
                                : 'hover:underline hover:underline-offset-4'
                        }
                        aria-current={pathname === '/about' ? 'page' : undefined}
                    >
                        About
                    </Link>
                </li>

                <li>
                    <Link
                        href='/projects'
                        className={
                            pathname === '/projects'
                                ? 'font-bold underline underline-offset-4'
                                : 'hover:underline hover:underline-offset-4'
                        }
                        aria-current={pathname === '/projects' ? 'page' : undefined}
                    >
                        Projects
                    </Link>
                </li>

                <li>
                    <Link
                        href='/contact'
                        className={
                            pathname === '/contact'
                                ? 'font-bold underline underline-offset-4'
                                : 'hover:underline hover:underline-offset-4'
                        }
                        aria-current={pathname === '/contact' ? 'page' : undefined}
                    >
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
}