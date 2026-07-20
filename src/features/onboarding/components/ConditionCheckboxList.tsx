import type { UserCondition } from '@/types/plan';

interface ConditionOption {
  value: UserCondition;
  label: string;
}

interface ConditionCheckboxListProps {
  options: ConditionOption[];
  selected: UserCondition[];
  onToggle: (value: UserCondition) => void;
}

export function ConditionCheckboxList({ options, selected, onToggle }: ConditionCheckboxListProps) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map((opt) => {
        const checked = selected.includes(opt.value);
        return (
          <li key={opt.value}>
            <button
              onClick={() => onToggle(opt.value)}
              style={{
                width: '100%', padding: '15px 16px',
                border: `1.5px solid ${checked ? 'var(--color-primary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                background: checked ? 'var(--color-primary-light)' : 'var(--color-surface)',
                textAlign: 'left', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12,
                transition: 'all 0.15s ease',
                fontFamily: 'var(--font-family)',
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                border: checked ? 'none' : '1.5px solid var(--color-border)',
                background: checked ? 'var(--color-primary)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}>
                {checked && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2.5 6.5l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: 15, fontWeight: checked ? 500 : 400,
                color: checked ? 'var(--color-primary)' : 'var(--color-text-primary)',
              }}>
                {opt.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
