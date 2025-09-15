import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Alert, Animated, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor(
    { light: '#ffffff', dark: '#1c1c1e' }, 
    'background'
  );
  const borderColor = useThemeColor(
    { light: '#E5E5EA', dark: '#38383a' }, 
    'background'
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleScanCard = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Coming Soon!', 'Camera functionality will be added next.');
  };

  const handleViewCollection = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Coming Soon!', 'Collection view will be added soon.');
  };

  const handleQuickActions = async (action: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Feature Coming Soon!', `${action} functionality will be added soon.`);
  };

  // Theme-aware gradient colors
  const gradientColors = colorScheme === 'dark' 
    ? ['#2c3e50', '#34495e'] as const
    : ['#667eea', '#764ba2'] as const;

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={gradientColors}
        style={styles.headerGradient}
      >
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <ThemedText type="title" style={styles.title}>PokeLens</ThemedText>
          <ThemedText style={styles.subtitle}>
            Identify Pokemon cards with AI-powered camera scanning
          </ThemedText>
          <ThemedView style={styles.statsContainer}>
            <ThemedView style={styles.statItem}>
              <ThemedText style={styles.statNumber}>1,000+</ThemedText>
              <ThemedText style={styles.statLabel}>Cards Identified</ThemedText>
            </ThemedView>
            <ThemedView style={styles.statItem}>
              <ThemedText style={styles.statNumber}>99%</ThemedText>
              <ThemedText style={styles.statLabel}>Accuracy</ThemedText>
            </ThemedView>
          </ThemedView>
        </Animated.View>
      </LinearGradient>

      <ThemedView style={styles.content}>
        <Animated.View 
          style={[
            styles.actionButtons,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <TouchableOpacity style={styles.primaryButton} onPress={handleScanCard}>
            <LinearGradient
              colors={['#ff6b6b', '#ee5a24'] as const}
              style={styles.buttonGradient}
            >
              <IconSymbol name="camera.fill" size={28} color="white" />
              <ThemedText style={styles.buttonText}>Scan Card</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <ThemedView style={styles.secondaryButtons}>
            <TouchableOpacity 
              style={[styles.secondaryButton, { backgroundColor: cardBackground, borderColor }]} 
              onPress={handleViewCollection}
            >
              <IconSymbol name="folder.fill" size={20} color="#007AFF" />
              <ThemedText style={styles.secondaryButtonText}>Collection</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.secondaryButton, { backgroundColor: cardBackground, borderColor }]} 
              onPress={() => handleQuickActions('Card Database')}
            >
              <IconSymbol name="magnifyingglass" size={20} color="#34C759" />
              <ThemedText style={styles.secondaryButtonText}>Database</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </Animated.View>

        <Animated.View 
          style={[
            styles.featuresSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
          
          <ThemedView style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.quickActionItem, { backgroundColor: cardBackground }]}
              onPress={() => handleQuickActions('Recent Scans')}
            >
              <IconSymbol name="clock.fill" size={24} color="#FF9500" />
              <ThemedText style={styles.quickActionText}>Recent Scans</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionItem, { backgroundColor: cardBackground }]}
              onPress={() => handleQuickActions('Favorites')}
            >
              <IconSymbol name="heart.fill" size={24} color="#FF3B30" />
              <ThemedText style={styles.quickActionText}>Favorites</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionItem, { backgroundColor: cardBackground }]}
              onPress={() => handleQuickActions('Statistics')}
            >
              <IconSymbol name="chart.bar.fill" size={24} color="#007AFF" />
              <ThemedText style={styles.quickActionText}>Statistics</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionItem, { backgroundColor: cardBackground }]}
              onPress={() => handleQuickActions('Settings')}
            >
              <IconSymbol name="gearshape.fill" size={24} color="#8E8E93" />
              <ThemedText style={styles.quickActionText}>Settings</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </Animated.View>

        <Animated.View 
          style={[
            styles.infoSection,
            { backgroundColor: cardBackground },
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <ThemedText type="subtitle" style={styles.infoTitle}>How it works:</ThemedText>
          <ThemedView style={styles.step}>
            <ThemedView style={styles.stepNumberContainer}>
              <ThemedText style={styles.stepNumber}>1</ThemedText>
            </ThemedView>
            <ThemedText style={styles.stepText}>Point your camera at any Pokemon card</ThemedText>
          </ThemedView>
          <ThemedView style={styles.step}>
            <ThemedView style={styles.stepNumberContainer}>
              <ThemedText style={styles.stepNumber}>2</ThemedText>
            </ThemedView>
            <ThemedText style={styles.stepText}>Get instant identification and card details</ThemedText>
          </ThemedView>
          <ThemedView style={styles.step}>
            <ThemedView style={styles.stepNumberContainer}>
              <ThemedText style={styles.stepNumber}>3</ThemedText>
            </ThemedView>
            <ThemedText style={styles.stepText}>Save to your personal collection</ThemedText>
          </ThemedView>
        </Animated.View>
      </ThemedView>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  actionButtons: {
    marginBottom: 32,
  },
  primaryButton: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 12,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: (width - 60) / 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  infoSection: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    paddingTop: 4,
  },
});
