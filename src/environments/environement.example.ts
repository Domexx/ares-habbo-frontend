export const environment = {
  production: true,

  app: {
    url: 'http://localhost:4200',

    // API
    endpoint: 'https://api.ares.to',

    // Website
    hotelName: 'Ares',
    title: 'Ares ~ ',

    // Images
    imager: 'https://EXAMPLE/habbo-imaging/avatarimage?figure=',
    badgeParts: 'https://EXAMPLE/c_images/Badgeparts/generated/',
    album1584: 'https://EXAMPLE/c_images/album1584/',

    camera: {
      images: '',
      thumbnails: 'https://EXAMPLE/gamedata/camera/thumbnails/thumbnail_',
    },

    // Language
    defaultLang: 'en',
    useLang: 'de',

    // Components
    components: {
      dashboard: {
        hero: {
          date: 'dd.MM.yyyy',
          time: 'HH:mm',
        },
      },

      articles: {
        date: 'dd MMM yyyy',
      },

      article: {
        date: 'dd.MM.yyyy',
        time: 'HH:mm',
      },

      community: {
        guild: {
          date: 'dd.MM.yyyy',
        },
      },

      employees: {
        date: 'dd.MM.yyyy',
      },
    },
  },
};

export const client = {
  configurationUrl: '/assets/nitro/configuration.json',
  style: '/assets/nitro/styles.117f71878c7fce81beb9.css',
  runtime: '/assets/nitro/runtime.275acf6092026eba3cee.js',
  vendor: '/assets/nitro/vendor.a55199d777dfaf2b43f6.js',
  main: '/assets/nitro/main.18cd4f16ee9de33d287e.js',
  polyfills: '/assets/nitro/polyfills.91393bfe64f15481f242.js',
};
