// React and React Native Imports
import { useContext } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

// Import contexts
import { AppStateContext } from '../contexts/AppState';

// 3rd Party Imports
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen( { route, navigation } ) {
    const [appState, setAppState] = useContext(AppStateContext);
    const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 24}}>{appState.firstName} {appState.lastName}</Text>

        <Dropdown 
            data={
                [
                    { label: t('English'), value: 'en' },
                    { label: t('Hindi'), value: 'hi' },
                ]
            }           
            labelField="label"
            valueField="value"
            onChange={
                (item) => {
                    setAppState({...appState, language: item.value});
                    i18n.changeLanguage(item.value);
                }
            }
            style={styles.dropdown}
            placeholder="Select Language"
            placeholderStyle={styles.dropdownPlaceholder}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "90%"
  },

  dropdownPlaceholder: {
    color: 'gray',
    fontSize: 17,
  }
})
