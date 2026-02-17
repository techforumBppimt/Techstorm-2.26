import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HERO_CONTENT, IMAGE_URLS } from '../../utils/constants';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import PrimaryButton from '../Shared/PrimaryButton';

const { width } = Dimensions.get('window');

export default function HeroSection() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleExploreEvents = () => {
    navigation.navigate('EventsTab');
  };

  return (
    <View style={[styles.container, { minHeight: Dimensions.get('window').height - insets.top - 80 }]}>
      {/* Hero background - same as website (heroph for mobile, opacity 0.6, gradient overlay) */}
      <Image
        source={{ uri: IMAGE_URLS.heroBgMobile }}
        style={styles.heroBackground}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
        style={styles.heroOverlay}
      />
      {/* Content column */}
      <View style={[styles.content, { paddingTop: spacing.xxl + insets.top }]} pointerEvents="box-none">
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={IMAGE_URLS.heroLogo}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="TechStorm 2026 Logo"
          />
        </View>

        {/* Title tag */}
        <Text style={styles.titleTag}>{HERO_CONTENT.titleTag}</Text>

        {/* Main title */}
        <Text style={styles.title}>{HERO_CONTENT.title}</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{HERO_CONTENT.subtitle}</Text>

        {/* CTA Button - navigates to Events tab (in-app WebView) */}
        <View style={styles.buttonGroup}>
          <PrimaryButton
            title={HERO_CONTENT.ctaExplore}
            onPress={handleExploreEvents}
            size="large"
            accessibilityLabel="Explore TechStorm events"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    zIndex: 2,
  },
  logoContainer: {
    marginBottom: spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.9,
    maxWidth: 350,
    height: undefined,
    aspectRatio: 2.5,
  },
  titleTag: {
    fontFamily: typography.fontFamily.pixel,
    fontSize: 13,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: typography.fontFamily.bodyBold,
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontFamily: typography.fontFamily.body,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  buttonGroup: {
    flexDirection: 'column',
    gap: spacing.md,
    width: '100%',
    alignItems: 'center',
  },
});
