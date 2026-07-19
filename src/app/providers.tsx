import { createContext, useContext, type ReactNode } from 'react';
import { useOnboardingFlow } from '@/features/onboarding/useOnboardingFlow';

type OnboardingContextType = ReturnType<typeof useOnboardingFlow>;

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function useOnboardingContext(): OnboardingContextType {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboardingContext must be used within AppProviders');
  return ctx;
}

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const onboarding = useOnboardingFlow();
  return <OnboardingContext.Provider value={onboarding}>{children}</OnboardingContext.Provider>;
}
