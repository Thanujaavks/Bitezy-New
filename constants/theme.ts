/**
 * Bitezy Theme Configuration
 */

export const Colors = {
  primary: '#76153C',
  secondary: '#4A148C',
  accent: '#FFD700',
  light: {
    text: '#1A1A1A',
    textSecondary: '#666666',
    background: '#FFFFFF',
    card: '#F8F9FA',
    tint: '#76153C',
    icon: '#76153C',
    tabIconDefault: '#999999',
    tabIconSelected: '#76153C',
    border: '#EEEEEE',
    gradient: ['#76153C', '#4A148C'] as const,
  },
  dark: {
    text: '#F3F3F3',
    textSecondary: '#AAAAAA',
    background: '#121212',
    card: '#1E1E1E',
    tint: '#FF5C8D',
    icon: '#FF5C8D',
    tabIconDefault: '#666666',
    tabIconSelected: '#FF5C8D',
    border: '#333333',
    gradient: ['#76153C', '#2A0A16'] as const,
  },
};

export const Shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};
