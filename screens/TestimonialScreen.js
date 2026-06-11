import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const COLORS = {
  primary: '#FFBA49',
  secondary: '#131200',
  accent: '#C29340',
  white: '#FFFFFF',
  lightPanel: '#F7F9FB',
  black: '#000000',
};

const ASSETS = {
  hero: 'https://hairtechnology.co.uk/wp-content/uploads/2026/02/5143.jpg',
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
    quote: 'Simply life changing – now I don’t need to think twice about my hair',
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

const TestimonialScreen = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <PageHero isTablet={isTablet} />
      <TestimonialsSection isTablet={isTablet} />
    </ScrollView>
  );
};

const PageHero = ({ isTablet }) => (
  <ImageBackground
    source={{ uri: ASSETS.hero }}
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
  const fade = useRef(new Animated.Value(1)).current;

  const goTo = useCallback(nextIndex => {
    const wrapped =
      (nextIndex + testimonials.length) % testimonials.length;

    Animated.sequence([
      Animated.timing(fade, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => setActive(wrapped), 180);
  }, [fade]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(active + 1);
    }, 4200);

    return () => clearInterval(timer);
  }, [active, goTo]);

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
          <TouchableOpacity
            style={[styles.arrowButton, styles.arrowLeft]}
            activeOpacity={0.75}
            onPress={() => goTo(active - 1)}
          >
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.testimonialCard,
              {
                opacity: fade,
                minHeight: isTablet ? 224 : 255,
              },
            ]}
          >
            <Text style={styles.quoteMark}>“</Text>
            <Text style={styles.quoteText}>{testimonials[active].quote}</Text>
            <View style={styles.starRow}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Text key={index} style={styles.star}>
                  ★
                </Text>
              ))}
            </View>
          </Animated.View>

          <TouchableOpacity
            style={[styles.arrowButton, styles.arrowRight]}
            activeOpacity={0.75}
            onPress={() => goTo(active + 1)}
          >
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.authorWrap}>
          <Text style={styles.authorName}>{testimonials[active].author}</Text>
        </View>

        <View style={styles.dots}>
          {testimonials.map((item, index) => (
            <TouchableOpacity
              key={item.author}
              activeOpacity={0.8}
              onPress={() => goTo(index)}
              style={[
                styles.dot,
                index === active && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    ...StyleSheet.absoluteFillObject,
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
    position: 'absolute',
    top: '50%',
    width: 50,
    height: 50,
    marginTop: -95,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  arrowLeft: {
    left: '-38%',
  },
  arrowRight: {
    right: '-38%',
  },
  arrowText: {
    color: COLORS.accent,
    fontFamily: 'Urbanist',
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 25,
  },
});

export default TestimonialScreen;
