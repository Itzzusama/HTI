import React, { useMemo, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const COLORS = {
  secondary: '#131200',
  accent: '#C29340',
  gold: '#CC9900',
  white: '#FFFFFF',
  body: '#464646',
  comparisonArrow: '#0C0727',
};

const ASSETS = {
  hero: 'https://hairtechnology.co.uk/wp-content/uploads/2026/02/5143.jpg',
  about:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/02/14508b786ede52fb8576c405c8f72c95.jpg',
  before:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/04/WhatsApp-Image-2026-01-20-at-12.35.38-PM-1-1.png',
  after:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-20-at-12.35.42-PM-1.png',
  promise: 'https://hairtechnology.co.uk/wp-content/uploads/2026/02/2147844857.jpg',
};

const benefits = [
  { title: 'Confidence Boost', value: 90 },
  { title: 'More Freedom Day to Day', value: 85 },
  { title: 'Aesthetic results', value: 95 },
];

const AboutUsScreen = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1025;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <PageHero isTablet={isTablet} />
      <AboutSection isTablet={isTablet} isDesktop={isDesktop} />
      <BeforeAfterSection isTablet={isTablet} />
      <PromiseSection isTablet={isTablet} isDesktop={isDesktop} />
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
      <Text style={[styles.heroTitle, { fontSize: isTablet ? 50 : 40 }]}>
        About us
      </Text>
    </View>
  </ImageBackground>
);

const AboutSection = ({ isTablet, isDesktop }) => (
  <View
    style={[
      styles.aboutShell,
      {
        paddingTop: isDesktop ? 80 : 50,
        paddingBottom: isDesktop ? 80 : 50,
        paddingHorizontal: isDesktop ? 0 : isTablet ? 30 : 20,
      },
    ]}
  >
    <View
      style={[
        styles.aboutInner,
        {
          flexDirection: isDesktop ? 'row' : 'column',
          gap: isDesktop ? 60 : 0,
        },
      ]}
    >
      <View
        style={[
          styles.aboutCopy,
          {
            paddingRight: isDesktop ? 30 : 0,
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
              lineHeight: isDesktop ? 57 : isTablet ? 50 : 40,
            },
          ]}
        >
          About Us
        </Text>
        <Text style={styles.bodyText}>
          Hair loss and thinning aren’t the same for everyone.{' '}
          <Text style={styles.strong}>We understand.</Text> That’s why we treat
          every client as an individual and are always here to help.{' '}
          <Text style={styles.strong}>We care. </Text>
          Hair systems should be an affordable but life-changing solution to
          hair loss.{'\n'}
          <Text style={styles.strong}>
            Natural, great looking hair – it shouldn’t be too much to ask.
          </Text>
        </Text>
        <Text style={styles.bodyText}>
          In a recent survey of our clients, we found three main benefits of
          hair replacement:
        </Text>
        <View style={styles.progressList}>
          {benefits.map((item, index) => (
            <ProgressBar key={item.title} item={item} padded={index === 1} />
          ))}
        </View>
      </View>

      <View
        style={[
          styles.aboutImageColumn,
          {
            marginTop: isDesktop ? 0 : 30,
          },
        ]}
      >
        <View
          style={[
            styles.aboutImagePad,
            {
              paddingRight: isDesktop ? 25 : 0,
              paddingBottom: isDesktop ? 25 : 15,
            },
          ]}
        >
          <Image
            source={{ uri: ASSETS.about }}
            style={[
              styles.aboutImage,
              {
                height: isDesktop ? 570 : isTablet ? 520 : 390,
              },
            ]}
          />
        </View>
      </View>
    </View>
  </View>
);

const ProgressBar = ({ item, padded }) => (
  <View style={[styles.progressItem, padded && styles.progressItemPadded]}>
    <Text style={styles.progressTitle}>{item.title}</Text>
    <View style={styles.progressTrackOuter}>
      <View style={[styles.progressTrack, { width: `${item.value}%` }]} />
    </View>
  </View>
);

const BeforeAfterSection = ({ isTablet }) => (
  <>
    <View style={styles.beforeTitleWrap}>
      <Text style={[styles.centerTitle, { fontSize: isTablet ? 50 : 30 }]}>
        Before & After
      </Text>
    </View>
    <View style={styles.beforeAfterShell}>
      <ImageComparison isTablet={isTablet} />
    </View>
  </>
);

const ImageComparison = ({ isTablet }) => {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [divider, setDivider] = useState(0.5);
  const dividerRef = useRef(0.5);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: event => {
          if (!layoutWidth) {
            return;
          }
          const next = event.nativeEvent.locationX / layoutWidth;
          dividerRef.current = clamp(next, 0.08, 0.92);
          setDivider(dividerRef.current);
        },
        onPanResponderMove: event => {
          if (!layoutWidth) {
            return;
          }
          const next = event.nativeEvent.locationX / layoutWidth;
          dividerRef.current = clamp(next, 0.08, 0.92);
          setDivider(dividerRef.current);
        },
      }),
    [layoutWidth],
  );

  const handleSize = isTablet ? 41 : 32;
  const labelStyle = isTablet ? styles.compareLabel : styles.compareLabelMobile;

  return (
    <View
      style={[
        styles.compareBox,
        { height: isTablet ? 470 : 280 },
      ]}
      onLayout={event => setLayoutWidth(event.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
    >
      <Image source={{ uri: ASSETS.after }} style={styles.compareImage} />
      <View
        style={[
          styles.beforeClip,
          { width: layoutWidth ? layoutWidth * divider : '50%' },
        ]}
      >
        <Image
          source={{ uri: ASSETS.before }}
          style={[styles.compareImage, { width: layoutWidth || '100%' }]}
        />
      </View>

      <View style={[labelStyle, styles.beforeLabel]}>
        <Text style={styles.compareLabelText}>Before</Text>
      </View>
      <View style={[labelStyle, styles.afterLabel]}>
        <Text style={styles.compareLabelText}>After</Text>
      </View>

      <View
        style={[
          styles.compareDivider,
          {
            left: layoutWidth ? layoutWidth * divider - 1.5 : '50%',
          },
        ]}
      />
      <View
        style={[
          styles.compareHandle,
          {
            width: handleSize,
            height: handleSize,
            borderRadius: handleSize / 2,
            left: layoutWidth
              ? layoutWidth * divider - handleSize / 2
              : '50%',
            marginLeft: layoutWidth ? 0 : -handleSize / 2,
            marginTop: -handleSize / 2,
          },
        ]}
      >
        <View style={styles.leftArrow} />
        <View style={styles.rightArrow} />
      </View>
    </View>
  );
};

const PromiseSection = ({ isTablet, isDesktop }) => (
  <View
    style={[
      styles.promiseShell,
      {
        flexDirection: isDesktop ? 'row' : 'column',
        gap: isDesktop ? 80 : isTablet ? 64 : 40,
        paddingHorizontal: isDesktop ? 16 : isTablet ? 30 : 20,
        paddingBottom: isDesktop ? 80 : 50,
      },
    ]}
  >
    <View style={styles.promiseImageColumn}>
      <View
        style={[
          styles.promiseImagePad,
          {
            paddingRight: isDesktop ? 25 : isTablet ? 0 : 15,
            paddingBottom: isDesktop ? 25 : isTablet ? 0 : 15,
          },
        ]}
      >
        <Image
          source={{ uri: ASSETS.promise }}
          style={[
            styles.promiseImage,
            {
              height: isDesktop ? 400 : isTablet ? 460 : 265,
            },
          ]}
        />
      </View>
    </View>
    <View style={styles.promiseCopy}>
      <Text
        style={[
          styles.sectionTitle,
          {
            fontSize: isDesktop ? 50 : isTablet ? 45 : 30,
            lineHeight: isDesktop ? 57 : isTablet ? 52 : 40,
            textTransform: 'capitalize',
          },
        ]}
      >
        Our Promise
      </Text>
      <Text style={styles.bodyText}>
        We promise to always put the client’s interests first, offering a
        completely transparent pricing policy that allows us to beat any price
        for a comparable product or service. We guarantee to always use the very
        latest technology often found nowhere else in Scotland.
      </Text>
    </View>
  </View>
);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

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
  aboutShell: {
    width: '100%',
  },
  aboutInner: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
  },
  aboutCopy: {
    flex: 1,
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
    lineHeight: 24,
    marginBottom: 20,
  },
  strong: {
    fontWeight: '700',
  },
  progressList: {
    width: '100%',
    marginTop: -3,
  },
  progressItem: {
    width: '100%',
  },
  progressItemPadded: {
    paddingVertical: 10,
  },
  progressTitle: {
    color: COLORS.gold,
    fontFamily: 'Urbanist',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 8,
  },
  progressTrackOuter: {
    width: '100%',
    height: 8,
    backgroundColor: '#E9E9E9',
    overflow: 'hidden',
  },
  progressTrack: {
    height: 8,
    backgroundColor: COLORS.gold,
  },
  aboutImageColumn: {
    flex: 1,
  },
  aboutImagePad: {
    zIndex: 5,
  },
  aboutImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  beforeTitleWrap: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  centerTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    lineHeight: 57,
    textAlign: 'center',
    letterSpacing: 0,
  },
  beforeAfterShell: {
    width: '100%',
    paddingBottom: 100,
  },
  compareBox: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
  },
  compareImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  beforeClip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  compareLabel: {
    position: 'absolute',
    top: '50%',
    backgroundColor: '#FFFFFF24',
    paddingTop: 10,
    paddingRight: 25,
    paddingBottom: 11,
    paddingLeft: 25,
  },
  compareLabelMobile: {
    position: 'absolute',
    top: '50%',
    backgroundColor: '#FFFFFF24',
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  beforeLabel: {
    left: 10,
  },
  afterLabel: {
    right: 10,
  },
  compareLabelText: {
    color: COLORS.white,
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
    textTransform: 'uppercase',
  },
  compareDivider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: COLORS.white,
  },
  compareHandle: {
    position: 'absolute',
    top: '50%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  leftArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: COLORS.comparisonArrow,
  },
  rightArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: COLORS.comparisonArrow,
  },
  promiseShell: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  promiseImageColumn: {
    flex: 1,
  },
  promiseImagePad: {
    zIndex: 5,
  },
  promiseImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  promiseCopy: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AboutUsScreen;
