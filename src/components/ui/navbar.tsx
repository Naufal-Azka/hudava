import logo from '@/assets/logo.svg'

export default function Navbar() {
	return (
		<nav className='w-full bg-white border-b border-b-black shadow-xl px-6 py-3 flex items-center justify-between'>
			<div className='flex items-center space-x-3'>
				<img
					src={logo}
					alt='Logo'
					className='w-12 h-12'
				/>
				<h1 className='text-xl font-bold text-gray-800'>Hudava</h1>
			</div>
		</nav>
	);
}
