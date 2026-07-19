interface Option<T extends string> {
  value: T;
  label: string;
}

interface StatusOptionListProps<T extends string> {
  options: Option<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
}

export function StatusOptionList<T extends string>({
  options,
  selected,
  onSelect,
}: StatusOptionListProps<T>) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {options.map((opt) => (
        <li key={opt.value} style={{ marginBottom: 12 }}>
          <button
            onClick={() => onSelect(opt.value)}
            style={{
              width: '100%',
              padding: '16px',
              border: `2px solid ${selected === opt.value ? '#3182f6' : '#e5e5e5'}`,
              borderRadius: 12,
              background: selected === opt.value ? '#ebf3ff' : '#fff',
              textAlign: 'left',
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            {opt.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
