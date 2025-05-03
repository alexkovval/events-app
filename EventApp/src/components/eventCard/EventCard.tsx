import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './EventCardStyle';
import { Event } from '../../types';

type Props = {
    event: Event;
    onPress: () => void;
};

export const EventCard: React.FC<Props> = ({ event, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.details}>
                    {event.location}
                </Text>
                <Text style={styles.details}>
                    {new Date(event.date).toLocaleDateString('en-GB')} {new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
            <Image source={require('../../assets/images/people.jpg')} style={styles.image} />
            {event.rsvpCount > 0 && (
                <Text style={styles.details}>
                    {event.rsvpCount} אנשים כבר נרשמו
                </Text>
            )}
        </TouchableOpacity>
    );
};
