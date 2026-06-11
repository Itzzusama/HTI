import React, { useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import HomeScreen from './screens/HomeScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import ContactScreen from './screens/ContactScreen'
import TestimonialScreen from './screens/TestimonialScreen'

const App = () => {
  const [activeScreen, setActiveScreen] = useState('Home')

  const renderScreen = () => {
    switch (activeScreen) {
      case 'About Us':
        return <AboutUsScreen />
      case 'Contact':
        return <ContactScreen />
      case 'Testimonials':
        return <TestimonialScreen />
      default:
        return (
          <HomeScreen
            activeScreen={activeScreen}
            onNavigate={setActiveScreen}
          />
        )
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appContainer}>
        {renderScreen()}
        {activeScreen !== 'Home' && (
          <View style={styles.screenFooter}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => setActiveScreen('Home')}
            >
              <Text style={styles.backButtonText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appContainer: {
    flex: 1,
  },
  screenFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    backgroundColor: '#CC9900',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#131200',
    fontWeight: '700',
    fontSize: 16,
  },
})

export default App
