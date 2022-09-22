// React and React Native Imports
import { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, ImageBackground, View, TextInput, Pressable, Button } from 'react-native';

// Context Hooks
import { AppStateContext } from '../contexts/AppState';

// 3rd Party Imports
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';

// Source code
import authenticate from '../src/auth';
  
function auth (number, userType, appState, setAppState) {
    let user = authenticate(number, userType);
    if(user) {
        setAppState({
            ...appState,
            isAuthenticated: true,
            firstName: user.firstName,
            lastName: user.lastName
        })
    } else {
        console.log("no", number, userType)
    }
}

export default function LoginScreen( { navigation } ) {
    const [appState, setAppState] = useContext(AppStateContext);
    const [number, setNumber] = useState();
    const [userType, setUserType] = useState(1);
    const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/login_bg.jpg')} resizeMode="cover" style={styles.imageBackground} imageStyle={{opacity: 0.2}}>
            <View>

                <View style={styles.centerContainerHeader}>
                    <Text style={styles.Heading}>{t('Login')}</Text>
                </View>

                <Button
                  onPress={() => i18n.changeLanguage('hi')}
                  title="change lang"
                />
                
                <View style={styles.centerContainer}>
                    <View style={styles.textInputView}><TextInput style={styles.textInput} placeholder={t('PhoneNumber')} onChangeText={text => setNumber(text)} /></View>
                </View>

                <View style={styles.dropdownContainer}>
                  { /* https://www.npmjs.com/package/react-native-element-dropdown */ }

                  <Dropdown 
                    data={
                      [
                        { label: t('User'), value: 1 },
                        { label: t('Admin'), value: 2 },
                        { label: t('SuperAdmin'), value: 3 },
                      ]
                    }           
                    labelField="label"
                    valueField="value"
                    onChange={item => setUserType(item.value)}
                    style={styles.dropdown}
                    placeholder="User Type"
                    placeholderStyle={styles.dropdownPlaceholder}
                    value={{ label: t('User'), value: 1 }}
                  />
                </View>

                <Button
                    title="temp login"
                    onPress={
                        () => {
                            auth(number, userType, appState, setAppState);
                        }
                    }
                />
                
                <View style={styles.buttonContainer}>
                  <Pressable 
                    onPress={
                      () => {
                        navigation.navigate("OTP");
                      }
                    } 
                    style={styles.buttonStyle}
                  >

                      <Text>{t('SendOTP')}</Text>
                  </Pressable>
                </View>

            </View>
        </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 40,
    marginTop: 3,
    alignItems: "stretch",
  },

  centerContainer: {
    justifyContent: "center",
    paddingTop: 5,
    margin: 10,
  },

  centerContainerHeader: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  Heading: {
    paddingTop: 10,
    fontSize: 30,
    fontWeight: "bold",
  },

  textInputView: {
    padding: 5,
    alignContent: "center",
    marginTop: 10,
  },

  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 17
  },

  imageBackground: {
    flex: 1,
    justifyContent: "center"
  },

  buttonContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "stretch",
    margin: 30,
    marginTop: 15,
  },

  buttonStyle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#F7F7F7',
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "stretch",
    margin: 10,
    padding: 5,
    alignContent: "center",
    marginTop: 10,
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  dropdownPlaceholder: {
    color: 'gray',
    fontSize: 17,
  }
})
