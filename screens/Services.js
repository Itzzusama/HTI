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
  body: '#464646',
  black: '#000000',
  dark: '#333333',
  lightPanel: '#F7F7F7',
};

const ASSETS = {
  headerLogo: IMAGES.headerLogo,
  hero: IMAGES.pageHero,
  pattern: IMAGES.servicesPattern,
  intro: IMAGES.servicesIntro,
  globe: IMAGES.globe,
  why: IMAGES.servicesWhy,
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

const serviceFeatures = [
  'Comfort and security',
  'Natural looking results',
  'Long-term confidence',
  'Unrivalled aftercare',
  'Guaranteed value for money',
];

const serviceCards = [
  {
    title: 'Hair replacement',
    route: 'Hair Replacement',
    image: IMAGES.hairReplacementCard,
    body: 'We select the very best suppliers worldwide and offer the very latest techniques, many exclusively in Scotland, for the best price. GUARANTEED. Our exclusive Hair for Life programmes mean that you can have the head of hair you have always wanted, with all hairdressing needs catered for, from only £69.50 per month. Click here for more info on hair replacement.',
  },
  {
    title: 'Hair enhancement',
    route: 'Hair Enhancement',
    image: IMAGES.thumbnailEnhancement,
    body: 'For those who just want more hair or thicker hair but who do not want the hassle and ongoing cost of extensions, our enhancement techniques (such as the Volumiser which we exclusively offer in Scotland) are ideal.',
  },
  {
    title: 'Free consultation and hair analysis',
    route: 'Hair Consultation',
    image: IMAGES.consultationCard,
    body: 'With over three decades experience in assessing and treating hair loss and microscopic hair analysis, we offer one to one consultations completely free of charge. This allows us to give tailored advice on the options available and what would be right for you',
  },
];

const partnerLogos = [
  IMAGES.partnerExecutiveHair,
  IMAGES.partnerLaBiosthetique,
  IMAGES.partnerSupplierPrimary,
  IMAGES.partnerSupplierSecondary,
  IMAGES.partnerX2O,
  IMAGES.partnerNewImageConsultants,
  IMAGES.partnerNewImageHair,
  IMAGES.partnerNewTimesHair,
  IMAGES.partnerOsmoHair,
  IMAGES.partnerProfessionalHairLabs,
];

const choiceItems = [
  {
    icon: 'H',
    title: "Specialists in Men's Hair Systems",
    body: 'We focus exclusively on providing high-quality hair replacement systems tailored for men. From consultation to fitting and styling, every solution is customised to match your natural hair texture, density, and lifestyle.',
  },
  {
    icon: 'U',
    title: 'Proven Experience & Trusted Results',
    body: 'With years of hands-on experience in hair system design fitting, and maintenance, we have helped clients achieve natural-looking, undetectable results that restore confidence.',
  },
  {
    icon: '✓',
    title: 'Precision Fitting & Natural Appearance',
    body: 'Designed to complement your own hair and professionally styled to blend seamlessly with your own hair, ensuring your hair looks totally natural and feels great.',
  },
];

const Services = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1025;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header isTablet={isTablet} navigation={navigation} />
      <PageHero isTablet={isTablet} />
      <IntroSection isTablet={isTablet} isDesktop={isDesktop} />
      <ServicesGrid
        isTablet={isTablet}
        isDesktop={isDesktop}
        navigation={navigation}
      />
      <PartnersSection isTablet={isTablet} isDesktop={isDesktop} />
      <WhyChooseSection isTablet={isTablet} isDesktop={isDesktop} />
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

const PageHero = ({ isTablet }) => (
  <ImageBackground
    source={ASSETS.hero}
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
      <Text style={[styles.heroTitle, { fontSize: isTablet ? 50 : 35 }]}>
        Services
      </Text>
    </View>
  </ImageBackground>
);

const IntroSection = ({ isTablet, isDesktop }) => (
  <ImageBackground
    source={ASSETS.pattern}
    resizeMode="repeat"
    style={[
      styles.introShell,
      {
        paddingHorizontal: isDesktop ? 16 : isTablet ? 40 : 20,
        paddingVertical: isDesktop ? 112 : isTablet ? 70 : 50,
      },
    ]}
  >
    <View style={styles.whiteWash} />
    <View
      style={[
        styles.splitInner,
        {
          flexDirection: isDesktop ? 'row' : 'column',
          gap: isDesktop ? 80 : isTablet ? 64 : 48,
        },
      ]}
    >
      <View style={styles.copyColumn}>
        <Text style={styles.kicker}>Our Services</Text>
        <Text
          style={[
            styles.largeTitle,
            {
              fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
              lineHeight: isDesktop ? 57 : isTablet ? 44 : 40,
            },
          ]}
        >
          Hair solutions that feel right for you
        </Text>
        <Text style={styles.bodyText}>
          We provide state of the art, bespoke hair systems and cosmetic hair
          solutions for hair loss and thinning hair, focusing on.
        </Text>
        <View style={styles.featureList}>
          {serviceFeatures.map(item => (
            <View key={item} style={styles.featureRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.82}>
          <Text style={styles.primaryButtonText}>Discover More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageColumn}>
        <View
          style={[
            styles.dottedFrame,
            {
              width: isDesktop ? '91%' : isTablet ? '94%' : '86%',
              height: isDesktop ? 340 : isTablet ? 365 : 210,
              top: isDesktop ? -25 : -15,
            },
          ]}
        />
        <Image
          source={ASSETS.intro}
          style={[
            styles.introImage,
            {
              height: isDesktop ? 500 : isTablet ? 410 : 235,
              marginRight: isDesktop ? 25 : 20,
            },
          ]}
        />
      </View>
    </View>
  </ImageBackground>
);

const ServicesGrid = ({ isTablet, isDesktop, navigation }) => (
  <View
    style={[
      styles.servicesShell,
      {
        paddingHorizontal: isDesktop ? 16 : isTablet ? 30 : 20,
        paddingTop: isDesktop ? 80 : isTablet ? 50 : 40,
        paddingBottom: isDesktop ? 80 : 50,
      },
    ]}
  >
    <Text
      style={[
        styles.centerTitle,
        { fontSize: isDesktop ? 50 : isTablet ? 45 : 30 },
      ]}
    >
      Our Services
    </Text>
    <View
      style={[
        styles.cardGrid,
        {
          flexDirection: isDesktop ? 'row' : 'column',
          gap: isDesktop ? 25 : 20,
        },
      ]}
    >
      {serviceCards.map(card => (
        <ServiceCard
          key={card.title}
          card={card}
          isDesktop={isDesktop}
          navigation={navigation}
        />
      ))}
    </View>
  </View>
);

const ServiceCard = ({ card, isDesktop, navigation }) => (
  <View
    style={[
      styles.serviceCard,
      {
        width: isDesktop ? '31.9%' : '100%',
      },
    ]}
  >
    <Image source={card.image} style={styles.cardImage} />
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle}>{card.title}</Text>
      <Text style={styles.cardText}>{card.body}</Text>
      <TouchableOpacity
        style={styles.cardButton}
        activeOpacity={0.82}
        onPress={() => navigation.navigate(card.route)}
      >
        <Text style={styles.cardButtonText}>Learn more</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const PartnersSection = ({ isTablet, isDesktop }) => (
  <View
    style={[
      styles.partnersShell,
      {
        paddingHorizontal: isDesktop ? 16 : isTablet ? 30 : 20,
        paddingBottom: isTablet ? 20 : 20,
      },
    ]}
  >
    <Text
      style={[
        styles.partnerTitle,
        {
          fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
          lineHeight: isDesktop ? 57 : isTablet ? 46 : 40,
        },
      ]}
    >
      Working with our professional partners:
    </Text>
    <View style={styles.logoGrid}>
      {partnerLogos.map((source, index) => (
        <View key={index} style={styles.logoTile}>
          <Image source={source} style={styles.partnerLogo} />
        </View>
      ))}
    </View>
    <Image
      source={ASSETS.globe}
      style={[
        styles.globeImage,
        {
          width: isDesktop ? '70%' : isTablet ? '86%' : '100%',
          height: isDesktop ? 560 : isTablet ? 500 : 330,
          marginBottom: isTablet ? 0 : 80,
        },
      ]}
    />
  </View>
);

const WhyChooseSection = ({ isTablet, isDesktop }) => (
  <View
    style={[
      styles.whyShell,
      {
        flexDirection: isDesktop ? 'row' : 'column-reverse',
        gap: isDesktop ? 80 : isTablet ? 48 : 32,
        paddingHorizontal: isDesktop ? 16 : isTablet ? 30 : 20,
        paddingTop: isDesktop ? 80 : isTablet ? 50 : 32,
        paddingBottom: isDesktop ? 112 : isTablet ? 50 : 40,
      },
    ]}
  >
    <View style={styles.whyImageColumn}>
      <Image
        source={ASSETS.why}
        style={[
          styles.whyImage,
          {
            height: isDesktop ? 800 : isTablet ? 620 : 390,
          },
        ]}
      />
    </View>
    <View style={styles.whyCopy}>
      <Text style={styles.kicker}>Why choose us</Text>
      <Text
        style={[
          styles.largeTitle,
          {
            fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
            lineHeight: isDesktop ? 57 : isTablet ? 52 : 40,
          },
        ]}
      >
        Hair Systems Designed for Confidence & Natural Results
      </Text>
      <Text style={styles.bodyText}>
        We specialise in premium, natural-looking hair systems designed for men
        and women experiencing hair loss or thinning. Our approach focuses on
        precision, discretion and delivering results that restore confidence
        without surgical procedures.
      </Text>
      {choiceItems.map((item, index) => (
        <ChoiceItem
          key={item.title}
          item={item}
          isMiddle={index === 1}
          isTablet={isTablet}
        />
      ))}
    </View>
  </View>
);

const ChoiceItem = ({ item, isMiddle, isTablet }) => (
  <View style={[styles.choiceRow, isMiddle && styles.choiceRowMiddle]}>
    <View
      style={[
        styles.choiceIcon,
        {
          width: isTablet ? 58 : 48,
          height: isTablet ? 58 : 48,
          borderRadius: isTablet ? 29 : 24,
        },
      ]}
    >
      <Text style={styles.choiceIconText}>{item.icon}</Text>
    </View>
    <View style={styles.choiceTextWrap}>
      <Text style={[styles.choiceTitle, { fontSize: isTablet ? 25 : 20 }]}>
        {item.title}
      </Text>
      <Text style={[styles.choiceBody, { fontSize: isTablet ? 16 : 14 }]}>
        {item.body}
      </Text>
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
  introShell: {
    width: '100%',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  whiteWash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
  kicker: {
    alignSelf: 'flex-start',
    fontFamily: 'Urbanist',
    color: COLORS.dark,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 10,
  },
  largeTitle: {
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
    lineHeight: 24,
    marginBottom: 20,
  },
  featureList: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 7,
  },
  bullet: {
    color: COLORS.body,
    fontSize: 18,
    lineHeight: 24,
    marginRight: 9,
  },
  featureText: {
    fontFamily: 'Poppins',
    color: COLORS.body,
    fontSize: 16,
    lineHeight: 24,
  },
  primaryButton: {
    alignSelf: 'flex-start',
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
  imageColumn: {
    flex: 1,
    width: '100%',
  },
  dottedFrame: {
    position: 'absolute',
    right: 0,
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
  servicesShell: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
  },
  centerTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    lineHeight: 57,
    textAlign: 'center',
    letterSpacing: 0,
    marginBottom: 40,
  },
  cardGrid: {
    width: '100%',
    alignItems: 'stretch',
  },
  serviceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.gold,
    padding: 15,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  cardBody: {
    paddingTop: 25,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  cardTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.black,
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: 0.5,
    marginBottom: 15,
  },
  cardText: {
    fontFamily: 'Poppins',
    color: COLORS.body,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 20,
  },
  cardButton: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.gold,
    paddingVertical: 16,
    paddingHorizontal: 30,
  },
  cardButtonText: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    textTransform: 'capitalize',
  },
  partnersShell: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    alignItems: 'center',
  },
  partnerTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0,
    marginBottom: 24,
  },
  logoGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  logoTile: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  globeImage: {
    resizeMode: 'contain',
  },
  whyShell: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  whyImageColumn: {
    flex: 1,
    width: '100%',
  },
  whyImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  whyCopy: {
    flex: 1,
    justifyContent: 'center',
  },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  choiceRowMiddle: {
    marginVertical: 20,
  },
  choiceIcon: {
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceIconText: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '700',
  },
  choiceTextWrap: {
    flex: 1,
  },
  choiceTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    lineHeight: 31,
    marginBottom: 7,
  },
  choiceBody: {
    fontFamily: 'Poppins',
    color: COLORS.body,
    fontWeight: '400',
    lineHeight: 22,
  },
});

export default Services;
