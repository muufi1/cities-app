// AddCityScreen.tsx

import { StyleSheet, View } from "react-native";
import { IconButton, Snackbar, Surface, Text, TextInput, useTheme } from "react-native-paper";
import { AddCityScreenNavigationProp, AddCityScreenProps } from "../../App";
import { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import CitiesContext from "../Context/CitiesContext";
import { SnackbarComponent } from "../Shared/SnackbarComponent";
import { useNavigation } from "@react-navigation/native";
import { HeaderIconButton } from "../Shared/HeaderIconButton";
// import { t } from "i18next";
import { useTranslation } from "react-i18next";

export const AddCityScreen: React.FC<AddCityScreenProps> = ({route}) => {

  const navigation = useNavigation<AddCityScreenNavigationProp>();
  const mode = route.params.mode;
  const city = route.params.city;

  const inputCityInitialValue = (mode === 'add') ? '' : city?.name;
  const inputCountryInitialValue = (mode === 'add') ? '' : city?.country;

  const [inputCityValue, setInputCityValue] = useState<string>(inputCityInitialValue!);
  const [inputCountryValue, setInputCountryValue] = useState<string>(inputCountryInitialValue!);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  const { addCity, editCity } = useContext(CitiesContext);
  const { colors } = useTheme();
  const inputRef = useRef<TextInput | null>(null);
  // console.log(`AddCityScreen route is ${JSON.stringify(route)}`);
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: titleText(),
      headerLeft: () => headerLeft,
    });
  }, [navigation]);

  const headerLeft = useMemo(() => (
    <HeaderIconButton 
      iconName="arrow-left"
      onPress={() => {
        navigation.navigate('CitiesScreen');
      }}
    />
  ), [navigation]);
  
  const titleText = () => {
    if (mode === 'edit') return t('EditCityTitle', {name: city?.name});
    else return t('AddNewCityTitle');
  };
  const okButtonIcon = mode === 'add' ? 'plus' : 'check'

  const addCityItem = () => {
    if (mode === 'edit' && city !== null) {
      editCity(city.id, inputCityValue, inputCountryValue);
    } else if ((!inputCityValue || inputCityValue.length === 0) || (!inputCountryValue || inputCountryValue.length === 0)) {
      setSnackbarVisible(true);
    } else {
      addCity(inputCityValue, inputCountryValue.toLowerCase());
      setInputCityValue('');
      setInputCountryValue('');
      inputRef.current?.focus();
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.contentUpper}>
        <Surface style={styles.surface}>
          <TextInput 
            label={t('CityNameLabel')}
            ref={inputRef}
            mode="outlined"
            style={styles.containerInputText}
            value={inputCityValue}
            placeholder={t('EnterNameHere')}
            onChangeText={(text) => setInputCityValue(text)}
            // onChangeText={(text) => {}}
          />
          <TextInput 
            label={t('CountryCodeLabel')}
            mode="outlined"
            style={styles.containerInputText}
            value={inputCountryValue}
            placeholder={t('EnterCountryHere')}
            onChangeText={(text) => setInputCountryValue(text)}
            // onChangeText={(text) => {}}
          />
          <View style={styles.buttonContainer}>
            <IconButton 
              icon={okButtonIcon}
              mode="contained"
              animated={true}
              onPress={() => addCityItem()}
              // onPress={() => {}}
            />
          </View>
       </Surface>
      </View>
      <View style={styles.contentLower}>
        <SnackbarComponent
          message={t('NameAndCountryMustBeGiven')}
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
        >
        </SnackbarComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contentUpper: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentLower: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInputText: {
    margin: 10,
    width: '80%',
    borderRadius: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
