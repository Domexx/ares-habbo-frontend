// Don't forget to rename `example.environment.ts` to environment.ts

export const environment = {
  production: true,

  app: {
    url: 'http://yourdomain.com',

    // API
    endpoint: 'https://api.ares.to',

    // Website
    hotelName: 'Ares',
    title: 'Ares ~ ',

    swf: 'https://swf.ares.to',

    // Images
    imager: 'https://www.habbo.com/habbo-imaging/avatarimage?figure=',
    badgeParts: 'https://yourdomain.com/swf/c_images/Badgeparts/generated/',
    album1584: 'https://swf.ares.to/c_images/album1584/',

    camera: {
      images: '',
      thumbnails:
        'https:/yourdomain.com/swf/gamedata/camera/thumbnails/thumbnail_',
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
  swf: `${environment.app.swf}/gordon/PRODUCTION-201601012205-226667486/Habbo.swf`,

  vars: {
    'client.allow.cross.domain': '1',
    'client.notify.cross.domain': '1',
    'connection.info.host': 'ip',
    'connection.info.port': 'port',
    'site.url': environment.app.url,
    'url.prefix': environment.app.url,
    'client.reload.url': `${environment.app.url}/client`,
    'client.fatal.error.url': `${environment.app.url}/client`,
    'client.connection.failed.url': `${environment.app.url}/client`,
    'external.override.texts.txt': `${environment.app.swf}/gamedata/override/external_flash_override_texts.txt`,
    'external.override.variables.txt': `${environment.app.swf}/gamedata/override/external_override_variables.txt`,
    'external.variables.txt': `${environment.app.swf}/gamedata/external_variables.txt?tdest`,
    'external.texts.txt': `${environment.app.swf}/gamedata/external_flash_texts.txt`,
    'external.figurepartlist.txt': `${environment.app.swf}/gamedata/figuredata.xml?test`,
    'flash.dynamic.avatar.configuration': `${environment.app.swf}/gamedata/figuremap.xml`,
    'productdata.load.url': `${environment.app.swf}/gamedata/productdata.txt`,
    'furnidata.load.url': `${environment.app.swf}/gamedata/furnidata.xml?ss`,
    'use.sso.ticket': '1',
    'sso.ticket': '',
    'processlog.enabled': '1',
    'flash.client.url': `${environment.app.swf}/gordon/PRODUCTION-201601012205-226667486/`,
    'diamonds.enabled': '1',
    'logout.url': `${environment.app.url}/logout`,
    spaweb: '1',
  },

  params: {
    base: `${environment.app.swf}/gordon/PRODUCTION-201601012205-226667486/`,
    allowScriptAccess: 'always',
    wmode: 'opaque',
  },
};
