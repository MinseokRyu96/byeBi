interface Option<T extends string> {
  value: T;
  label: string;
}

interface StatusOptionListProps<T extends string> {
  options: Option<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
}

export function StatusOptionList<T extends string>({ options, selected, onSelect }: StatusOptionListProps<T>) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <li key={opt.value}>
            <button
              onClick={() => onSelect(opt.value)}
              style={{
                width: '100%', padding: '17px 16px',
                border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'var(--color-primary-light)' : 'var(--color-surface)',
                textAlign: 'left',
                fontSize: 15, fontWeight: isSelected ? 600 : 400,
                color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                cursor: 'pointer', transition: 'all 0.15s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontFamily: 'var(--font-family)',
              }}
            >
              {opt.label}
              {isSelected && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="var(--color-primary)" />
                  <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
