interface StepIndicatorProps {
  current: number;
  total: number;
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            background: i < current ? '#3182f6' : '#e5e5e5',
            transition: 'background 0.2s',
          }}
        />
      ))}
      <span style={{ fontSize: 12, color: '#888', marginLeft: 4, whiteSpace: 'nowrap' }}>
        {current}/{total}
      </span>
    </div>
  );
}
