export type Section = 'about' | 'projects' | 'experience';
export type Locale = 'en' | 'fr';

export const routes: Record<Section, string> = {
  about: '/',
  projects: '/projects',
  experience: '/experience',
};

export const navigation: Section[] = ['about', 'projects', 'experience'];

export const baseUrl = 'https://reobin.dev';

export const seo = {
  defaultTitle: 'reobin.dev',
  titleTemplate: '%s - reobin.dev',
  defaultDescription: 'Big fan of the web, old tech, and coffee.',
  image: {
    src: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'reobin.dev window with pixel portrait',
  },
  pages: {
    about: {
      title: 'reobin.dev',
      description: 'Big fan of the web, old tech, and coffee.',
    },
    projects: {
      title: 'Projects',
      description: 'Big fan of the web, old tech, and coffee.',
    },
    experience: {
      title: 'Work',
      description: 'Big fan of the web, old tech, and coffee.',
    },
  },
  notFound: {
    title: 'Not Found',
    description: 'Big fan of the web, old tech, and coffee.',
  },
} as const;

export const content = {
  links: [
    {
      label: 'github.com/reobin',
      href: 'https://github.com/reobin',
      icon: '<>',
    },
    {
      label: 'linkedin.com/in/reobin',
      href: 'https://www.linkedin.com/in/reobin',
      icon: 'in',
    },
    { label: 'hey@reobin.dev', href: 'mailto:hey@reobin.dev', icon: '@' },
  ],
  locales: {
    en: {
      nav: {
        about: 'About',
        projects: 'Projects',
        experience: 'Work',
      },
      navShort: {
        about: 'About',
        projects: 'Projects',
        experience: 'Work',
      },
      settings: {
        night: 'Night',
      },
      a11y: {
        displaySettings: 'Display settings',
        language: 'Language',
        pageContent: 'Page content',
        sections: 'Sections',
        window: 'Window',
        skipToContent: 'Skip to content',
        scrollControls: 'Content scroll controls',
        scrollUp: 'Scroll up',
        scrollDown: 'Scroll down',
      },
      notFound: {
        goHome: 'Go home',
      },
      about: {
        tagline: 'Big fan of the web, old tech, and coffee.',
        links: 'Links',
      },
      projects: {
        name: 'Name',
        rows: [
          {
            name: 'vimcolorschemes',
            href: 'https://github.com/vimcolorschemes/vimcolorschemes',
            icon: 'swatches',
            description:
              'Vim and Neovim color scheme gallery, previews, and tooling. 1k+ stars.',
          },
          {
            name: 'typewritten',
            href: 'https://github.com/reobin/typewritten',
            icon: 'terminal',
            description: 'Minimal zsh prompt theme. 900+ stars.',
          },
        ],
      },
      experience: {
        role: 'Role',
        period: 'Period',
        rows: [
          {
            role: 'Web Developer',
            org: 'POAP - The Proof of Attendance Protocol',
            period: 'Nov 2023 - Present',
            description: '',
          },
          {
            role: 'Team Lead Web Developer',
            org: 'nventive',
            period: 'Mar 2019 - Nov 2023',
            description: '',
          },
          {
            role: 'Software Developer',
            org: 'SSQ Insurance',
            period: 'Mar 2014 - Aug 2015',
            description: '',
          },
        ],
      },
    },
    fr: {
      nav: {
        about: 'Bio',
        projects: 'Projets',
        experience: 'Expérience',
      },
      navShort: {
        about: 'Bio',
        projects: 'Projets',
        experience: 'Exp.',
      },
      settings: {
        night: 'Nuit',
      },
      a11y: {
        displaySettings: "Paramètres d'affichage",
        language: 'Langue',
        pageContent: 'Contenu de la page',
        sections: 'Sections',
        window: 'Fenêtre',
        skipToContent: 'Aller au contenu',
        scrollControls: 'Contrôles de défilement du contenu',
        scrollUp: 'Faire défiler vers le haut',
        scrollDown: 'Faire défiler vers le bas',
      },
      notFound: {
        goHome: "Retour à l'accueil",
      },
      about: {
        tagline: 'Grand fan du web, des vieilles technologies, et du café.',
        links: 'Liens',
      },
      projects: {
        name: 'Nom',
        rows: [
          {
            name: 'vimcolorschemes',
            href: 'https://github.com/vimcolorschemes/vimcolorschemes',
            icon: 'swatches',
            description:
              'Galerie, aperçus et outils pour thèmes de couleurs Vim et Neovim. 1k+ étoiles.',
          },
          {
            name: 'typewritten',
            href: 'https://github.com/reobin/typewritten',
            icon: 'terminal',
            description: 'Thème de prompt zsh minimal. 900+ étoiles.',
          },
        ],
      },
      experience: {
        role: 'Poste',
        period: 'Période',
        rows: [
          {
            role: 'Développeur web',
            org: 'POAP - The Proof of Attendance Protocol',
            period: 'Nov. 2023 - présent',
            description: '',
          },
          {
            role: 'Team Lead développeur web',
            org: 'nventive',
            period: 'Mars 2019 - nov. 2023',
            description: '',
          },
          {
            role: 'Développeur logiciel',
            org: 'SSQ Assurance',
            period: 'Mars 2014 - août 2015',
            description: '',
          },
        ],
      },
    },
  },
} as const;

export type Content = typeof content;
