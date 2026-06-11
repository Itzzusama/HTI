import React from 'react';
import ServiceDetailBase from './ServiceDetailBase';

const data = {
  title: 'Hair Enhancement',
  introTitle: 'Hair Enhancement',
  image: 'https://hairtechnology.co.uk/wp-content/uploads/2026/02/20865.jpg',
  introParagraphs: [
    'Females experience hair loss and thinning too but this is often different from the typical loss that men can experience. Having said that not all men lose all their hair so for those affected by diffuse or localised thinning, we offer Volumisers and similar procedures, designed to accommodate your own natural growing hair without the need for any form of bonding.',
    'These solutions are design to be with you 24 hours a day, 7 days a week and can be treated just like your own hair.',
    "The initial outlay is determined by certain key factors - the size of the area needing thickened, the length of the hair preferred and colour combination but regardless we still guarantee that our prices won't be beaten.",
  ],
  featureBlocks: [
    {
      title: 'Next Generation Hair for Fuller, Thicker Hair',
      body:
        "Our hair enhancement solutions are designed to add volume, density and style to your existing hair without the need for surgery. Whether you're experiencing early thinning or simply want a fuller look, we provide tailored solutions that blend seamlessly with your natural hair.",
    },
    {
      title: 'Natural Volume & Density, Expertly Enhanced',
      body:
        "We use advanced techniques and high-quality systems to enhance your hair's appearance while maintaining a completely natural look. Each solution is customised to match your hair texture, colour and lifestyle, ensuring comfortable wear and long-lasting results.",
    },
  ],
  bullets: [
    'Adds instant volume and thickness',
    'Blends perfectly with your natural hair',
    'Lightweight and breathable design',
    'Non-surgical and damage-free solution',
    'Ideal for thinning hair and early-stage hair loss',
  ],
  ctaTitle: 'Ready to Enhance Your Hair Naturally?',
  ctaBody:
    "Achieve the fuller, thicker hair you've always wanted with our expert hair enhancement solutions. Book your free consultation today and let us create a personalized plan that works perfectly for you.",
};

const HairEnhancement = ({ navigation }) => (
  <ServiceDetailBase navigation={navigation} data={data} />
);

export default HairEnhancement;
