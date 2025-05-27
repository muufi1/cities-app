import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      welcomeMessage: "Welcome to React and react-i18next",
      SomethingWentWrong: "Something went wrong!",
      CitiesAppTitle: "Cities App",
      YouDontHaveCities: "You don\'t have any cities yet!",
      AddNewCityTitle: "Add new City",
      EditCityTitle: "Edit City: {{name}}",
      CityNameLabel: "City Name",
      EnterNameHere: "Enter name here",
      CountryCodeLabel: "Country Code",
      EnterCountryHere: "2-char country code here",
      NameAndCountryMustBeGiven: "Name and Country must be given",
      CityInCountryExists: "City {{city}} in country {{country}} already exists!",
      LocationsInCityTitle: "Locations in {{name}}",
      YouDontHaveLocations: "You don\'t have any locations yet!",
      AddNewLocationTitle: "Add new Location in {{name}}",
      EditLocationTitle: "Edit Location: {{name}}",
      LocationNameLabel: "Location name",
      LocationInfoLabel: "Location info",
      EnterDescriptionHere: "Enter description here",
      LocationExists: "Location {{name}} ({{info}}) already exists!",
      InfoScreenTitle: "About the App",
      AppInfoText: "This app was developed during the Hybrid Mobile Programming course in spring 2025.",
      Finnish: "Finnish",
      English: "English",
    }
  },
  fi: {
    translation: {
      SomethingWentWrong: "Jotain meni pieleen!",
      CitiesAppTitle: "Kaupungit",
      YouDontHaveCities: "Aloita lisäämällä kaupunki!",
      AddNewCityTitle: "Lisää kaupunki",
      EditCityTitle: "Muokkaa kaupunkia: {{name}}",
      CityNameLabel: "Kaupungin nimi",
      EnterNameHere: "Syötä nimi",
      CountryCodeLabel: "Maakoodi",
      EnterCountryHere: "2-merkkinen maakoodi",
      NameAndCountryMustBeGiven: "Nimi ja maakoodi tarvitaan",
      CityInCountryExists: "Kaupunki {{city}} maassa {{country}} on jo lisätty!",
      LocationsInCityTitle: "Kohteet kaupungissa {{name}}",
      YouDontHaveLocations: "Kohteita ei ole lisätty vielä!",
      AddNewLocationTitle: "Lisää kohde kaupunkiin {{name}}",
      EditLocationTitle: "Muokkaa kohde: {{name}}",
      LocationNameLabel: "Kohteen nimi",
      LocationInfoLabel: "Kohteen kuvaus",
      EnterDescriptionHere: "Syötä kuvaus",
      LocationExists: "Kohde {{name}} ({{info}}) on jo lisätty!",
      InfoScreenTitle: "Tietoja sovelluksesta",
      AppInfoText: "Tämä sovellus kehitettiin hybridimobiiliohjelmoinnin kurssilla keväällä 2025.",
      Finnish: "suomi",
      English: "englanti",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fi", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
