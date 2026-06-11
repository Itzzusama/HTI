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

const COLORS = {
  secondary: '#131200',
  gold: '#CC9900',
  white: '#FFFFFF',
  body: '#464646',
  black: '#000000',
  lightPanel: '#F7F7F7',
};

const ASSETS = {
  headerLogo:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/01/Group-76.png',
  hero: 'https://hairtechnology.co.uk/wp-content/uploads/2026/02/5143.jpg',
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

const publicRoutes = [
  'Home',
  'About Us',
  'Services',
  'What makes us different',
  'Gallery',
  'Testimonials',
  'Contact',
];

const ServiceDetailBase = ({ navigation, data }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1025;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header isTablet={isTablet} navigation={navigation} />
      <PageHero title={data.title} isTablet={isTablet} />
      <IntroSection data={data} isTablet={isTablet} isDesktop={isDesktop} />
      <FeatureSection data={data} isTablet={isTablet} />
      <CtaSection data={data} isTablet={isTablet} navigation={navigation} />
    </ScrollView>
  );
};

const Header = ({ isTablet, navigation }) => {
  const handleNavPress = item => {
    if (publicRoutes.includes(item)) {
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
      <Image source={{ uri: ASSETS.headerLogo }} style={styles.headerLogo} />
      {isTablet ? (
        <View style={styles.navRow}>
          {navItems.map(item => (
            <TouchableOpacity key={item} onPress={() => handleNavPress(item)}>
              <Text
                style={[
                  styles.navItem,
                  item === 'Services' && styles.navItemActive,
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

const PageHero = ({ title, isTablet }) => (
  <ImageBackground
    source={{ uri: ASSETS.hero }}
    resizeMode="cover"
    imageStyle={styles.heroImage}
    style={[
      styles.hero,
      {
        minHeight: isTablet ? 416 : 240,
        paddingVertical: isTablet ? 130 : 80,
      },
    ]}
  >
    <View style={styles.heroOverlay} />
    <View style={styles.heroInner}>
      <Text style={[styles.heroTitle, { fontSize: isTablet ? 50 : 34 }]}>
        {title}
      </Text>
    </View>
  </ImageBackground>
);

const IntroSection = ({ data, isTablet, isDesktop }) => (
  <View
    style={[
      styles.introShell,
      {
        paddingHorizontal: isDesktop ? 16 : isTablet ? 40 : 20,
        paddingVertical: isDesktop ? 112 : isTablet ? 70 : 50,
      },
    ]}
  >
    <View
      style={[
        styles.splitInner,
        {
          flexDirection: isDesktop ? 'row' : 'column',
          gap: isDesktop ? 80 : isTablet ? 56 : 36,
        },
      ]}
    >
      <View style={styles.copyColumn}>
        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
              lineHeight: isDesktop ? 57 : isTablet ? 52 : 40,
            },
          ]}
        >
          {data.introTitle}
        </Text>
        {data.introParagraphs.map(paragraph => (
          <Text key={paragraph} style={styles.bodyText}>
            {paragraph}
          </Text>
        ))}
      </View>
      <View style={styles.imageColumn}>
        <View
          style={[
            styles.dottedFrame,
            {
              width: isDesktop ? '88%' : isTablet ? '92%' : '86%',
              height: isDesktop ? 390 : isTablet ? 340 : 215,
            },
          ]}
        />
        <Image
          source={{ uri: data.image }}
          style={[
            styles.introImage,
            {
              height: isDesktop ? 560 : isTablet ? 440 : 280,
            },
          ]}
        />
      </View>
    </View>
  </View>
);

const FeatureSection = ({ data, isTablet }) => (
  <View
    style={[
      styles.featureShell,
      {
        paddingHorizontal: isTablet ? 40 : 20,
        paddingVertical: isTablet ? 80 : 50,
      },
    ]}
  >
    <View style={styles.featureInner}>
      {data.featureBlocks.map(block => (
        <View key={block.title} style={styles.featureBlock}>
          <Text
            style={[
              styles.featureTitle,
              {
                fontSize: isTablet ? 36 : 26,
                lineHeight: isTablet ? 44 : 34,
              },
            ]}
          >
            {block.title}
          </Text>
          <Text style={styles.bodyText}>{block.body}</Text>
        </View>
      ))}
      <View style={styles.iconList}>
        {data.bullets.map(item => (
          <View key={item} style={styles.iconListItem}>
            <Text style={styles.arrowIcon}>→</Text>
            <Text style={styles.iconListText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

const CtaSection = ({ data, isTablet, navigation }) => (
  <View
    style={[
      styles.ctaShell,
      {
        paddingHorizontal: isTablet ? 40 : 20,
        paddingVertical: isTablet ? 96 : 56,
      },
    ]}
  >
    <View style={styles.ctaInner}>
      <Text
        style={[
          styles.ctaTitle,
          {
            fontSize: isTablet ? 45 : 30,
            lineHeight: isTablet ? 56 : 38,
          },
        ]}
      >
        {data.ctaTitle}
      </Text>
      <Text style={styles.ctaBody}>{data.ctaBody}</Text>
      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.82}
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={styles.primaryButtonText}>Book a Consultation</Text>
      </TouchableOpacity>
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 18, 0, 0.1)',
  },
  heroInner: {
    width: '100%',
    maxWidth: 760,
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
  introShell: {
    width: '100%',
    overflow: 'hidden',
  },
  splitInner: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    alignItems: 'center',
  },
  copyColumn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 20,
  },
  bodyText: {
    fontFamily: 'Poppins',
    color: COLORS.body,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25,
    marginBottom: 18,
  },
  imageColumn: {
    flex: 1,
    width: '100%',
  },
  dottedFrame: {
    position: 'absolute',
    right: 0,
    top: -18,
    borderWidth: 3,
    borderStyle: 'dotted',
    borderColor: COLORS.gold,
    borderRadius: 5,
  },
  introImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    zIndex: 5,
  },
  featureShell: {
    backgroundColor: COLORS.white,
  },
  featureInner: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
  },
  featureBlock: {
    marginBottom: 18,
  },
  featureTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 14,
  },
  iconList: {
    marginTop: 6,
  },
  iconListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  arrowIcon: {
    color: COLORS.gold,
    fontSize: 22,
    lineHeight: 25,
    marginRight: 12,
  },
  iconListText: {
    flex: 1,
    fontFamily: 'Poppins',
    color: COLORS.secondary,
    fontSize: 16,
    lineHeight: 25,
  },
  ctaShell: {
    backgroundColor: COLORS.lightPanel,
  },
  ctaInner: {
    width: '100%',
    maxWidth: 980,
    alignSelf: 'center',
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0,
    marginBottom: 18,
  },
  ctaBody: {
    fontFamily: 'Poppins',
    color: COLORS.body,
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: COLORS.gold,
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 30,
  },
  primaryButtonText: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
});

export default ServiceDetailBase;
