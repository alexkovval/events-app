
export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Alerts: undefined;
    EventDetails: { eventId: number };
};

export type Event = {
    id: number;
    title: string;
    date: string;
    location: string;
    rsvpCount: number;
    attendees: Attendee[];
};

export type Attendee = {
    userId: number;
    guestsCount: number;
}

export interface Notification {
    id: string;
    title: string;
    body: string;
    date: string;
  }