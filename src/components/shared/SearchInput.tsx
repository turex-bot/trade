import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Cari...', className = '' }: SearchInputProps) {
  return (
    <div className={`flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 max-w-sm ${className}`}>
      <Search className="w-4 h-4 text-[#94a3b8]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
      />
    </div>
  );
}
