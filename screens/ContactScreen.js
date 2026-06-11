import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

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
  hero: 'https://hairtechnology.co.uk/wp-content/uploads/2026/02/5143.jpg',
  infoBackground:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/05/2148401388.jpg',
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

const ContactScreen = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1025;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <PageHero title="Contact Us" isTablet={isTablet} />
      <ContactFormSection isTablet={isTablet} isDesktop={isDesktop} />
      <ContactInfoBand isTablet={isTablet} isDesktop={isDesktop} />
    </ScrollView>
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
        paddingVertical: isTablet ? 130 : 96,
      },
    ]}
  >
    <View style={styles.heroOverlay} />
    <View style={styles.heroInner}>
      <Text style={[styles.heroTitle, { fontSize: isTablet ? 50 : 35 }]}>
        {title}
      </Text>
    </View>
  </ImageBackground>
);

const ContactFormSection = ({ isTablet, isDesktop }) => (
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
    <View
      style={[
        styles.formPanel,
        {
          padding: isTablet ? 48 : 25,
          width: isDesktop ? '50%' : '100%',
        },
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
        {formFields.map(field => (
          <View
            key={field.label}
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
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} activeOpacity={0.82}>
        <Text style={styles.submitIcon}>@</Text>
        <Text style={styles.submitText}>Send Message</Text>
      </TouchableOpacity>
    </View>

    <View
      style={[
        styles.mapPanel,
        {
          width: isDesktop ? '50%' : '100%',
          minHeight: isDesktop ? 640 : isTablet ? 420 : 300,
        },
      ]}
    >
      <View style={styles.mapWash} />
      <View style={styles.mapGrid}>
        {Array.from({ length: 9 }).map((_, index) => (
          <View key={index} style={styles.mapLine} />
        ))}
      </View>
      <View style={styles.mapMarker}>
        <Text style={styles.mapMarkerText}>⌖</Text>
      </View>
      <Text style={styles.mapTitle}>2nd Floor, 79 West Regent Street</Text>
      <Text style={styles.mapAddress}>Glasgow G2 2AW</Text>
    </View>
  </View>
);

const ContactInfoBand = ({ isTablet, isDesktop }) => (
  <ImageBackground
    source={{ uri: ASSETS.infoBackground }}
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
      {contactCards.map(card => (
        <InfoCard key={card.title} card={card} isTablet={isTablet} />
      ))}
    </View>
  </ImageBackground>
);

const InfoCard = ({ card, isTablet }) => (
  <View
    style={[
      styles.infoCard,
      { padding: isTablet ? 50 : 30, alignItems: isTablet ? 'stretch' : 'center' },
    ]}
  >
    <Text style={[styles.infoIcon, { fontSize: isTablet ? 50 : 35 }]}>
      {card.icon}
    </Text>
    <Text style={styles.infoTitle}>{card.title}</Text>
    <Text style={[styles.infoBody, !isTablet && styles.infoBodyCentered]}>
      {card.body}
    </Text>
  </View>
);

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
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#DDE4E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E9EEF0',
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
    justifyContent: 'space-around',
  },
  mapLine: {
    height: 1,
    backgroundColor: '#C8D0D5',
    transform: [{ rotate: '-8deg' }],
  },
  mapMarker: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.goldButton,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  mapMarkerText: {
    color: COLORS.white,
    fontFamily: 'Urbanist',
    fontSize: 25,
    fontWeight: '700',
  },
  mapTitle: {
    fontFamily: 'Poppins',
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
    textAlign: 'center',
  },
  mapAddress: {
    fontFamily: 'Poppins',
    color: COLORS.body,
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
