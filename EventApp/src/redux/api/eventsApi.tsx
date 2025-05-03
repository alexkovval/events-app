import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.2.2:5001',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getEvents: builder.query<any[], void>({
      query: () => '/events',
      providesTags: ['Event'],
    }),
    getEventById: builder.query<any, number>({
      query: (id) => `/events/${id}`,
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),
    rsvpToEvent: builder.mutation<void, { id: number; userId: number; guestsCount: number }>({
      query: ({ id, userId, guestsCount }) => ({
        url: `/events/${id}/rsvp`,
        method: 'POST',
        body: { userId, guestsCount },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event' }, { type: 'Event', id }],
    }),
    editRsvp: builder.mutation<void, { id: number; userId: number; guestsCount: number }>({
      query: ({ id, userId, guestsCount }) => ({
        url: `/events/${id}/rsvp`,
        method: 'PUT',
        body: { userId, guestsCount },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event' }, { type: 'Event', id }],
    }),
    deleteRsvp: builder.mutation<void, { id: number; userId: number }>({
      query: ({ id, userId }) => ({
        url: `/events/${id}/rsvp`,
        method: 'DELETE',
        body: { userId },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event' }, { type: 'Event', id }],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useRsvpToEventMutation,
  useEditRsvpMutation,
  useDeleteRsvpMutation
} = eventsApi;
