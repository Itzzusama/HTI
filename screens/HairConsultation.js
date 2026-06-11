import React from 'react';
import ServiceDetailBase from './ServiceDetailBase';

const data = {
  title: 'Free consultation and hair analysis',
  introTitle: 'Free consultation and hair analysis',
  image:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-07-at-11.42.29-PM.jpeg',
  introParagraphs: [
    'We often find ourselves speaking to someone desperate for help and not sure where to turn. We always deal with people as we would want to be treated ourselves - with honesty and respect.',
    'There are certain pitfalls that need to be avoided such as committing to a permanent solution, such as surgery or scalp micropigmentation, without thinking of the possible complications and weighing the pros and cons properly, so we are happy to meet as many times as necessary. Using state of the art technology, we can discuss the likely causes and solutions available, as well as what might best be avoided.',
  ],
  featureBlocks: [
    {
      title: 'Free Consultation & Professional Hair Analysis',
      body:
        'Take the first step towards restoring your confidence with our free consultation and in-depth hair analysis. Our experts carefully assess your hair condition, scalp health and personal goals to recommend the most suitable solution for you. Every consultation is personalised, ensuring you receive honest advice and a clear path forward.',
    },
    {
      title: 'Personalised Advice Based on Your Hair Needs',
      body:
        "During your consultation, we evaluate factors such as hair thinning, scalp condition and lifestyle to create a tailored plan just for you. Whether you're considering hair replacement, enhancement or treatment, our specialists provide expert guidance to help you make the right decision with confidence.",
    },
  ],
  bullets: [
    'One-on-one consultation with hair specialists',
    'Detailed scalp and hair condition analysis',
    'Personalised recommendations tailored to you',
    'No pressure, honest and expert advice',
    'Clear treatment or solution roadmap',
  ],
  ctaTitle: 'Book Your Free Hair Consultation Today',
  ctaBody:
    'Speak with our experts and discover the best solution for your hair. Get a professional analysis and personalised recommendations - completely free, with no obligation.',
};

const HairConsultation = ({ navigation }) => (
  <ServiceDetailBase navigation={navigation} data={data} />
);

export default HairConsultation;
