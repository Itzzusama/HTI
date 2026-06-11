import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import IMAGES from '../assets/images';

const COLORS = {
  secondary: '#131200',
  gold: '#CC9900',
  white: '#FFFFFF',
  black: '#000000',
  lightPanel: '#F7F7F7',
};

const ASSETS = {
  headerLogo: IMAGES.footerLogo,
  hero: IMAGES.pageHero,
};

const navItems = [
  'Home',
  'About Us',
  'Services',
  'What makes us different',
  'Gallery',
  'Testimonials',
  'Contact',
];

const galleryImages = [
  IMAGES.galleryBa1,
  IMAGES.galleryBa6,
  IMAGES.galleryBa5,
  IMAGES.galleryMagicstudioMain,
  IMAGES.galleryAesthetic6,
  IMAGES.galleryAesthetic7,
  IMAGES.galleryAesthetic10,
  IMAGES.galleryMagicstudioAlt,
  IMAGES.galleryAesthetic11,
  IMAGES.galleryAesthetic12,
  IMAGES.galleryAesthetic13,
  IMAGES.galleryAesthetic20,
  IMAGES.galleryAesthetic19,
  IMAGES.galleryWhatsapp30,
  IMAGES.galleryWhatsapp31,
  IMAGES.galleryAesthetic4,
  IMAGES.galleryWhatsapp31Alt,
  IMAGES.galleryAesthetic2,
];

const Gallery = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1025;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <Header isTablet={isTablet} navigation={navigation} />
      <PageHero isTablet={isTablet} />
      <GallerySection isTablet={isTablet} isDesktop={isDesktop} />
    </ScrollView>
  );
};

const Header = ({ isTablet, navigation }) => {
  const handleNavPress = item => {
    if (
      [
        'Home',
        'About Us',
        'Services',
        'What makes us different',
        'Gallery',
        'Testimonials',
        'Contact',
      ].includes(item)
    ) {
      navigation.navigate(item);
    }
  };

  return (
    <View style={styles.header}>
      {!isTablet && (
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.8}
          onPress={() => navigation && navigation.openDrawer()}
        >
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
      )}
      <Image source={ASSETS.headerLogo} style={styles.headerLogo} />
      {isTablet ? (
        <View style={styles.navRow}>
          {navItems.map(item => (
            <TouchableOpacity key={item} onPress={() => handleNavPress(item)}>
              <Text
                style={[
                  styles.navItem,
                  item === 'Gallery' && styles.navItemActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={{ width: 42 }} />
      )}
    </View>
  );
};

const PageHero = ({ isTablet }) => (
  <ImageBackground
    source={ASSETS.hero}
    resizeMode="cover"
    imageStyle={styles.heroImage}
    style={[
      styles.hero,
      {
        minHeight: isTablet ? 416 : 240,
        paddingVertical: isTablet ? 130 : 96,
      },
    ]}
  >
    <View style={styles.heroOverlay} />
    <View style={styles.heroInner}>
      <Text style={[styles.heroTitle, { fontSize: isTablet ? 50 : 40 }]}>
        Gallery
      </Text>
    </View>
  </ImageBackground>
);

const GallerySection = ({ isTablet, isDesktop }) => (
  <View style={styles.galleryShell}>
    <View
      style={[
        styles.titleWrap,
        {
          paddingTop: isTablet ? 70 : 30,
          paddingHorizontal: isDesktop ? 16 : isTablet ? 30 : 20,
        },
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          {
            fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
            lineHeight: isDesktop ? 57 : isTablet ? 52 : 38,
          },
        ]}
      >
        Before & After Gallery
      </Text>
    </View>
    <View
      style={[
        styles.imageList,
        {
          paddingTop: isTablet ? 40 : 30,
          paddingBottom: isDesktop ? 80 : isTablet ? 50 : 30,
          paddingHorizontal: isDesktop ? 0 : isTablet ? 30 : 20,
        },
      ]}
    >
      {galleryImages.map((source, index) => (
        <View key={index} style={styles.imageRow}>
          <Image
            source={source}
            style={[
              styles.galleryImage,
              {
                height: isDesktop ? 620 : isTablet ? 500 : 260,
              },
            ]}
            resizeMode="cover"
          />
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.gold,
    borderBottomWidth: 2,
    minHeight: 102,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    width: 150,
    height: 96,
    resizeMode: 'contain',
  },
  navRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 28,
  },
  navItem: {
    fontFamily: 'Urbanist',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    lineHeight: 21,
  },
  navItemActive: {
    color: COLORS.gold,
  },
  menuButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLine: {
    width: 25,
    height: 3,
    backgroundColor: COLORS.gold,
    marginVertical: 3,
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondary,
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(19, 18, 0, 0.1)',
  },
  heroInner: {
    width: '100%',
    maxWidth: 630,
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 63,
    letterSpacing: 0,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  galleryShell: {
    backgroundColor: COLORS.lightPanel,
  },
  titleWrap: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0,
  },
  imageList: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
  },
  imageRow: {
    width: '100%',
    marginBottom: 30,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    backgroundColor: COLORS.secondary,
  },
});

export default Gallery;
