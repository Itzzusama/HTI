import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TextInput,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IMAGES from '../assets/images';

const COLORS = {
  primary: '#FFBA49',
  secondary: '#131200',
  accent: '#C29340',
  goldButton: '#CC9900',
  white: '#FFFFFF',
  panel: '#EFF1F3',
  body: '#464646',
  fieldText: '#000000',
  label: '#3F3F3F',
};

const ASSETS = {
  hero: IMAGES.pageHero,
  infoBackground: IMAGES.contactInfoBackground,
  mapPreview: {
    uri: 'https://staticmap.openstreetmap.de/staticmap.php?center=55.8633259,-4.2584799&zoom=15&size=900x620&maptype=mapnik&markers=55.8633259,-4.2584799,lightblue1',
  },
};

const LOCATION = {
  latitude: 55.8633259,
  longitude: -4.2584799,
  address: '2nd Floor, 79 West Regent Street, Glasgow G2 2AW',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=55.8633259,-4.2584799',
};

const formFields = [
  { label: 'Name', placeholder: 'Name', half: true },
  { label: 'Email', placeholder: 'Email', half: true },
  { label: 'Phone', placeholder: 'Phone' },
  { label: 'Message', placeholder: 'Message', multiline: true },
];

const contactCards = [
  {
    icon: '⌖',
    title: 'Head Office',
    body: '2nd Floor, 79 West Regent Street, Glasgow G2 2AW',
  },
  {
    icon: '@',
    title: 'Email Address',
    body: 'info@hairtechnology.co.uk',
  },
  {
    icon: '☎',
    title: 'Call Us',
    body: '0141 331 2688',
  },
];

const ContactScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const isTablet = width >= 768;
  const isDesktop = width >= 1025;
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerHeight = 102 + insets.top;
  const heroHeight = isTablet ? 416 : 240;
  const formStart = headerHeight + heroHeight;
  const formSectionHeight = isDesktop ? 864 : isTablet ? 516 : 760;
  const infoStart = formStart + formSectionHeight;

  return (
    <View style={styles.container}>
      <Header isTablet={isTablet} navigation={navigation} />
      <Animated.ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <PageHero title="Contact Us" isTablet={isTablet} />
        <ContactFormSection
          isTablet={isTablet}
          isDesktop={isDesktop}
          scrollY={scrollY}
          viewportHeight={height}
          startOffset={formStart}
        />
        <ContactInfoBand
          isTablet={isTablet}
          isDesktop={isDesktop}
          scrollY={scrollY}
          viewportHeight={height}
          startOffset={infoStart}
        />
        <View style={{height: 24}} />
      </Animated.ScrollView>
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
                  item === 'Contact' && styles.navItemActive,
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
    <Animated.View
      entering={FadeInUp.duration(780).delay(120).springify().damping(18)}
      style={styles.heroInner}
    >
      <Animated.Text
        entering={FadeInDown.duration(650).delay(240)}
        style={[styles.heroTitle, { fontSize: isTablet ? 50 : 35 }]}
      >
        {title}
      </Animated.Text>
    </Animated.View>
  </ImageBackground>
);

const ContactFormSection = ({
  isTablet,
  isDesktop,
  scrollY,
  viewportHeight,
  startOffset,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const openMap = () => {
    Linking.openURL(LOCATION.mapsUrl);
  };

  const handleSendMessage = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Required Fields', 'Please fill in Name, Email, and Message.');
      return;
    }

    const recipient = 'info@hairtechnology.co.uk';
    const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    );
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    Linking.openURL(mailtoUrl).catch(() =>
      Alert.alert('Error', 'Unable to open email client.'),
    );
  };

  const formRevealStyle = useRevealStyle({
    scrollY,
    viewportHeight,
    startOffset: startOffset + 40,
    translateY: 45,
    initialScale: 0.97,
  });
  const mapRevealStyle = useRevealStyle({
    scrollY,
    viewportHeight,
    startOffset: startOffset + 110,
    translateY: 55,
    initialScale: 0.94,
  });

  return (
    <View
      style={[
        styles.formSection,
        {
          flexDirection: isDesktop ? 'row' : 'column',
          paddingHorizontal: isDesktop ? 16 : isTablet ? 32 : 20,
          paddingVertical: isDesktop ? 112 : isTablet ? 48 : 32,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.formPanel,
          {
            padding: isTablet ? 48 : 25,
            width: isDesktop ? '50%' : '100%',
          },
          formRevealStyle,
        ]}
      >
        <Text style={[styles.formHeading, { fontSize: isTablet ? 40 : 30 }]}>
          Start Your Hair Transformation Today
        </Text>
        <Text style={styles.formIntro}>
          Do you have questions or are you ready to begin your journey? Our
          friendly specialists are here to guide you with expert advice,
          personalised solutions and complete discretion. Get in touch today to
          book your free consultation.
        </Text>

        <View style={styles.fieldsWrap}>
          {formFields.map((field, index) => {
            let value = '';
            let onChangeText = () => {};
            if (field.label === 'Name') {
              value = name;
              onChangeText = setName;
            } else if (field.label === 'Email') {
              value = email;
              onChangeText = setEmail;
            } else if (field.label === 'Phone') {
              value = phone;
              onChangeText = setPhone;
            } else if (field.label === 'Message') {
              value = message;
              onChangeText = setMessage;
            }

            return (
              <Animated.View
                key={field.label}
                entering={FadeInUp.duration(520).delay(260 + index * 90)}
                style={[
                  styles.fieldGroup,
                  field.half && isDesktop ? styles.fieldHalf : styles.fieldFull,
                ]}
              >
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <TextInput
                  placeholder={field.placeholder}
                  placeholderTextColor={COLORS.label}
                  multiline={field.multiline}
                  textAlignVertical={field.multiline ? 'top' : 'center'}
                  style={[styles.input, field.multiline && styles.messageInput]}
                  value={value}
                  onChangeText={onChangeText}
                />
              </Animated.View>
            );
          })}
        </View>

        <Animated.View entering={FadeInUp.duration(540).delay(660)}>
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.82}
            onPress={handleSendMessage}
          >
            <Text style={styles.submitIcon}>@</Text>
            <Text style={styles.submitText}>Send Message</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          {
            width: isDesktop ? '50%' : '100%',
            minHeight: isDesktop ? 640 : isTablet ? 420 : 300,
          },
          mapRevealStyle,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={openMap}
          style={styles.mapPanel}
        >
          <ImageBackground
            source={ASSETS.mapPreview}
            resizeMode="cover"
            imageStyle={styles.mapImage}
            style={styles.mapImageShell}
          >
            <View style={styles.mapWash} />
            <Animated.View
              entering={FadeInDown.duration(620).delay(520)}
              style={styles.mapMarker}
            >
              <Text style={styles.mapMarkerText}>⌖</Text>
            </Animated.View>
            <Animated.View
              entering={FadeInUp.duration(620).delay(620)}
              style={styles.mapInfoCard}
            >
              <Text style={styles.mapTitle}>
                2nd Floor, 79 West Regent Street
              </Text>
              <Text style={styles.mapAddress}>Glasgow G2 2AW</Text>
            </Animated.View>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const ContactInfoBand = ({
  isTablet,
  isDesktop,
  scrollY,
  viewportHeight,
  startOffset,
}) => {
  const bandRevealStyle = useRevealStyle({
    scrollY,
    viewportHeight,
    startOffset,
    translateY: 30,
    initialScale: 0.99,
  });

  return (
    <Animated.View style={bandRevealStyle}>
      <ImageBackground
        source={ASSETS.infoBackground}
        resizeMode="cover"
        imageStyle={styles.infoBandImage}
        style={[
          styles.infoBand,
          {
            minHeight: isDesktop ? 580 : isTablet ? 450 : 300,
            marginBottom: isDesktop ? 120 : isTablet ? 104 : 576,
            paddingHorizontal: isDesktop ? 16 : isTablet ? 32 : 20,
          },
        ]}
      >
        <View
          style={[
            styles.cardGrid,
            {
              flexDirection: isTablet ? 'row' : 'column',
              gap: isDesktop ? 30 : isTablet ? 20 : 15,
              marginBottom: isDesktop ? -128 : isTablet ? -104 : -576,
            },
          ]}
        >
          {contactCards.map((card, index) => (
            <InfoCard
              key={card.title}
              card={card}
              index={index}
              isTablet={isTablet}
              scrollY={scrollY}
              viewportHeight={viewportHeight}
              startOffset={startOffset + 140 + index * 45}
            />
          ))}
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const InfoCard = ({
  card,
  index,
  isTablet,
  scrollY,
  viewportHeight,
  startOffset,
}) => {
  const cardRevealStyle = useRevealStyle({
    scrollY,
    viewportHeight,
    startOffset,
    translateY: 36 + index * 8,
    initialScale: 0.94,
  });

  return (
    <Animated.View
      style={[
        styles.infoCard,
        {
          padding: isTablet ? 50 : 30,
          paddingBottom: card.title === 'Call Us' ? 45 : 16,
          alignItems: isTablet ? 'stretch' : 'center',
        },
        cardRevealStyle,
      ]}
    >
      <Text style={[styles.infoIcon, { fontSize: isTablet ? 50 : 35 }]}>
        {card.icon}
      </Text>
      <Text style={styles.infoTitle}>{card.title}</Text>
      <Text style={[styles.infoBody, !isTablet && styles.infoBodyCentered]}>
        {card.body}
      </Text>
    </Animated.View>
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
  header: {
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.goldButton,
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
    color: COLORS.goldButton,
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
    backgroundColor: COLORS.goldButton,
    marginVertical: 3,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingBottom: 20,
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
  formSection: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    gap: 48,
    overflow: 'hidden',
  },
  formPanel: {
    backgroundColor: COLORS.panel,
    borderRadius: 10,
    justifyContent: 'center',
  },
  formHeading: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontWeight: '700',
    lineHeight: 50,
    letterSpacing: 0,
    marginBottom: 20,
  },
  formIntro: {
    fontFamily: 'Poppins',
    color: COLORS.body,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 7,
  },
  fieldsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginTop: 20,
  },
  fieldGroup: {
    paddingHorizontal: 5,
    marginBottom: 16,
  },
  fieldHalf: {
    width: '50%',
  },
  fieldFull: {
    width: '100%',
  },
  fieldLabel: {
    fontFamily: 'Poppins',
    color: COLORS.label,
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 5,
  },
  input: {
    minHeight: 40,
    backgroundColor: COLORS.white,
    borderWidth: 0,
    borderRadius: 3,
    color: COLORS.fieldText,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  messageInput: {
    minHeight: 136,
  },
  submitButton: {
    width: '40%',
    minWidth: 176,
    minHeight: 50,
    borderRadius: 2,
    backgroundColor: COLORS.goldButton,
    paddingVertical: 16,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitIcon: {
    color: COLORS.white,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '500',
  },
  submitText: {
    color: COLORS.white,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
  },
  mapPanel: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#DDE4E8',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  mapImageShell: {
    flex: 1,
    justifyContent: 'center',
  },
  mapImage: {
    borderRadius: 10,
  },
  mapWash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(12, 7, 39, 0.12)',
  },
  mapMarker: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.goldButton,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  mapMarkerText: {
    color: COLORS.white,
    fontFamily: 'Urbanist',
    fontSize: 25,
    fontWeight: '700',
  },
  mapInfoCard: {
    marginTop: 'auto',
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(19, 18, 0, 0.78)',
  },
  mapTitle: {
    fontFamily: 'Poppins',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
    textAlign: 'center',
  },
  mapAddress: {
    fontFamily: 'Poppins',
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  infoBand: {
    justifyContent: 'flex-end',
    backgroundColor: COLORS.secondary,
  },
  infoBandImage: {
    resizeMode: 'cover',
  },
  cardGrid: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
  },
  infoCard: {
    flex: 1,
    minHeight: 215,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.accent,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  infoIcon: {
    color: COLORS.goldButton,
    marginBottom: 15,
    lineHeight: 55,
  },
  infoTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.secondary,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 29,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  infoBody: {
    fontFamily: 'Poppins',
    color: COLORS.body,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  infoBodyCentered: {
    textAlign: 'center',
  },
});

export default ContactScreen;
