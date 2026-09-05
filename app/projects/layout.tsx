import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav className='border-b p-4'>
                <Link href='/projects' className='mr-6'>
                    Projects
                </Link>

                <Link href='/projects/settings'>
                    Settings
                </Link>
            </nav>

            {children}
        </div>
    );
}