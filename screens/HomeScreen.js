import React from 'react';
import {
  Image,
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
  black: '#333333',
  blackDeep: '#131200',
  gold: '#CC9900',
  goldLight: '#FFBA49',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  muted: '#464646',
  footerText: '#D9D9D9',
  border: '#FFFFFF25',
};

const ASSETS = {
  headerLogo:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/01/Group-76.png',
  footerLogo:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/01/coatofarmslogo.png',
  hero: 'https://hairtechnology.co.uk/wp-content/uploads/2026/01/hair4.jpg',
  about:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/02/2149396120.jpg',
  stats: 'https://hairtechnology.co.uk/wp-content/uploads/2026/02/6003.jpg',
  appointment:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/02/charming-strong-young-guy-holds-his-hand-his-hair_150254-1039.webp',
};

const partnerImages = [
  'https://hairtechnology.co.uk/wp-content/uploads/2026/01/Vector.png',
  'https://hairtechnology.co.uk/wp-content/uploads/2026/01/Group-56.png',
  'https://hairtechnology.co.uk/wp-content/uploads/2026/01/Group-55.png',
  'https://hairtechnology.co.uk/wp-content/uploads/2026/01/Group-54.png',
  'https://hairtechnology.co.uk/wp-content/uploads/2026/01/Group-53.png',
  'https://hairtechnology.co.uk/wp-content/uploads/2026/01/Group-52.png',
  'https://hairtechnology.co.uk/wp-content/uploads/2026/01/Group-51.png',
];

const navItems = [
  'Home',
  'About Us',
  'Services',
  'What makes us different',
  'Gallery',
  'Testimonials',
  'Contact',
];

const topStats = [
  'Successful Consultations',
  'Hair & Scalp Treatments',
  'Advanced Hair Solutions',
  'Satisfied Long-Term Clients',
];

const bottomStats = [
  'Years Experience',
  'Active Clients',
  'Hair systems fitted',
];

const formFields = [
  { label: 'First Name', placeholder: 'First Name', half: true },
  { label: 'Last Name', placeholder: 'Last Name', half: true },
  { label: 'Email', placeholder: 'Email', half: true },
  { label: 'Phone', placeholder: 'Phone', half: true },
  { label: 'Message', placeholder: 'Message', multiline: true },
];

const HomeScreen = ({ activeScreen = 'Home', onNavigate = () => {} }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const horizontal = isTablet ? 40 : 20;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header isTablet={isTablet} />
      <Hero isTablet={isTablet} horizontal={horizontal} />
      <About isTablet={isTablet} horizontal={horizontal} />
      <StatsSection isTablet={isTablet} horizontal={horizontal} />
      <Appointment isTablet={isTablet} horizontal={horizontal} />
      <Footer
        isTablet={isTablet}
        horizontal={horizontal}
        activeScreen={activeScreen}
        onNavigate={onNavigate}
      />
    </ScrollView>
  );
};

const Header = ({ isTablet }) => (
  <View style={styles.header}>
    <Image source={{ uri: ASSETS.headerLogo }} style={styles.headerLogo} />
    {isTablet ? (
      <View style={styles.navRow}>
        {navItems.map(item => (
          <Text
            key={item}
            style={[styles.navItem, item === 'Home' && styles.navItemActive]}
          >
            {item}
          </Text>
        ))}
      </View>
    ) : (
      <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
      </TouchableOpacity>
    )}
  </View>
);

const Hero = ({ isTablet, horizontal }) => (
  <ImageBackground
    source={{ uri: ASSETS.hero }}
    resizeMode="cover"
    imageStyle={styles.heroImage}
    style={[styles.hero, { minHeight: isTablet ? 720 : 650 }]}
  >
    <View style={styles.heroOverlay} />
    <View
      style={[
        styles.heroContent,
        { paddingHorizontal: horizontal, width: isTablet ? '58%' : '100%' },
      ]}
    >
      <Text style={styles.heroKicker}>Welcome to bespokes hair systems</Text>
      <Text
        style={[
          styles.heroTitle,
          { fontSize: isTablet ? 50 : 26, lineHeight: isTablet ? 58 : 35 },
        ]}
      >
        We care for you and your hair,
        <Text style={styles.heroGold}> every step of the way.</Text>
      </Text>
      <Text style={styles.heroBody}>
        Expert-led hair loss solutions designed to restore confidence and
        deliver natural, lasting results. Care personalised to you, for men and
        women, young and old, bespoke hair systems offering guaranteed results.
      </Text>
    </View>
  </ImageBackground>
);

const About = ({ isTablet, horizontal }) => (
  <View
    style={[
      styles.about,
      {
        paddingHorizontal: horizontal,
        flexDirection: isTablet ? 'row' : 'column',
      },
    ]}
  >
    <View style={[styles.aboutCopy, isTablet && styles.half]}>
      <Text style={styles.sectionKicker}>Who we are</Text>
      <Text
        style={[
          styles.sectionTitle,
          { fontSize: isTablet ? 50 : 30, lineHeight: isTablet ? 57 : 40 },
        ]}
      >
        The original and Longest established supplier of hair systems in
        Scotland.
      </Text>
      <Text style={styles.bodyDark}>
        We provide a complete hair replacement and enhancement service, with
        state-of-the-art results.
      </Text>
      <View
        style={[
          styles.contactRow,
          { flexDirection: isTablet ? 'row' : 'column' },
        ]}
      >
        <InfoBlock icon="T" title="Contact Us" body="0141 331 2688" />
        <View
          style={[
            styles.divider,
            isTablet ? styles.dividerVertical : styles.dividerHorizontal,
          ]}
        />
        <InfoBlock
          icon="H"
          title="Opening Hours"
          body={'Mon-Wed : 10.00-18.00\nTues, Thurs - Sat 09.00 - 20.00'}
        />
      </View>
    </View>
    <View style={[styles.aboutImageWrap, isTablet && styles.half]}>
      <View style={styles.dottedFrame} />
      <Image source={{ uri: ASSETS.about }} style={styles.aboutImage} />
    </View>
  </View>
);

const InfoBlock = ({ icon, title, body }) => (
  <View style={styles.infoBlock}>
    <View style={styles.infoIcon}>
      <Text style={styles.infoIconText}>{icon}</Text>
    </View>
    <View style={styles.infoTextWrap}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoBody}>{body}</Text>
    </View>
  </View>
);

const StatsSection = ({ isTablet, horizontal }) => (
  <>
    <ImageBackground
      source={{ uri: ASSETS.stats }}
      resizeMode="cover"
      style={styles.statsHero}
    >
      <View style={styles.darkWash} />
      <Text
        style={[
          styles.statsHeading,
          {
            paddingHorizontal: horizontal,
            fontSize: isTablet ? 50 : 30,
            lineHeight: isTablet ? 57 : 40,
          },
        ]}
      >
        We select the best suppliers worldwide and offer the very latest
        techniques.
      </Text>
    </ImageBackground>

    <View style={[styles.statsPanel, { marginHorizontal: horizontal }]}>
      {topStats.map(label => (
        <CounterCard key={label} label={label} compact={!isTablet} />
      ))}
    </View>

    <View style={styles.logoStrip}>
      {partnerImages.map(uri => (
        <Image key={uri} source={{ uri }} style={styles.partnerImage} />
      ))}
    </View>

    <View style={[styles.bottomStats, { paddingHorizontal: horizontal }]}>
      {bottomStats.map(label => (
        <CounterCard key={label} label={label} compact={!isTablet} />
      ))}
    </View>
  </>
);

const CounterCard = ({ label, compact }) => (
  <View style={[styles.counterCard, { width: compact ? '48%' : '23%' }]}>
    <Text style={[styles.counterNumber, { fontSize: compact ? 34 : 50 }]}>
      0+
    </Text>
    <Text style={styles.counterLabel}>{label}</Text>
  </View>
);

const Appointment = ({ isTablet, horizontal }) => (
  <ImageBackground
    source={{ uri: ASSETS.appointment }}
    resizeMode="cover"
    style={[
      styles.appointment,
      {
        paddingHorizontal: horizontal,
        flexDirection: isTablet ? 'row' : 'column-reverse',
      },
    ]}
  >
    <View style={styles.appointmentOverlay} />
    <View style={[styles.formCard, isTablet && styles.half]}>
      <Text style={styles.formTitle}>Start Your Hair Transformation Today</Text>
      <Text style={styles.formIntro}>
        Share a few details and our friendly specialists will contact you to
        arrange a private consultation tailored to your hair goals.
      </Text>
      <View style={styles.fieldsWrap}>
        {formFields.map(field => (
          <View
            key={field.label}
            style={[
              styles.fieldGroup,
              field.half && isTablet ? styles.fieldHalf : styles.fieldFull,
            ]}
          >
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <TextInput
              placeholder={field.placeholder}
              placeholderTextColor="#3F3F3F"
              multiline={field.multiline}
              textAlignVertical={field.multiline ? 'top' : 'center'}
              style={[styles.input, field.multiline && styles.messageInput]}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} activeOpacity={0.85}>
        <Text style={styles.submitText}>Make Appointment</Text>
      </TouchableOpacity>
    </View>
    <View style={[styles.appointmentCopy, isTablet && styles.half]}>
      <Text
        style={[
          styles.appointmentTitle,
          { fontSize: isTablet ? 50 : 30, lineHeight: isTablet ? 57 : 40 },
        ]}
      >
        Start Your Hair Transformation With Expert Guidance
      </Text>
      <Text style={styles.appointmentBody}>
        Take the first step towards a personalised hair replacement solution
        designed specifically for you. During your private consultation, our
        specialists will assess your hair goals, discuss suitable hair system
        options and guide you through the process with complete discretion and
        professionalism.
      </Text>
      <Text style={styles.appointmentBody}>
        We focus on understanding your preferred appearance, lifestyle needs and
        styling expectations to help you achieve natural looking results with
        absolute comfort and security. Once your consultation is complete, our
        team will contact you to confirm your appointment at a time that suits
        you.
      </Text>
    </View>
  </ImageBackground>
);

const Footer = ({ isTablet, horizontal, activeScreen, onNavigate }) => (
  <View style={[styles.footer, { paddingHorizontal: horizontal }]}> 
    <View
      style={[styles.footerTop, { flexDirection: isTablet ? 'row' : 'column' }]}
    >
      <View style={styles.footerBrand}>
        <Image source={{ uri: ASSETS.footerLogo }} style={styles.footerLogo} />
        <Text style={styles.footerDescription}>
          Hair Technology International specialises in natural-looking hair
          systems, delivering confidence through quality craftsmanship and
          discreet service.
        </Text>
        <View style={styles.socialRow}>
          {['f', 'x', 'in', 'ig'].map(item => (
            <View key={item} style={styles.socialBox}>
              <Text style={styles.socialText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.footerLinks}>
        <FooterColumn
          title="Quick Links"
          links={['Contact Us', 'Leadership', 'FAQs', 'Payment', 'Careers']}
        />
        <FooterColumn
          title="Policy Links"
          links={[
            'Privacy Policy',
            'Terms and Condition',
            'Refund Policy',
            'Blog',
          ]}
        />
        <View style={styles.footerContact}>
          <Text style={styles.footerHeading}>Get In Touch</Text>
          <Text style={styles.footerLine}>
            2nd Floor, 79 West Regent Street, Glasgow G2 2AW
          </Text>
          <Text style={styles.footerLine}>0141 331 2688</Text>
          <Text style={styles.footerLine}>info@hairtechnology.co.uk</Text>
        </View>
      </View>
    </View>
    <FooterNav
      items={['Home', 'About Us', 'Contact', 'Testimonials']}
      activeScreen={activeScreen}
      onNavigate={onNavigate}
    />
    <View style={styles.copyright}>
      <Text style={styles.copyrightText}>
        Copyright © 2026 Hairtechnology.co.uk
      </Text>
    </View>
  </View>
);

const FooterNav = ({ items, activeScreen, onNavigate }) => (
  <View style={styles.footerNav}>
    <Text style={styles.footerHeading}>Quick Screen Navigation</Text>
    <View style={styles.footerNavRow}>
      {items.map(item => (
        <TouchableOpacity
          key={item}
          style={[
            styles.footerNavButton,
            activeScreen === item && styles.footerNavButtonActive,
          ]}
          activeOpacity={0.8}
          onPress={() => onNavigate(item)}
        >
          <Text
            style={[
              styles.footerNavButtonText,
              activeScreen === item && styles.footerNavButtonTextActive,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const FooterColumn = ({ title, links }) => (
  <View style={styles.footerColumn}>
    <Text style={styles.footerHeading}>{title}</Text>
    {links.map(link => (
      <Text key={link} style={styles.footerLine}>
        {link}
      </Text>
    ))}
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
    color: '#000000',
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
    backgroundColor: COLORS.blackDeep,
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 18, 0, 0.72)',
  },
  heroContent: {
    zIndex: 2,
  },
  heroKicker: {
    fontFamily: 'Poppins',
    color: COLORS.goldLight,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 15,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 58,
    textTransform: 'capitalize',
    marginBottom: 18,
  },
  heroGold: {
    color: COLORS.gold,
  },
  heroBody: {
    fontFamily: 'Poppins',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25,
    maxWidth: 760,
  },
  about: {
    gap: 48,
    paddingTop: 70,
    paddingBottom: 70,
    backgroundColor: COLORS.white,
  },
  half: {
    flex: 1,
  },
  aboutCopy: {
    justifyContent: 'center',
  },
  sectionKicker: {
    fontFamily: 'Marcellus',
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.blackDeep,
    fontWeight: '700',
    lineHeight: 57,
    textTransform: 'capitalize',
    marginBottom: 12,
  },
  bodyDark: {
    fontFamily: 'Poppins',
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 28,
  },
  contactRow: {
    gap: 20,
    alignItems: 'stretch',
  },
  infoBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  infoIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconText: {
    color: COLORS.white,
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 18,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.blackDeep,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 3,
  },
  infoBody: {
    fontFamily: 'Poppins',
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    borderColor: '#22222235',
    borderStyle: 'dashed',
  },
  dividerVertical: {
    width: 1,
    borderLeftWidth: 1,
  },
  dividerHorizontal: {
    height: 1,
    borderTopWidth: 1,
  },
  aboutImageWrap: {
    minHeight: 290,
    paddingRight: 15,
    paddingBottom: 15,
    position: 'relative',
  },
  dottedFrame: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '92%',
    height: '88%',
    borderWidth: 3,
    borderStyle: 'dotted',
    borderColor: COLORS.gold,
    borderRadius: 5,
  },
  aboutImage: {
    width: '100%',
    height: 425,
    maxHeight: 425,
    minHeight: 265,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  statsHero: {
    minHeight: 360,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
  },
  darkWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 18, 0, 0.42)',
  },
  statsHeading: {
    zIndex: 2,
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 57,
    textAlign: 'center',
  },
  statsPanel: {
    marginTop: -70,
    padding: 15,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  counterCard: {
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    padding: 15,
    minHeight: 130,
    justifyContent: 'center',
  },
  counterNumber: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 55,
    textTransform: 'capitalize',
  },
  counterLabel: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
  },
  logoStrip: {
    backgroundColor: COLORS.black,
    paddingVertical: 24,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 24,
    marginTop: 42,
  },
  partnerImage: {
    width: 86,
    height: 42,
    resizeMode: 'contain',
  },
  bottomStats: {
    backgroundColor: COLORS.white,
    paddingTop: 80,
    paddingBottom: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  appointment: {
    gap: 48,
    paddingTop: 64,
    paddingBottom: 0,
    marginBottom: 0,
    backgroundColor: COLORS.black,
  },
  appointmentOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 18, 0, 0.46)',
  },
  formCard: {
    zIndex: 2,
    backgroundColor: COLORS.offWhite,
    borderRadius: 10,
    padding: 25,
    marginBottom: -32,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  formTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.blackDeep,
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 38,
    marginBottom: 16,
  },
  formIntro: {
    fontFamily: 'Poppins',
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  fieldsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginTop: 10,
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
    color: '#3F3F3F',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 5,
  },
  input: {
    backgroundColor: COLORS.white,
    color: '#000000',
    borderRadius: 3,
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
  },
  messageInput: {
    minHeight: 136,
    textAlignVertical: 'top',
  },
  submitButton: {
    width: '40%',
    minWidth: 180,
    backgroundColor: COLORS.gold,
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  submitText: {
    color: COLORS.white,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '500',
  },
  appointmentCopy: {
    zIndex: 2,
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 96,
  },
  appointmentTitle: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 57,
    textTransform: 'capitalize',
    marginBottom: 18,
  },
  appointmentBody: {
    fontFamily: 'Poppins',
    color: COLORS.offWhite,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    backgroundColor: COLORS.black,
    paddingTop: 70,
  },
  footerTop: {
    gap: 32,
  },
  footerBrand: {
    flex: 1,
    gap: 15,
  },
  footerLogo: {
    width: 170,
    height: 100,
    resizeMode: 'contain',
  },
  footerDescription: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 24,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 4,
  },
  socialBox: {
    minWidth: 34,
    height: 34,
    borderRadius: 5,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  socialText: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  footerLinks: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 28,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 32,
  },
  footerColumn: {
    minWidth: 140,
    flex: 1,
  },
  footerContact: {
    minWidth: 230,
    flex: 1.3,
  },
  footerHeading: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 13,
  },
  footerLine: {
    fontFamily: 'Urbanist',
    color: COLORS.footerText,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 9,
  },
  footerNav: {
    marginTop: 28,
  },
  footerNavRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  footerNavButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#2A2A2A',
    borderRadius: 999,
  },
  footerNavButtonText: {
    fontFamily: 'Urbanist',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  footerNavButtonActive: {
    backgroundColor: COLORS.gold,
  },
  footerNavButtonTextActive: {
    color: COLORS.black,
  },
  copyright: {
    minHeight: 85,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  copyrightText: {
    fontFamily: 'Urbanist',
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'center',
  },
});

export default HomeScreen;
