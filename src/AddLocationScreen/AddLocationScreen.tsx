// AddLocationScreen.tsx

import { StyleSheet, View } from "react-native";
import { IconButton, Snackbar, Surface, Text, TextInput, useTheme } from "react-native-paper";
import { AddLocationScreenNavigationProp, AddLocationScreenProps } from "../../App";
import { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { SnackbarComponent } from "../Shared/SnackbarComponent";
import { useNavigation } from "@react-navigation/native";
import { HeaderIconButton } from "../Shared/HeaderIconButton";
// import { t } from "i18next";
import { useTranslation } from "react-i18next";
import CitiesContext from "../Context/CitiesContext";

export const AddLocationScreen: React.FC<AddLocationScreenProps> = ({route}) => {

  const navigation = useNavigation<AddLocationScreenNavigationProp>();
  const mode = route.params.mode;
  const city = route.params.city;
  const location = route.params.location;
  
  const inputLocationInitialValue = (mode === 'add') ? '' : location?.name;
  const inputInfoInitialValue = (mode === 'add') ? '' : location?.info;
  const [inputLocationValue, setInputLocationValue] = useState<string>(inputLocationInitialValue!);
  const [inputInfoValue, setInputInfoValue] = useState<string>(inputInfoInitialValue!);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  
  const { addLocation, editLocation } = useContext(CitiesContext);
  const { colors } = useTheme();
  const inputRef = useRef<TextInput | null>(null);
  const { t, i18n } = useTranslation();
  const titleText = () => {
    let text = t('AddNewLocationTitle', {name: city.name});
    if (city.locations && location && mode === 'edit') {
      // let idx = city.locations.findIndex((item) => item.id == location.id);
      // if (idx >= 0) {
      //   let name = city.locations[idx].name;
      //   text = t('EditLocationTitle', {name: name})
      // }
      text = t('EditLocationTitle', {name: location.name});
    }
    return text;
  }

  const addLocationItem = () => { 
    if (mode === 'edit' && location !== null) {
      editLocation(city, location.id, inputLocationValue, inputInfoValue);
    } else if ((!inputLocationValue || inputLocationValue.length === 0) ||
    (!inputInfoValue || inputInfoValue.length === 0)) {
      setSnackbarVisible(true);
    } else {
      addLocation(city, inputLocationValue, inputInfoValue);
      setInputLocationValue('');
      setInputInfoValue('');
      inputRef.current?.focus();
    }
  };

  const headerLeft = useMemo(() => (
    <HeaderIconButton 
      iconName="arrow-left"
      onPress={() => {
        navigation.navigate('LocationsScreen', {city: city});
      }}
    />
  ), [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: titleText(),
      headerLeft: () => headerLeft,
    });
  }, [navigation]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.contentUpper}>
        <Surface style={styles.surface}>
          <TextInput
            label={t('LocationNameLabel')}
            ref={inputRef}
            mode="outlined"
            style={styles.containerInputText}
            value={inputLocationValue}
            placeholder={t('EnterNameHere')}
            onChangeText={(text) => setInputLocationValue(text)}
          />
          <TextInput
            label={t('LocationInfoLabel')}
            mode="outlined"
            style={styles.containerInputText}
            value={inputInfoValue}
            placeholder={t('EnterDescriptionHere')}
            onChangeText={(text) => setInputInfoValue(text)}
          />
          <View style={styles.buttonContainer}>
            <IconButton
              icon={'plus'}
              mode="contained"
              animated={true}
              onPress={() => addLocationItem()}
            />
          </View>
        </Surface>
      </View>
      <View style={styles.contentLower}>
        <SnackbarComponent
          message="Name and city must be given"
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
        >
        </SnackbarComponent>
      </View>
    </View>
  )
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
