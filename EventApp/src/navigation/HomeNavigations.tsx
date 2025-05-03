import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventDetails } from '../screens/EventDetails/EventDetails';
import { HomeScreen } from '../screens/Home/Home';
import AlertsScreen from '../screens/Notifications/Notifications';

export type RootStackParamList = {
    Home: undefined;
    EventDetails: { eventId: number };
    Alerts: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
            <Stack.Screen name="Alerts" component={AlertsScreen} />
        </Stack.Navigator>
    );
};