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
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {options.map((opt) => {
        const checked = selected.includes(opt.value);
        return (
          <li key={opt.value} style={{ marginBottom: 12 }}>
            <button
              onClick={() => onToggle(opt.value)}
              style={{
                width: '100%',
                padding: '16px',
                border: `2px solid ${checked ? '#3182f6' : '#e5e5e5'}`,
                borderRadius: 12,
                background: checked ? '#ebf3ff' : '#fff',
                textAlign: 'left',
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18 }}>{checked ? '☑' : '☐'}</span>
              {opt.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
