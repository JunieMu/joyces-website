import type { ImageMetadata } from 'astro';

import sticker1 from '../assets/designs/columbiaADI/sticker1.PNG';
import sticker2 from '../assets/designs/columbiaADI/sticker2.PNG';
import sticker3 from '../assets/designs/columbiaADI/sticker3.PNG';
import planet from '../assets/designs/columbiaADI/websiteplanet.png';
import background from '../assets/designs/columbiaADI/websitebackgroundbrainstorm.png';
import mascot2027 from '../assets/designs/columbiaADI/websitemascot2027.png';
import teeFront from '../assets/designs/rrhsSTUCO/stucoteefront.PNG';
import teeBack from '../assets/designs/rrhsSTUCO/stucoteeback.PNG';
import postcard from '../assets/designs/personal/postcard.png';
import wallpaper from '../assets/designs/personal/wallpaperart.png';

export interface DesignPiece {
  image: ImageMetadata;
  alt: string;
  caption?: string;
}

export const INTRO =
  'Digital design is the other half of what I make! Check out some of the illustrations/assets I’ve made for clubs I’ve been involved in and a few just for me too.';

export const devfest = {
  heading: 'DevFest · Columbia ADI',
  blurb:
    'I’m Co-Lead of Design for DevFest, the annual hackathon run by Columbia’s Application Development Initiative. For our 2026 space-themed DevFest, I designed some artwork for our website and put together some stickers to give out to competitors on hackathon day. Beneath that, you can even find a sneak peek for our 2027 NYC underwater-themed DevFest mascot I’ve started brainstorming and working on.',
  stickers: [
    {
      image: sticker1,
      alt: 'Die-cut sticker of a blue lion with a fluffy white cloud mane, laughing with its eyes closed',
    },
    {
      image: sticker2,
      alt: 'Die-cut sticker of a robed figure with a laurel crown holding a star-tipped staff, a tiny ringed planet hovering above her open hand',
    },
    {
      image: sticker3,
      alt: 'Die-cut sticker of the blue lion lounging on a glowing purple planet circled by a ring and stars',
    },
  ] satisfies DesignPiece[],
  stickersCaption: 'Printed for DevFest 2026 competitors',
  planet: {
    image: planet,
    alt: 'Pastel gas giant striped in pinks, purples, and blues, with a swirling storm eye and glowing rings',
    caption: 'Live on the DevFest 2026 site',
  } satisfies DesignPiece,
  background: {
    image: background,
    alt: 'Website background concept: a dark sky filled with faint swirling patterns above pale rocky cliffs topped with mossy grass and a lone pine',
    caption: 'Site background brainstorm',
  } satisfies DesignPiece,
  mascot: {
    image: mascot2027,
    alt: 'Watercolor lion-mermaid mascot with a curly orange mane, a small blue crown, and a rainbow-scaled tail',
    caption: 'Sneak peek: DevFest 2027 mascot',
  } satisfies DesignPiece,
};

export const stuco = {
  heading: 'RRHS Student Council',
  blurb:
    'As Vice President of my high school’s Student Council, I designed our 2024–2025 officer shirts with a collage of our most memorable events and each officer’s role printed beneath the doodle.',
  front: {
    image: teeFront,
    alt: 'Shirt front on periwinkle: a hand-drawn dragon mascot circled by the words Student Council, RRHS 2024–25',
    caption: 'Front',
  } satisfies DesignPiece,
  back: {
    image: teeBack,
    alt: 'Shirt back on periwinkle: a white doodle collage of the year’s events — megaphone, homecoming crown, Met Gala trophy, Kiss-a-Pig piggy bank, and gifts — with the officer’s role printed beneath',
    caption: 'Back',
  } satisfies DesignPiece,
};

export const personal = {
  heading: 'Personal',
  blurb: 'Here are some recent personal designs I’ve created!',
  pieces: [
    {
      image: postcard,
      alt: 'Illustration of a girl with long dark hair listening to earbuds and hugging an open bag of chips beneath a string of party pennants, in a lavender frame',
      caption: 'A birthday postcard I made for my friend',
    },
    {
      image: wallpaper,
      alt: 'Two goldfish swimming between looping yellow ribbon swirls and small blue sparkles on a cream background',
      caption: 'A goldfish wallpaper for my desktop',
    },
  ] satisfies DesignPiece[],
};
