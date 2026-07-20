import type { ReactNode } from 'react';

interface BottomCTAProps {
  children: ReactNode;
}

export function BottomCTA({ children }: BottomCTAProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 375,
        padding: '12px 20px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-light)',
      }}
    >
      {children}
    </div>
  );
}
