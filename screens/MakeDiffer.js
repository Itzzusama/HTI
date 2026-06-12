import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IMAGES from '../assets/images';

const COLORS = {
  secondary: '#131200',
  gold: '#CC9900',
  white: '#FFFFFF',
  body: '#464646',
  black: '#000000',
};

const ASSETS = {
  headerLogo: IMAGES.footerLogo,
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
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const isTablet = width >= 768;
  const isDesktop = width >= 1025;
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerHeight = 102 + insets.top;
  const heroHeight = isDesktop ? 520 : isTablet ? 430 : 300;
  const whyStart = headerHeight + heroHeight;
  const whyPaddingTop = isDesktop ? 70 : isTablet ? 70 : 50;
  const whyTitleHeight = isDesktop ? 50 : isTablet ? 48 : 36;
  const whyCardTop = whyStart + whyPaddingTop + whyTitleHeight + 30;
  const cardRowHeight = isTablet ? 240 : 260;
  const craftStart =
    whyStart +
    whyPaddingTop +
    whyTitleHeight +
    30 +
    (isTablet ? 500 : differenceCards.length * cardRowHeight) +
    (isDesktop ? 70 : isTablet ? 70 : 50);
  const ctaStart =
    craftStart +
    (isDesktop ? 425 : isTablet ? 470 : 265) +
    (isDesktop ? 112 : isTablet ? 64 : 50);

  return (
    <Animated.ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      <Header isTablet={isTablet} navigation={navigation} />
      <Hero isTablet={isTablet} isDesktop={isDesktop} />
      <WhyChooseSection
        isTablet={isTablet}
        isDesktop={isDesktop}
        scrollY={scrollY}
        viewportHeight={height}
        startOffset={whyCardTop}
        cardRowHeight={cardRowHeight}
      />
      <CraftSection
        isTablet={isTablet}
        isDesktop={isDesktop}
        navigation={navigation}
        scrollY={scrollY}
        viewportHeight={height}
        startOffset={craftStart}
      />
      <BottomCta
        isTablet={isTablet}
        isDesktop={isDesktop}
        navigation={navigation}
        scrollY={scrollY}
        viewportHeight={height}
        startOffset={ctaStart}
      />
    </Animated.ScrollView>
  );
};

const Header = ({ isTablet, navigation }) => {
  const insets = useSafeAreaInsets();

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
    <View
      style={[
        styles.header,
        { paddingTop: insets.top, minHeight: 102 + insets.top },
      ]}
    >
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
    <Animated.View
      entering={FadeInUp.duration(850).delay(120).springify().damping(18)}
      style={styles.heroInner}
    >
      <Animated.Text
        entering={FadeInDown.duration(700).delay(240)}
        style={[
          styles.heroTitle,
          {
            fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
            lineHeight: isDesktop ? 63 : isTablet ? 56 : 38,
          },
        ]}
      >
        What Makes Us Different
      </Animated.Text>
      <Animated.Text
        entering={FadeInUp.duration(750).delay(420)}
        style={styles.heroBody}
      >
        At Hair Technology, we focus on delivering premium non-surgical hair
        replacement solutions designed with precision and craftsmanship. What
        sets us apart is our commitment to natural appearance, discreet service
        and fully customised hair systems designed around each client's
        individual style and expectations.
      </Animated.Text>
    </Animated.View>
  </ImageBackground>
);

const WhyChooseSection = ({
  isTablet,
  isDesktop,
  scrollY,
  viewportHeight,
  startOffset,
  cardRowHeight,
}) => (
  <WhyChooseContent
    isTablet={isTablet}
    isDesktop={isDesktop}
    scrollY={scrollY}
    viewportHeight={viewportHeight}
    startOffset={startOffset}
    cardRowHeight={cardRowHeight}
  />
);

const WhyChooseContent = ({
  isTablet,
  isDesktop,
  scrollY,
  viewportHeight,
  startOffset,
  cardRowHeight,
}) => {
  const titleRevealStyle = useRevealStyle({
    scrollY,
    viewportHeight,
    startOffset: startOffset - 80,
    translateY: 28,
    initialScale: 0.98,
  });

  return (
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
      <Animated.Text
        style={[
          styles.centerTitle,
          {
            fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
            lineHeight: isDesktop ? 50 : isTablet ? 48 : 36,
          },
          titleRevealStyle,
        ]}
      >
        Why Choose Us
      </Animated.Text>
      <View
        style={[
          styles.cardGrid,
          {
            flexDirection: isTablet ? 'row' : 'column',
            gap: isTablet ? 20 : 18,
          },
        ]}
      >
        {differenceCards.map((card, index) => (
          <DifferenceCard
            key={card.title}
            card={card}
            index={index}
            isTablet={isTablet}
            scrollY={scrollY}
            viewportHeight={viewportHeight}
            startOffset={
              startOffset +
              (isTablet ? Math.floor(index / 3) : index) * cardRowHeight
            }
          />
        ))}
      </View>
    </View>
  );
};

const DifferenceCard = ({
  card,
  index,
  isTablet,
  scrollY,
  viewportHeight,
  startOffset,
}) => {
  const animatedStyle = useRevealStyle({
    scrollY,
    viewportHeight,
    startOffset,
    translateY: 38 + (index % 3) * 8,
    initialScale: 0.94,
  });

  return (
    <Animated.View
      style={[
        styles.differenceCard,
        {
          width: isTablet ? '31.7%' : '100%',
          minHeight: isTablet ? 220 : 0,
        },
        animatedStyle,
      ]}
    >
      <Text style={[styles.cardTitle, { fontSize: isTablet ? 25 : 22 }]}>
        {card.title}
      </Text>
      <Text style={styles.cardBody}>{card.body}</Text>
    </Animated.View>
  );
};

const CraftSection = ({
  isTablet,
  isDesktop,
  navigation,
  scrollY,
  viewportHeight,
  startOffset,
}) => {
  const copyRevealStyle = useRevealStyle({
    scrollY,
    viewportHeight,
    startOffset,
    translateY: 45,
    initialScale: 0.97,
  });
  const imageRevealStyle = useRevealStyle({
    scrollY,
    viewportHeight,
    startOffset: startOffset + 80,
    translateY: 55,
    initialScale: 0.92,
  });

  return (
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
      <Animated.View style={[styles.craftCopy, copyRevealStyle]}>
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
      </Animated.View>
      <Animated.View style={[styles.craftImageColumn, imageRevealStyle]}>
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
      </Animated.View>
    </View>
  );
};

const BottomCta = ({
  isTablet,
  isDesktop,
  navigation,
  scrollY,
  viewportHeight,
  startOffset,
}) => {
  const ctaRevealStyle = useRevealStyle({
    scrollY,
    viewportHeight,
    startOffset,
    translateY: 36,
    initialScale: 0.96,
  });

  return (
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
      <Animated.View
        style={[
          styles.ctaInner,
          { width: isDesktop ? '85%' : '100%' },
          ctaRevealStyle,
        ]}
      >
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
          Take the first step towards a solution designed entirely around you.
          Our personalised hair system consultations focus on understanding your
          appearance goals, lifestyle and styling preferences to create a
          natural, seamless result that enhances confidence without compromising
          comfort or authenticity.
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.82}
          onPress={() => navigation.navigate('Contact')}
        >
          <Text style={styles.primaryButtonText}>Book a Consultation</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

const useRevealStyle = ({
  scrollY,
  viewportHeight,
  startOffset,
  translateY,
  initialScale,
}) =>
  useAnimatedStyle(() => {
    const viewportBottom = scrollY.value + viewportHeight;
    const progress = interpolate(
      viewportBottom,
      [startOffset, startOffset + viewportHeight * 0.42],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity: interpolate(progress, [0, 1], [0, 1], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(
            progress,
            [0, 1],
            [translateY, 0],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            progress,
            [0, 1],
            [initialScale, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

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
