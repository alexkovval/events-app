import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notification } from '../types';

export async function showRSVPNotification(eventTitle: string) {
    await notifee.displayNotification({
        title: 'האירוע מתקרב!',
        body: `נרשמת ל"${eventTitle}" - אל תשכח להגיע!`,
        android: {
            channelId: 'default',
            pressAction: { id: 'default' },
        },
    });
    await saveNotification({
        id: new Date().toISOString(),
        title: 'האירוע מתקרב!',
        body: `נרשמת ל"${eventTitle}" - אל תשכח להגיע!`,
        date: new Date().toISOString(),
    });
}

export async function saveNotification(notification: Notification) {
  const existing = await getNotifications();
  const updated = [notification, ...existing];
  await AsyncStorage.setItem("RSVPnotifee", JSON.stringify(updated));
}

export async function getNotifications(): Promise<Notification[]> {
  const data = await AsyncStorage.getItem("RSVPnotifee");
  return data ? JSON.parse(data) : [];
}

export async function clearNotifications() {
  await AsyncStorage.removeItem("RSVPnotifee");
}