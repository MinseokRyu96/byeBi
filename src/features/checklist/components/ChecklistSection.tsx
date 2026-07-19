import type { ReactNode } from 'react';

interface ChecklistSectionProps {
  title: string;
  children: ReactNode;
}

export function ChecklistSection({ title, children }: ChecklistSectionProps) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 8 }}>{title}</h3>
      {children}
    </section>
  );
}
