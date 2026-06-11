import React from 'react';
import ServiceDetailBase from './ServiceDetailBase';

const data = {
  title: 'Hair replacement',
  introTitle: 'Hair replacement',
  image:
    'https://hairtechnology.co.uk/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-13-at-1.58.03-AM.jpeg',
  introParagraphs: [
    'Suitable for anyone experiencing hair loss, our hair systems are designed to replicate your own natural hair and blend seamlessly.',
    'The costs start at only £445 and the results are guaranteed. We can guide you through every step of the process from the initial informal chat right through to the finished result. With three decades of experience, we have access to the widest range of products designed to give you complete comfort and security with your new hair.',
    "Our aim is to be completely transparent when it comes to the initial outlay and ongoing costs, so during the initial chat we will be happy to cover all options so you can make the right decision for you. Irrespective of the choice you make, we guarantee our prices won't be beaten for a comparable product or service.",
  ],
  featureBlocks: [
    {
      title: 'Expert Hair Replacement Systems Tailored for You',
      body:
        'We offer expertly crafted hair replacement systems designed to match your unique style, hair type and lifestyle. Our solutions are fully customized to ensure a secure fit, natural appearance and maximum comfort. Using high-quality materials and advanced techniques, we create results that are virtually undetectable and long-lasting.',
    },
  ],
  bullets: [
    'Fully customized hair systems for every individual',
    'Perfect color, density and texture matching',
    'Secure fitting for active lifestyles',
    'Ongoing care and maintenance support',
  ],
  ctaTitle: 'Ready to Transform Your Look with Confidence?',
  ctaBody:
    'Take the first step towards a natural, fuller look with our expert hair replacement solutions. Book your free consultation today and let our specialists create a personalised solution tailored just for you.',
};

const HairReplacement = ({ navigation }) => (
  <ServiceDetailBase navigation={navigation} data={data} />
);

export default HairReplacement;
