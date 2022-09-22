import 'react-native-gesture-handler';

// React and React Native Imports
import { useContext } from 'react';
import { StyleSheet, Pressable, Button } from 'react-native';

// React Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Context hooks
import { AppStateContext, AppStateProvider } from './contexts/AppState';
import { QueueStateProvider } from './contexts/QueueState';

// Expo Imports
import { AntDesign } from '@expo/vector-icons';

// Screens
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import OtpScreen from './screens/OTPScreen';
import ProfileScreen from './screens/Profile';
import QueueInfoScreen from './screens/QueueInfo';
import SearchScreen from './screens/SearchScreen';
import SignupScreen from './screens/SignUp';

// Languages
import i18n from './languages/i18n';
import { useTranslation } from 'react-i18next';

// Create Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function UnAuthenticatedApp() {
  const { t, i18n } = useTranslation();
  return (
    <Drawer.Navigator initialRouteName={t("Login")}>
      <Drawer.Screen name="Login" component={LoginScreen} options={{headerShown: t("Login")}} />
      <Drawer.Screen name="Sign Up" component={SignupScreen} options={{headerShown: t("SignUp")}}/>
    </Drawer.Navigator>
  );
}

function AuthenticatedApp() {
  const { t, i18n } = useTranslation();
  return (
    <QueueStateProvider>
      <Drawer.Navigator initialRouteName={"Home"}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: t("Home")}}/>
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{headerShown: t("Profile")}}/>
      </Drawer.Navigator>
    </QueueStateProvider>

  )
}

function AppContent() {
  const [appState, setAppState] = useContext(AppStateContext);
  const { t, i18n } = useTranslation();

  return (
    <Stack.Navigator>
              {
          appState.isAuthenticated == false ? (
            <Stack.Screen
              name="StackLogin"
              component={UnAuthenticatedApp}
              options={{ headerShown: false }}
              />
          ) : (   
            <Stack.Screen
              name="StackHome"
              component={AuthenticatedApp}
              options={
                { 
                  headerShown: false,
                }
              }
            />
          )
        }
        <Stack.Screen name="OTP" component={OtpScreen} />
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: t("Search")}}/>
        <Stack.Screen name="QueueInfo" component={QueueInfoScreen} options={{headerShown: t("QueueInfo")}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (

    <AppStateProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AppStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileButton: {
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: "black"
  }
});
