// InfoScreen.tsx

import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import { InfoScreenNavigationProp, InfoScreenProps } from "../../App";
import { useLayoutEffect, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { HeaderIconButton } from "../Shared/HeaderIconButton";

export const InfoScreen: React.FC<InfoScreenProps> = ({route}) => {
  
  const navigation = useNavigation<InfoScreenNavigationProp>();
  const { colors } = useTheme();

  const { t } = useTranslation();
  const languages = [
    {code: 'fi', name: t('Finnish')},
    {code: 'en', name: t('English')},
  ];

  const headerLeft = useMemo(() => (
    <HeaderIconButton
      iconName="arrow-left"
      onPress={() => navigation.navigate('CitiesScreen')}/>
  ), [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('InfoScreenTitle'),
      headerLeft: () => headerLeft,
    })
  });

  return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.contentUpper}>
          <Surface style={styles.surface}>
            <Text style={styles.text}>
              Cities App v1.0
            </Text>
            <Text style={styles.text}>
              {t('AppInfoText')}
            </Text>
          </Surface>
        </View>
        <View style={styles.contentLower}>
          <Surface style={styles.surface}>
            {languages.map((lang) => {
              return (
                <Button
                key={lang.code}
                onPress={() => changeLanguage(lang.code, (err, t) => {
                  if (err) return console.log('something went wrong loading', err);
                  t('key');
                })}>
                  {t(lang.name)}
                </Button>
              )
            })}
          </Surface>
        </View>
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  text: {},
  menu: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});


