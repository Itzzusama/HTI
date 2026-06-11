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
};

const ASSETS = {
  headerLogo: IMAGES.headerLogo,
  heroDesktop: IMAGES.makeDifferHeroDesktop,
  heroTablet: IMAGES.makeDifferHeroTablet,
  craft: IMAGES.makeDifferCraft,
  bottomCta: IMAGES.makeDifferBottomCta,
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

const differenceCards = [
  {
    title: 'Experienced Specialists',
    body: "Our hair system specialists bring years of hands-on experience in precision fitting, styling and custom hair system design. We focus on delivering natural, realistic results tailored to each client's appearance and lifestyle.",
  },
  {
    title: 'Transparent & Honest Service',
    body: 'We believe in clear guidance, realistic expectations and complete pricing transparency. Our consultation process focuses on helping you to make the right choice for you without any pressure',
  },
  {
    title: 'Fully Personalised Solutions',
    body: 'Every hair system is carefully customised based on your preferred style, hair density, colour match and daily routine, ensuring a solution that feels comfortable and looks natural.',
  },
  {
    title: 'State of the Art Technology',
    body: 'We constantly strive to provide the most advanced procedures, many exclusively in Scotland, to give unparalleled guaranteed results that look completely natural.',
  },
  {
    title: 'Premium Hygiene & Comfort Standards',
    body: 'We maintain strict hygiene and quality control during consultation, fitting and maintenance to ensure a safe, clean and professional experience.',
  },
  {
    title: 'Ongoing Maintenance & Support',
    body: "Our service continues beyond fitting. We provide professional maintenance guidance, refitting support and styling advice to help maintain your hair system's natural appearance and longevity.",
  },
];

const MakeDifferScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1025;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header isTablet={isTablet} navigation={navigation} />
      <Hero isTablet={isTablet} isDesktop={isDesktop} />
      <WhyChooseSection isTablet={isTablet} isDesktop={isDesktop} />
      <CraftSection
        isTablet={isTablet}
        isDesktop={isDesktop}
        navigation={navigation}
      />
      <BottomCta
        isTablet={isTablet}
        isDesktop={isDesktop}
        navigation={navigation}
      />
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
                  item === 'What makes us different' && styles.navItemActive,
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

const Hero = ({ isTablet, isDesktop }) => (
  <ImageBackground
    source={isTablet && !isDesktop ? ASSETS.heroTablet : ASSETS.heroDesktop}
    resizeMode="cover"
    imageStyle={styles.heroImage}
    style={[
      styles.hero,
      {
        minHeight: isDesktop ? 520 : isTablet ? 430 : 300,
        paddingHorizontal: isDesktop ? 32 : isTablet ? 40 : 20,
        paddingVertical: isDesktop ? 160 : isTablet ? 100 : 50,
      },
    ]}
  >
    <View style={styles.heroOverlay} />
    <View style={styles.heroInner}>
      <Text
        style={[
          styles.heroTitle,
          {
            fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
            lineHeight: isDesktop ? 63 : isTablet ? 56 : 38,
          },
        ]}
      >
        What Makes Us Different
      </Text>
      <Text style={styles.heroBody}>
        At Hair Technology, we focus on delivering premium non-surgical hair
        replacement solutions designed with precision and craftsmanship. What
        sets us apart is our commitment to natural appearance, discreet service
        and fully customised hair systems designed around each client's
        individual style and expectations.
      </Text>
    </View>
  </ImageBackground>
);

const WhyChooseSection = ({ isTablet, isDesktop }) => (
  <View
    style={[
      styles.chooseSection,
      {
        paddingHorizontal: isDesktop ? 16 : isTablet ? 30 : 20,
        paddingTop: isDesktop ? 70 : isTablet ? 70 : 50,
        paddingBottom: isDesktop ? 70 : isTablet ? 70 : 50,
      },
    ]}
  >
    <Text
      style={[
        styles.centerTitle,
        {
          fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
          lineHeight: isDesktop ? 50 : isTablet ? 48 : 36,
        },
      ]}
    >
      Why Choose Us
    </Text>
    <View
      style={[
        styles.cardGrid,
        {
          flexDirection: isTablet ? 'row' : 'column',
          gap: isTablet ? 20 : 18,
        },
      ]}
    >
      {differenceCards.map(card => (
        <DifferenceCard key={card.title} card={card} isTablet={isTablet} />
      ))}
    </View>
  </View>
);

const DifferenceCard = ({ card, isTablet }) => (
  <View
    style={[
      styles.differenceCard,
      {
        width: isTablet ? '31.7%' : '100%',
        minHeight: isTablet ? 220 : 0,
      },
    ]}
  >
    <Text style={[styles.cardTitle, { fontSize: isTablet ? 25 : 22 }]}>
      {card.title}
    </Text>
    <Text style={styles.cardBody}>{card.body}</Text>
  </View>
);

const CraftSection = ({ isTablet, isDesktop, navigation }) => (
  <View
    style={[
      styles.craftSection,
      {
        flexDirection: isDesktop ? 'row' : 'column',
        gap: isDesktop ? 80 : isTablet ? 64 : 40,
        paddingHorizontal: isDesktop ? 16 : isTablet ? 32 : 20,
        paddingBottom: isDesktop ? 112 : isTablet ? 64 : 50,
      },
    ]}
  >
    <View style={styles.craftCopy}>
      <Text
        style={[
          styles.sectionTitle,
          {
            fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
            lineHeight: isDesktop ? 63 : isTablet ? 54 : 38,
          },
        ]}
      >
        Natural Appearance with Expert Craftsmanship
      </Text>
      <Text style={styles.bodyText}>
        We combine advanced hair system technology with personalised
        consultation to help you achieve a fuller, natural-looking appearance.
        From initial assessment to precision fitting and ongoing maintenance,
        our specialists focus on comfort, realism and long-lasting results.
      </Text>
      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.82}
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={styles.primaryButtonText}>Book a Consultation</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.craftImageColumn}>
      <View
        style={[
          styles.imagePad,
          {
            paddingRight: isDesktop ? 25 : 15,
            paddingBottom: isDesktop ? 25 : 15,
          },
        ]}
      >
        <Image
          source={ASSETS.craft}
          style={[
            styles.craftImage,
            {
              height: isDesktop ? 425 : isTablet ? 470 : 265,
            },
          ]}
        />
      </View>
    </View>
  </View>
);

const BottomCta = ({ isTablet, isDesktop, navigation }) => (
  <ImageBackground
    source={ASSETS.bottomCta}
    resizeMode="cover"
    imageStyle={styles.ctaImage}
    style={[
      styles.bottomCta,
      {
        minHeight: isDesktop ? 530 : isTablet ? 430 : 300,
        paddingVertical: isDesktop ? 144 : isTablet ? 80 : 48,
        paddingHorizontal: isDesktop ? 16 : isTablet ? 32 : 20,
      },
    ]}
  >
    <View style={styles.ctaOverlay} />
    <View style={[styles.ctaInner, { width: isDesktop ? '85%' : '100%' }]}>
      <Text
        style={[
          styles.ctaTitle,
          {
            fontSize: isDesktop ? 45 : isTablet ? 45 : 30,
            lineHeight: isDesktop ? 56 : isTablet ? 52 : 38,
          },
        ]}
      >
        Confidence Begins with Natural-Looking Hair
      </Text>
      <Text style={[styles.ctaBody, { width: isTablet ? '85%' : '100%' }]}>
        Take the first step towards a solution designed entirely around you. Our
        personalised hair system consultations focus on understanding your
        appearance goals, lifestyle and styling preferences to create a natural,
        seamless result that enhances confidence without compromising comfort or
        authenticity.
      </Text>
      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.82}
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={styles.primaryButtonText}>Book a Consultation</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
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
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(19, 18, 0, 0.5)',
  },
  heroInner: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    zIndex: 2,
  },
  heroTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'capitalize',
    marginBottom: 16,
  },
  heroBody: {
    maxWidth: 640,
    fontFamily: 'Poppins',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
  },
  chooseSection: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
  },
  centerTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0,
    marginBottom: 30,
  },
  cardGrid: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  differenceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 30,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.black,
    fontWeight: '600',
    lineHeight: 31,
    marginBottom: 15,
  },
  cardBody: {
    fontFamily: 'Poppins',
    color: COLORS.body,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25,
  },
  craftSection: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  craftCopy: {
    flex: 1,
    justifyContent: 'center',
  },
  craftImageColumn: {
    flex: 1,
    width: '100%',
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
    marginBottom: 20,
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
  imagePad: {
    zIndex: 5,
  },
  craftImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  bottomCta: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  ctaImage: {
    resizeMode: 'cover',
  },
  ctaOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(19, 18, 0, 0.6)',
  },
  ctaInner: {
    maxWidth: 1088,
    alignItems: 'center',
    zIndex: 2,
  },
  ctaTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0,
    marginBottom: 20,
  },
  ctaBody: {
    fontFamily: 'Poppins',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default MakeDifferScreen;
