// src/App.tsx
import {useEffect, useMemo, useState} from "react";
import Card from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import Searchbar from "@/components/ui/search";
import medicinesData from "@/lib/medicine.json";
import Navbar from "@/components/ui/navbar";

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

export default function App() {
	const medicines = medicinesData as Medicine[];

	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<Medicine | null>(null);

	// simple debounce: update debouncedQuery 250ms setelah user berhenti mengetik
	useEffect(() => {
		const t = setTimeout(() => setDebouncedQuery(query), 250);
		return () => clearTimeout(t);
	}, [query]);

	// filter logic: cari di beberapa field
	const filtered = useMemo(() => {
		const q = debouncedQuery.trim().toLowerCase();
		if (!q) return medicines;

		return medicines.filter((m) => {
			// gabungkan fields menjadi satu string pencarian
			const haystack = [m.nama, m.deskripsi, m.komposisi, m.kategori, (m.tags || []).join(" ")]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();

			return haystack.includes(q);
		});
	}, [medicines, debouncedQuery]);

	function openModal(med: Medicine) {
		setSelected(med);
		setOpen(true);
	}

	return (
		<>
            <Navbar/>
			<div className='px-4 pt-6'>
				<Searchbar
					value={query}
					onChange={setQuery}
					onClear={() => setQuery("")}
				/>
			</div>

			<div className='px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4'>
				{filtered.map((m) => (
					<Card
						key={m.id}
						medicine={m}
						onClick={() => openModal(m)}
					/>
				))}
			</div>

			<Modal
				isOpen={open}
				onClose={() => setOpen(false)}
				medicine={selected}
			/>
		</>
	);
}
