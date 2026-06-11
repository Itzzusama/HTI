import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import ServicesScreen from '../screens/Services';
import MakeDifferScreen from '../screens/MakeDiffer';
import GalleryScreen from '../screens/Gallery';
import TestimonialScreen from '../screens/TestimonialScreen';
import ContactScreen from '../screens/ContactScreen';
import HairReplacementScreen from '../screens/HairReplacement';
import HairEnhancementScreen from '../screens/HairEnhancement';
import HairConsultationScreen from '../screens/HairConsultation';
import IMAGES from '../assets/images';

const Drawer = createDrawerNavigator();

const ASSETS = {
  headerLogo: IMAGES.headerLogo,
};

const COLORS = {
  blackDeep: '#131200',
  gold: '#CC9900',
  white: '#FFFFFF',
  muted: '#A6A6A6',
};

const hiddenDrawerRoutes = [
  'Hair Replacement',
  'Hair Enhancement',
  'Hair Consultation',
];

function CustomDrawerContent(props) {
  const { state, navigation } = props;
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      {/* Header Logo section */}
      <View style={styles.headerSection}>
        <Image
          source={ASSETS.headerLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Bespoke Hair Systems</Text>
      </View>

      {/* Drawer navigation links */}
      <View style={styles.menuItemsContainer}>
        {state.routes.map((route, index) => {
          if (hiddenDrawerRoutes.includes(route.name)) {
            return null;
          }

          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.drawerItem, isFocused && styles.activeDrawerItem]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.drawerLabel,
                  isFocused && styles.activeDrawerLabel,
                ]}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footerSection}>
        <Text style={styles.footerText}>© 2026 Hair Technology Scotland</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.blackDeep,
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
      <Drawer.Screen name="Services" component={ServicesScreen} />
      <Drawer.Screen
        name="What makes us different"
        component={MakeDifferScreen}
      />
      <Drawer.Screen name="Gallery" component={GalleryScreen} />
      <Drawer.Screen name="Testimonials" component={TestimonialScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen
        name="Hair Replacement"
        component={HairReplacementScreen}
      />
      <Drawer.Screen
        name="Hair Enhancement"
        component={HairEnhancementScreen}
      />
      <Drawer.Screen
        name="Hair Consultation"
        component={HairConsultationScreen}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.blackDeep,
  },
  headerSection: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 60,
  },
  subtitle: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  menuItemsContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  drawerItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeDrawerItem: {
    backgroundColor: COLORS.gold,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  activeDrawerLabel: {
    color: COLORS.blackDeep,
  },
  footerSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 11,
  },
});
