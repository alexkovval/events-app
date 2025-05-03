import React, { useEffect, useState } from 'react';
import { Linking, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import IntroScreen from './components/introScreen/IntroScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { LoginNavigation } from './navigation/LoginNavigation';
import { HomeNavigation } from './navigation/HomeNavigations';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useAppSelector } from './redux/hooks';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { getRouteFromUrl } from './helpers';



export function App(): React.JSX.Element {
  const { token, expiresAt, user } = useAppSelector((state) => state.auth);
  const [introFinished, setIntroFinished] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  const [initialLink, setInitialLink] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    SplashScreen.hide();

    async function setupChannel() {
      await notifee.requestPermission();

      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }
    setupChannel();

    const getLink = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        setInitialLink(url);
      }
    };
    getLink();
  }, []);
 
  useEffect(() => {
    if (isTokenValid && initialLink) {
      const route = getRouteFromUrl(initialLink);
      if (route) {
        navigation.navigate(route.name as any, route.params);
      }
    }
  }, [isTokenValid, initialLink]); 

  useEffect(() => {
    if (expiresAt && Date.now() < expiresAt) setIsTokenValid(true);
    else setIsTokenValid(false);
  }, [token]);

  const onIntroFinished = () => {
    setIntroFinished(true);
  };


  return (
    <View style={{ flex: 1 }}>
      {introFinished ? (
        isTokenValid ? <HomeNavigation /> : <LoginNavigation />
      ) : (
        <IntroScreen onVideoEnd={onIntroFinished} />
      )}
    </View>
  );
}

export function AppWrapper(): React.JSX.Element {

  const linking = {
    prefixes: ['myapp://'],
    config: {
      screens: {
        Home: 'home',
        EventDetails: 'event/:id',
        Alerts: 'alerts',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationContainer>
  );
}
