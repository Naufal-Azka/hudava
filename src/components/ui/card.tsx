// src/components/ui/card.tsx
import {Pill} from "lucide-react";
import logo from "@/assets/logo.svg";

type Medicine = {
	id: string;
	nama: string;
	image?: string;
	deskripsi?: string;
	kategori?: string;
	tags?: string[];
};

export default function Card({medicine, onClick = () => {}}: {medicine: Medicine; onClick?: () => void}) {
	const imgSrc = medicine.image ?? logo;
	return (
		<div
			onClick={onClick}
			className='hover:scale-105 hover:shadow-2xl hover:-translate-y-1 shadow-lg py-4 px-2 border border-black rounded-lg transition duration-300 cursor-pointer'>
			<div className='grid grid-cols-[30%_1fr] gap-2'>
				<div className='rounded-md overflow-hidden bg-gray-100'>
					<img
						src={imgSrc}
						alt={medicine.nama}
						loading='lazy'
						onError={(e) => {
							(e.currentTarget as HTMLImageElement).src = logo;
						}}
						className='w-full h-28 object-contain'
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center'>
						<Pill className='mr-2 text-muted-foreground' />
						<div className='text-lg font-bold group-hover:text-primary'>{medicine.nama}</div>
					</div>

					<div className='grid grid-cols-3 gap-3'>
						<span className='rounded px-1 py-0.5 bg-gray-300 text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap'>
							{medicine.kategori ?? "Umum"}
						</span>

						{medicine.tags?.slice(0, 2).map((t) => (
							<span
								key={t}
								className='rounded px-1 py-0.5 bg-gray-300 text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap'>
								{t}
							</span>
						))}
					</div>
				</div>
			</div>

			<p className='px-1 pt-2 line-clamp-2 text-sm text-muted-foreground'>
				{medicine.deskripsi ?? "Tidak ada deskripsi."}
			</p>
		</div>
	);
}
