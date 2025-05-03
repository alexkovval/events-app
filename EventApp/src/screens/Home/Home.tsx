import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetEventsQuery } from '../../redux/api/eventsApi';
import { getGreeting } from '../../helpers';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { EventCard } from '../../components/eventCard/EventCard';
import { styles } from './HomeStyle';
import Loader from '../../components/Loader/Loader';


export const HomeScreen: React.FC = () => {
  const { data: events = [], isLoading, isError } = useGetEventsQuery();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const greeting = getGreeting();

  const handlePress = (eventId: number) => {
    navigation.navigate('EventDetails', { eventId });
  };

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <Text style={styles.greeting}>{greeting} 👋</Text>
      <Pressable
        style={styles.alertsButton}
        onPress={() => navigation.navigate('Alerts')}
      >
        <Image
          source={require('../../assets/images/notification.png')}
          style={styles.alertsIcon}
        />
      </Pressable>
      <Text style={styles.description}>האפליקציה מציגה את כל האירועים בישראל</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          <EventCard event={item} onPress={() => handlePress(item.id)} />
        }
        contentContainerStyle={styles.list}
      />
    </View >
  );
};
