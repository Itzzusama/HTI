import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IMAGES from '../assets/images';

const COLORS = {
  primary: '#FFBA49',
  secondary: '#131200',
  accent: '#C29340',
  white: '#FFFFFF',
  lightPanel: '#F7F9FB',
  black: '#000000',
};

const ASSETS = {
  hero: IMAGES.pageHero,
};

const testimonials = [
  {
    author: 'N, Glasgow',
    quote: 'Thanks for all that you’ve done for me – you’re amazing',
  },
  {
    author: 'I, Aberdeen',
    quote: 'Thank you goes nowhere near how I feel',
  },
  {
    author: 'M, Perthshire',
    quote:
      'I highly recommend Hair Technology to anyone who has a hair loss problem. Thanks for all the sympathetic care and advice',
  },
  {
    author: 'J, Dundee',
    quote:
      'Simply life changing – now I don’t need to think twice about my hair',
  },
  {
    author: 'M, Stirling',
    quote: 'Thanks to all at Hair Technology – my hair looks and feels great',
  },
  {
    author: 'C, Inverness',
    quote:
      'I wish I had known sooner how much happier having great hair makes me feel',
  },
  {
    author: 'W, Fife',
    quote:
      'It’s so nice to finally have the hair I’ve always wanted – thanks so much',
  },
];

const STAR_INDICES = [0, 1, 2, 3, 4];

const TestimonialScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View style={styles.container}>
      <Header isTablet={isTablet} navigation={navigation} />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
      >
        <PageHero isTablet={isTablet} />
        <TestimonialsSection isTablet={isTablet} />
        <View style={{height: 24}} />
      </ScrollView>
    </View>
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
      <Image source={IMAGES.footerLogo} style={styles.headerLogo} />
      {isTablet ? (
        <View style={styles.navRow}>
          {[
            'Home',
            'About Us',
            'Services',
            'What makes us different',
            'Gallery',
            'Testimonials',
            'Contact',
          ].map(item => (
            <TouchableOpacity key={item} onPress={() => handleNavPress(item)}>
              <Text
                style={[
                  styles.navItem,
                  item === 'Testimonials' && styles.navItemActive,
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
      <Text style={[styles.heroTitle, { fontSize: isTablet ? 50 : 30 }]}>
        Testimonials
      </Text>
    </View>
  </ImageBackground>
);

const TestimonialsSection = ({ isTablet }) => {
  const [active, setActive] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);
  const swipeThreshold = isTablet ? 90 : 60;
  const slideDistance = isTablet ? 220 : 160;

  const resetCardPosition = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 6,
        isInteraction: false,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
        isInteraction: false,
      }),
    ]).start();
  }, [cardOpacity, translateX]);

  const goTo = useCallback(
    (nextIndex, direction = 1) => {
      if (isAnimating.current) {
        return;
      }

      isAnimating.current = true;
      const wrapped = (nextIndex + testimonials.length) % testimonials.length;
      const normalizedDirection = direction >= 0 ? 1 : -1;

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: normalizedDirection * -slideDistance,
          duration: 180,
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(cardOpacity, {
          toValue: 0.4,
          duration: 180,
          useNativeDriver: true,
          isInteraction: false,
        }),
      ]).start(() => {
        setActive(wrapped);
        translateX.setValue(normalizedDirection * slideDistance);
        cardOpacity.setValue(0.4);

        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 5,
            isInteraction: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            isInteraction: false,
          }),
        ]).start(() => {
          isAnimating.current = false;
        });
      });
    },
    [cardOpacity, slideDistance, translateX],
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 12 &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderMove: (_, gestureState) => {
        if (isAnimating.current) {
          return;
        }

        translateX.setValue(gestureState.dx);
        const nextOpacity = 1 - Math.min(Math.abs(gestureState.dx) / 260, 0.35);
        cardOpacity.setValue(nextOpacity);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isAnimating.current) {
          return;
        }

        if (gestureState.dx <= -swipeThreshold) {
          goTo(active + 1, 1);
          return;
        }

        if (gestureState.dx >= swipeThreshold) {
          goTo(active - 1, -1);
          return;
        }

        resetCardPosition();
      },
      onPanResponderTerminate: resetCardPosition,
    }),
  ).current;

  useEffect(() => {
    if (isAnimating.current) {
      return undefined;
    }

    const timer = setInterval(() => {
      goTo(active + 1, 1);
    }, 4500);

    return () => clearInterval(timer);
  }, [active, goTo]);

  const cardAnimatedStyle = {
    opacity: cardOpacity,
    transform: [
      { translateX },
      {
        scale: translateX.interpolate({
          inputRange: [-260, 0, 260],
          outputRange: [0.96, 1, 0.96],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View
      style={[
        styles.testimonialSection,
        {
          paddingTop: isTablet ? 110 : 60,
          paddingBottom: isTablet ? 79 : 60,
        },
      ]}
    >
      <View
        style={[
          styles.sliderFrame,
          {
            width: isTablet ? '50%' : '100%',
            paddingHorizontal: isTablet ? 15 : 20,
          },
        ]}
      >
        <View style={styles.sliderViewport}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.sliderContent,
              cardAnimatedStyle,
              {
                minHeight: isTablet ? 290 : 320,
              },
            ]}
          >
            <View style={[styles.cardControls, styles.cardControlsLeft]}>
              <TouchableOpacity
                style={styles.arrowButton}
                activeOpacity={0.8}
                onPress={() => goTo(active - 1, -1)}
              >
                <Text style={styles.arrowText}>{`<`}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.cardControls, styles.cardControlsRight]}>
              <TouchableOpacity
                style={styles.arrowButton}
                activeOpacity={0.8}
                onPress={() => goTo(active + 1, 1)}
              >
                <Text style={styles.arrowText}>{`>`}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.testimonialCard,
                {
                  minHeight: isTablet ? 224 : 255,
                },
              ]}
            >
              <Text style={styles.quoteMark}>“</Text>
              <Text style={styles.quoteText}>{testimonials[active].quote}</Text>
              <View style={styles.starRow}>
                {STAR_INDICES.map(index => (
                  <Text key={index} style={styles.star}>
                    ★
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.authorWrap}>
              <Text style={styles.authorName}>
                {testimonials[active].author}
              </Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.dots}>
          {testimonials.map((item, index) => (
            <TouchableOpacity
              key={item.author}
              activeOpacity={0.8}
              onPress={() => goTo(index, index > active ? 1 : -1)}
              style={[styles.dot, index === active && styles.dotActive]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.accent,
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
    color: '#000000',
    lineHeight: 21,
  },
  navItemActive: {
    color: COLORS.accent,
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
    backgroundColor: COLORS.accent,
    marginVertical: 3,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    backgroundColor: 'rgba(19, 18, 0, 0.24)',
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
  testimonialSection: {
    alignItems: 'center',
    backgroundColor: COLORS.lightPanel,
  },
  sliderFrame: {
    maxWidth: 640,
  },
  sliderViewport: {
    position: 'relative',
    marginBottom: 50,
  },
  sliderContent: {
    alignItems: 'stretch',
  },
  cardControls: {
    position: 'absolute',
    top: '50%',
    zIndex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  cardControlsLeft: {
    left: 10,
  },
  cardControlsRight: {
    right: 10,
  },
  testimonialCard: {
    borderRadius: 10,
    paddingTop: 40,
    paddingRight: 25,
    paddingBottom: 60,
    paddingLeft: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderBottomColor: COLORS.accent,
    borderBottomWidth: 18,
  },
  quoteMark: {
    position: 'absolute',
    top: 8,
    left: 18,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'Urbanist',
    fontSize: 82,
    fontWeight: '700',
    lineHeight: 86,
  },
  quoteText: {
    color: COLORS.white,
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 27,
    textAlign: 'center',
    marginBottom: 30,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
  },
  star: {
    color: COLORS.white,
    fontSize: 17,
    lineHeight: 20,
    marginHorizontal: 0,
  },
  authorWrap: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 50,
  },
  authorName: {
    color: COLORS.black,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
  },
  dots: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.black,
  },
  dotActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.accent,
    transform: [{ scale: 1.2 }],
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(194, 147, 64, 0.18)',
  },
  arrowText: {
    color: COLORS.accent,
    fontFamily: 'Urbanist',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
});

export default TestimonialScreen;
