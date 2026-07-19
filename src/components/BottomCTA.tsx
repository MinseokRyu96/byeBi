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
        left: 0,
        right: 0,
        padding: '16px 24px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        background: '#fff',
        borderTop: '1px solid #f0f0f0',
      }}
    >
      {children}
    </div>
  );
}
