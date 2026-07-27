export interface DemoVideoData {
  src: string;
  poster: string;
  label: string;
  /** Encoded pixel size — reserves layout space and caps display so nothing upscales. */
  width: number;
  height: number;
}

export interface ProjectLink {
  href: string;
  label: string;
  /** Primary links get the filled-button treatment. */
  primary?: boolean;
}

export interface FeaturedProject {
  title: string;
  blurb: string;
  tech: string[];
  links: ProjectLink[];
  videos: DemoVideoData[];
  offlineNote?: string;
}

export interface SecondaryProject {
  title: string;
  blurb: string;
  repoUrl: string;
}

export const featured: FeaturedProject[] = [
  {
    title: "Joyce's Closet",
    blurb:
      'Built after struggling to find an outfit became a constant hassle for me. You can upload your clothes, shuffle an outfit to find new combos, re-roll certain items, and save the combinations you love. This tested React app is now a part of my daily routine, and there are more features still coming!',
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand'],
    links: [
      { href: 'https://joyces-closet.vercel.app/', label: 'Live site', primary: true },
      { href: 'https://github.com/JunieMu/joyces-closet', label: 'GitHub' },
    ],
    videos: [
      {
        src: '/videos/closet.mp4',
        poster: '/videos/closet-poster.jpg',
        label: '',
        width: 360,
        height: 396,
      },
    ],
  },
  {
    title: 'The Humor Project',
    blurb:
      'Built for a humor-research course: can you teach an AI what’s funny? The rating app is the public voting site. It loads a study, shows one image and generated caption at a time, and writes every upvote/downvote into a shared Supabase research dataset. The pipeline workbench is where the humor model gets made: chain prompt steps into a “flavor,” run real generations against known images, read what came back, adjust a constraint, run it again.',
    tech: ['Next.js', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    links: [
      { href: 'https://github.com/JunieMu/TheHumorProject1', label: 'Rating app repo' },
      {
        href: 'https://github.com/JunieMu/TheHumorProjectHumorModel',
        label: 'Pipeline repo',
      },
    ],
    videos: [
      {
        src: '/videos/humor-rating.mp4',
        poster: '/videos/humor-rating-poster.jpg',
        label: 'Rating app',
        width: 1280,
        height: 672,
      },
      {
        src: '/videos/humor-pipeline.mp4',
        poster: '/videos/humor-pipeline-poster.jpg',
        label: 'Pipeline workbench',
        width: 1280,
        height: 892,
      },
    ],
    offlineNote:
      'The class’s shared Supabase instance has been retired, so signing in no longer works, but the videos show both apps running, and all the code is on GitHub.',
  },
];

export const secondary: SecondaryProject[] = [
  {
    title: 'CakeQuest',
    blurb:
      'A Java platformer where a cat gathers cake ingredients across three worlds of randomly placed obstacles.',
    repoUrl: 'https://github.com/JunieMu/CakeQuest',
  },
  {
    title: '2048',
    blurb:
      'A Java remake of 2048 with silly sound effects on every move and memes when you lose.',
    repoUrl: 'https://github.com/JunieMu/Game2048',
  },
];
