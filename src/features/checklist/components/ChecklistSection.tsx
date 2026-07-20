import type { ReactNode } from 'react';

interface ChecklistSectionProps {
  title: string;
  children: ReactNode;
}

export function ChecklistSection({ title, children }: ChecklistSectionProps) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h3 style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--color-text-tertiary)',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        {title}
      </h3>
      {children}
    </section>
  );
}
