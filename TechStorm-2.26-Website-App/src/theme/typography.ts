/**
 * Typography - Press Start 2P & Silkscreen fonts (same as website)
 * Font family names from @expo-google-fonts
 */

export const typography = {
  fontFamily: {
    pixel: 'PressStart2P_400Regular',
    body: 'Silkscreen_400Regular',
    bodyBold: 'Silkscreen_700Bold',
  },
  sizes: {
    xs: 9,
    sm: 11,
    md: 13,
    lg: 15,
    xl: 18,
    xxl: 20,
    heroTag: 13,
    heroTitle: 24,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;
