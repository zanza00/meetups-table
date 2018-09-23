import { getHours, getMinutes, parse } from 'date-fns';

import {
  ParsedEventDetails,
  EventDetails,
  EventbriteDetails,
  MeetupDetails,
} from './model';

export function fromParsedEventToEventDetails(
  event: ParsedEventDetails,
): EventDetails {
  switch (event.type) {
    case 'EventbriteDetails':
      return fromEventbriteToEventDetails(event);
    case 'MeetupDetails':
      return fromMeetupToEventDetails(event);
  }
}

function fromEventbriteToEventDetails(event: EventbriteDetails): EventDetails {
  const date = parse(
    event.date,
    'yyyy-MM-ddTkk:mm:ssxxxx',
    new Date(event.date),
  );
  const hours = `${getHours(date)}:${getMinutes(date)
    .toString()
    .padEnd(2, '0')}`;

  return {
    date: date,
    group: event.group,
    link: event.link,
    locationTime: `${event.location} ${hours}`,
    name: event.name,
    who: '',
  };
}

function fromMeetupToEventDetails(event: MeetupDetails): EventDetails {
  const date = new Date(event.date);
  const hours = `${getHours(date)}:${getMinutes(date)
    .toString()
    .padEnd(2, '0')}`;
  return {
    date,
    group: event.group,
    link: event.link,
    locationTime: `${event.location} ${hours}`,
    name: event.name,
    who: '',
  };
}
