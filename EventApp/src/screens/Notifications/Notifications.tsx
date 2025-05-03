import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { styles } from './NotificationsStyle';
import { getNotifications } from '../../notifications/RsvpNotifications';
import { Notification } from '../../types';
import { useNavigation } from '@react-navigation/native';

const AlertsScreen = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const navigate = useNavigation();

    useEffect(() => {
        const fetchNotifications = async () => {
            const data = await getNotifications();
            setNotifications(data);
        };
        fetchNotifications();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.closeButton}>
                <Button
                    title="✕"
                    onPress={() => navigate.goBack()}
                    color="gray"
                />
            </View>
            <Text style={styles.title}>התראות</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text>{item.body}</Text>
                        <Text style={styles.date}>{new Date(item.date).toLocaleString('he-IL')}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default AlertsScreen;