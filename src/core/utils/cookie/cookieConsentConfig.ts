import { CookieConsentConfig } from "vanilla-cookieconsent";
import de from "@/core/modules/app/i18n/locales/de.json";

const getConfig = ({ lang }: { lang: string }) => {
  const config: CookieConsentConfig = {
    // root: 'body',
    autoShow: true,
    // disablePageInteraction: true,
    // hideFromBots: true,
    // mode: 'opt-in',
    // revision: 0,

    cookie: {
      // name: 'cc_cookie',
      // domain: location.hostname,
      // path: '/',
      // sameSite: "Lax",
      // expiresAfterDays: 365,
    },

    /**
     * Callback functions
     */
    // onFirstConsent: ({ cookie }) => {
    //   console.log('onFirstConsent fired', cookie);
    // },

    // onConsent: ({ cookie }) => {
    //   console.log('onConsent fired!', cookie);
    // },

    // onChange: ({ changedCategories, changedServices }) => {
    //   console.log('onChange fired!', changedCategories, changedServices);
    // },

    // onModalReady: ({ modalName }) => {
    //   console.log('ready:', modalName);
    // },

    // onModalShow: ({ modalName }) => {
    //   console.log('visible:', modalName);
    // },

    // onModalHide: ({ modalName }) => {
    //   console.log('hidden:', modalName);
    // },

    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
      consentModal: {
        layout: "cloud",
        position: "bottom center",
        equalWeightButtons: false,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: false,
        flipButtons: true,
      },
    },
    categories: {
      necessary: {
        readOnly: true,
      },
      analytics: {
        enabled: true,
        services: {
          ga: {
            label: "Google Analytics",
            onAccept: () => {
              if (
                typeof window !== "undefined" &&
                typeof window.gtag === "function"
              ) {
                window.gtag("consent", "update", {
                  analytics_storage: "granted",
                });
              }
            },
            onReject: () => {
              if (
                typeof window !== "undefined" &&
                typeof window.gtag === "function"
              ) {
                window.gtag("consent", "update", {
                  analytics_storage: "denied",
                });
              }
            },
            cookies: [
              {
                name: /^(_ga|_gid|consent)/,
              },
            ],
          },
          gadmanager: {
            label: "Google Ad Manager",
            onAccept: () => {
              return;
            },
            onReject: () => {
              return;
            },
            cookies: [
              {
                name: "gclid",
              },
            ],
          },
          gadconversiontracker: {
            label: "Google Ads Conversion Tracking",
            onAccept: () => {
              return;
            },
            onReject: () => {
              return;
            },
            cookies: [
              {
                name: "gaconversion",
              },
            ],
          },
        },
      },
      marketing: {
        enabled: true,
        services: {
          fb: {
            label: "Facebook",
            onAccept: () => {
              return;
            },
            onReject: () => {
              return;
            },
            cookies: [
              {
                name: "fbclid",
              },
            ],
          },
        },
      },
      // other: {
      //   enabled: true,
      //   services: {
      //     chatgpt: {
      //       label: "ChatGPT",
      //       onAccept: () => {
      //         return
      //       },
      //       onReject: () => {
      //         return
      //       },
      //       cookies: [
      //         {
      //           name: "chatgpt",
      //         },
      //       ],
      //     },
      //   },
      // },
    },
    language: {
      default: lang,
      translations: {
        de: de.cookie,
      },
      // autoDetect: "browser",
    },
    disablePageInteraction: true,
  };

  return config;
};

export default getConfig;
