// src/components/ui/modal.tsx
import {Pill} from "lucide-react";
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/ui/accordion";
import logo from "@/assets/logo.svg";

type Medicine = {
	id: string;
	nama: string;
	image?: string;
	deskripsi?: string;
	komposisi?: string;
	dosis?: Record<string, string>;
	efek_samping?: string;
	kategori?: string;
	tags?: string[];
};

export default function Modal({
	isOpen = true,
	onClose = () => {},
	medicine = null,
}: {
	isOpen?: boolean;
	onClose?: () => void;
	medicine?: Medicine | null;
}) {
	if (!isOpen) return null;
	return (
		<ModalOverlay onClose={onClose}>
			<ModalContent
				onClose={onClose}
				medicine={medicine}
			/>
		</ModalOverlay>
	);
}

function ModalOverlay({children, onClose}: {children: React.ReactNode; onClose: () => void}) {
	return (
		<div
			className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
			onClick={onClose}>
			{children}
		</div>
	);
}

function ModalContent({onClose, medicine}: {onClose: () => void; medicine: Medicine | null}) {
	if (!medicine) {
		return (
			<div
				role='dialog'
				aria-modal='true'
				className='bg-white rounded-lg px-4 py-2 shadow-lg max-w-[80%] min-h-[40%]'>
				<div className='flex justify-between items-center border-b py-3'>
					<div className='text-lg font-bold'>Detail obat</div>
					<button
						type='button'
						className='px-3 py-1 bg-gray-200 rounded'
						onClick={onClose}>
						Tutup
					</button>
				</div>
				<div className='p-4'>Tidak ada data obat terpilih.</div>
			</div>
		);
	}

	return (
		<div
			role='dialog'
			aria-modal='true'
			className='bg-white rounded-lg px-4 py-2 shadow-lg max-w-[80%] min-h-[90%] overflow-auto'
			onClick={(e) => e.stopPropagation()}>
			<div className='flex items-center border-b justify-between py-3'>
				<div className='flex items-center '>
					<Pill className='mr-2 text-muted-foreground' />
					<div className='text-lg font-bold'>{medicine.nama}</div>
				</div>
				<button
					type='button'
					className='px-3 py-1 bg-gray-200 rounded cursor-pointer'
					onClick={onClose}>
					Tutup
				</button>
			</div>

			<div className='grid grid-cols-[30%_1fr] mt-5 mb-2 gap-4'>
				<div>
					<div className='w-full'>
						<picture>
							{/* jika ingin sediakan versi responsif, bisa tambahkan <source srcSet=... media="(min-width: 768px)" /> */}
							<img
								src={medicine?.image ?? logo}
								alt={medicine?.nama ?? "Obat"}
								loading='lazy'
								onError={(e) => (e.currentTarget.src = logo)}
								className='w-full h-full rounded-md object-contain'
							/>
						</picture>
					</div>
					{/* <div className='border border-gray-400 rounded-md overflow-hidden'>
						<img
							src={logo}
							alt={medicine.nama}
							className='aspect-square w-full object-cover'
						/>
					</div> */}

					<div className='grid grid-cols-3 gap-3 mt-3'>
						<span className='rounded px-1 py-0.5 bg-gray-300 text-sm text-muted-foreground'>
							{medicine.kategori}
						</span>
						{medicine.tags?.map((t) => (
							<span
								key={t}
								className='rounded px-1 py-0.5 bg-gray-300 text-sm text-muted-foreground'>
								{t}
							</span>
						))}
					</div>
				</div>

				<div className='px-2 pt-0.5'>
					<p className='mb-3'>{medicine.deskripsi}</p>

					<Accordion
						type='single'
						collapsible>
						<AccordionItem value='komposisi'>
							<AccordionTrigger>Komposisi</AccordionTrigger>
							<AccordionContent>{medicine.komposisi ?? "Tidak tersedia"}</AccordionContent>
						</AccordionItem>

						<AccordionItem value='dosis'>
							<AccordionTrigger>Dosis</AccordionTrigger>
							<AccordionContent>
								{medicine.dosis ? (
									<div className='space-y-2'>
										{Object.entries(medicine.dosis).map(([k, v]) => (
											<div key={k}>
												<strong className='capitalize'>{k.replace("_", " ")}: </strong>
												<span>{v}</span>
											</div>
										))}
									</div>
								) : (
									"Tidak tersedia"
								)}
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value='efek_samping'>
							<AccordionTrigger>Efek Samping</AccordionTrigger>
							<AccordionContent>{medicine.efek_samping ?? "Tidak tersedia"}</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	);
}
