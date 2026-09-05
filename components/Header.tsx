import NavLinks from './NavLinks';

export default function Header() {
    return (
        <header className='bg-blue-600 px-6 py-4 text-white shadow-md'>
            <nav className='mx-auto flex max-w-4xl items-center justify-between'>
                <div id='header-title' className='text-2xl font-bold'>
                    Tusiime Jesse
                </div>

                <NavLinks />
            </nav>
        </header>
    );
}