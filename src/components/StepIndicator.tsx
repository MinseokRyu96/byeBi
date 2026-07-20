interface StepIndicatorProps {
  current: number;
  total: number;
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 'var(--radius-full)',
            background: i < current ? 'var(--color-primary)' : 'var(--color-border)',
            transition: 'background 0.2s',
          }}
        />
      ))}
    </div>
  );
}
