import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { t, changeLanguage } from 'i18next';

const LanguageMenu = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View style={styles.menu}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {
            changeLanguage('fi');
          }} title={t('Finnish')}/>
          <Menu.Item onPress={() => {
            changeLanguage('en');
          }} title={t('English')}/>
        </Menu>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  menu: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default LanguageMenu;
