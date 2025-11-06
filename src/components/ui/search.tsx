// src/components/ui/search.tsx
import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
};

export default function Searchbar({ value, onChange, onClear }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Masukkan Nama Obat maupun Suplemen..."
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 pl-10 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        {value && (
          <button
            type="button"
            aria-label="clear"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}
