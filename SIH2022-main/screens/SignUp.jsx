// React and React Native Imports
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, Pressable } from 'react-native';

// 3rd Party Imports
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';

function RegisterQueueUser() {
  const { t, i18n } = useTranslation();

  return (
    <View>
      <View style={styles.centerContainer}>
        <View style={styles.textInputView}><TextInput style={styles.textInput} placeholder={t('FirstName')}/></View>
        <View style={styles.textInputView}><TextInput style={styles.textInput} placeholder={t('LastName')}/></View>
        <View style={styles.textInputView}><TextInput style={styles.textInput} placeholder={t('MobileNumber')}/></View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => console.log("create acc")} style={styles.buttonStyle}>
          <Text>{t('Register')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function RegisterQueueCreator() {
  const { t, i18n } = useTranslation();

  return (
    <View>
      <View style={styles.centerContainer}>
      <View style={styles.textInputView}><TextInput style={styles.textInput} placeholder={t('FirstName')}/></View>
        <View style={styles.textInputView}><TextInput style={styles.textInput} placeholder={t('LastName')}/></View>
        <View style={styles.textInputView}><TextInput style={styles.textInput} placeholder={t('MobileNumber')}/></View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => console.log("create acc")} style={styles.buttonStyle}>
          <Text>{t('Register')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SignupScreen( { navigation } ) {
  const [userType, setUserType] = useState('1');
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/login_bg.jpg')} resizeMode="cover" style={styles.imageBackground} imageStyle={{opacity: 0.2}}>
            <View>
                <View style={styles.centerContainerHeader}>
                    <Text style={styles.Heading}>{t('CreateAccount')}</Text>
                </View>
                
                <View style={styles.dropdownContainer}>
                  {
                    // https://www.npmjs.com/package/react-native-element-dropdown
                  }

                  <Dropdown 
                    data={[
                      { label: t('Login'), value: '1' },
                      { label: t('Admin'), value: '2' },
                    ]}           
                    labelField="label"
                    valueField="value"
                    onChange={item => setUserType(item.value)}
                    style={styles.dropdown}
                    placeholder="User Type"
                    placeholderStyle={styles.dropdownPlaceholder}
                    value={{ label: t('Login'), value: '1' }}
                  />
                </View>
                
                {
                  userType == '1' ? <RegisterQueueUser/> : <RegisterQueueCreator/>
                }

            </View>
        </ImageBackground>
    </View>
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
    borderWidth: 1,
    padding: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    
  },

  imageBackground: {
    flex: 1,
    justifyContent: "center"
  },

  buttonContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "stretch",
    margin: 40,
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
