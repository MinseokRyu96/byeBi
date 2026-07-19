import { createBrowserRouter } from 'react-router-dom';
import { EntryScreen } from '@/screens/entry/EntryScreen';
import { ResignationStatusScreen } from '@/screens/onboarding/ResignationStatusScreen';
import { ResignationDateScreen } from '@/screens/onboarding/ResignationDateScreen';
import { NextCareerScreen } from '@/screens/onboarding/NextCareerScreen';
import { ConditionsScreen } from '@/screens/onboarding/ConditionsScreen';
import { ChecklistCreatedScreen } from '@/screens/result/ChecklistCreatedScreen';
import { ChecklistHomeScreen } from '@/screens/home/ChecklistHomeScreen';
import { ChecklistDetailScreen } from '@/screens/detail/ChecklistDetailScreen';
import { ShareResultScreen } from '@/screens/share/ShareResultScreen';
import { SettingsScreen } from '@/screens/settings/SettingsScreen';

export const router = createBrowserRouter([
  { path: '/', element: <EntryScreen /> },
  { path: '/onboarding/status', element: <ResignationStatusScreen /> },
  { path: '/onboarding/date', element: <ResignationDateScreen /> },
  { path: '/onboarding/career', element: <NextCareerScreen /> },
  { path: '/onboarding/conditions', element: <ConditionsScreen /> },
  { path: '/result', element: <ChecklistCreatedScreen /> },
  { path: '/home', element: <ChecklistHomeScreen /> },
  { path: '/detail/:id', element: <ChecklistDetailScreen /> },
  { path: '/share', element: <ShareResultScreen /> },
  { path: '/settings', element: <SettingsScreen /> },
]);
