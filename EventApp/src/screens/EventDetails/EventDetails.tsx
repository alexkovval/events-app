import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { styles } from './EventDetailsStyle';
import { RootState } from '../../redux/store';
import { useDeleteRsvpMutation, useEditRsvpMutation, useGetEventByIdQuery, useRsvpToEventMutation } from '../../redux/api/eventsApi';
import { Attendee } from '../../types';
import { showRSVPNotification } from '../../notifications/RsvpNotifications';
import Loader from '../../components/Loader/Loader';

export const EventDetails = () => {
    const route = useRoute<any>();
    const navigate = useNavigation();
    const { id } = route.params as { id: string };
    const { eventId } = route.params;
    const { data: event } = useGetEventByIdQuery(id || eventId);
    const { user } = useSelector((state: RootState) => state.auth);
    const [guests, setGuests] = useState('0');
    const [existingAttendee, setExistingAttendee] = useState(false);
    const [rsvpToEvent] = useRsvpToEventMutation();
    const [editRsvp] = useEditRsvpMutation();
    const [deleteRsvp] = useDeleteRsvpMutation();
  
    useEffect(() => {
        if (event && user) {
            const exists = event?.attendees?.some((att: Attendee) => {
                setGuests(att.guestsCount.toString());
                return att.userId === user.id
            });
            setExistingAttendee(exists || false);
        }
    }, [event, user]);


    const handleRSVP = async () => {
        try {
            await rsvpToEvent({ id: eventId, userId: user?.id || 0, guestsCount: Number(guests) });
            setGuests('0');
            await showRSVPNotification(event.title);
        } catch (err) {
            console.error('Error', err);
        }
    };

    const handleEdit = async () => {
        await editRsvp({ id: eventId, userId: user?.id || 0, guestsCount: Number(guests) });
        setGuests('0');
    };

    const handleDelete = async () => {
        await deleteRsvp({ id: eventId, userId: user?.id || 0 });
        setGuests('0');
    };

    if (!event) return <Loader loading={true} />;

    return (
        <View style={styles.container}>
            <View style={styles.closeButton}>
                <Button
                    title="✕"
                    onPress={() => navigate.goBack()}
                    color="gray"
                />
            </View>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.text}>תאריך: {event.date}</Text>
            <Text style={styles.text}>מיקום: {event.location}</Text>
            <Text style={styles.text}>מספר נרשמים: {event.rsvpCount}</Text>

            <Text style={styles.text}>כמה אורחים את/ה מביא/ה:</Text>
            <TextInput
                value={guests}
                onChangeText={setGuests}
                keyboardType="numeric"
                style={styles.input}
            />

            {!existingAttendee ? (
                <Button title="להירשם" onPress={handleRSVP} />
            ) : (
                <>
                    <Button title="ערוך הרשמה" onPress={handleEdit} />
                    <View style={{ marginTop: 10 }} />
                    <Button title="בטל הרשמה" onPress={handleDelete} color="red" />
                </>
            )}
        </View>
    );
};

