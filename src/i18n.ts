import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        climateDashboard: "Climate Normals Dashboard",
        subtitle: "Monthly Averages 1991–2020, Ottawa",
        city: "City",
        meanMax: "Mean Max",
        meanMin: "Mean Min",
        totalPrecip: "Total Precip (mm)",
        selectCity: "Select city",
        ottawa: "Ottawa",
        toronto: "Toronto",
      },
    },
    fr: {
      translation: {
        climateDashboard: "Tableau de bord des normales climatiques",
        subtitle: "Moyennes mensuelles 1991–2020, Ottawa",
        city: "Ville",
        meanMax: "Max Moyenne",
        meanMin: "Min Moyenne",
        totalPrecip: "Précipitations totales (mm)",
        selectCity: "Choisissez une ville",
        ottawa: "Ottawa",
        toronto: "Toronto",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;