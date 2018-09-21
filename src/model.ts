export type EventDetails = {
  date: Date;
  name: string;
  link: string;
  group: string;
  who: string;
  locationTime: string;
};

export type EventbriteDetails = {
  type: 'EventbriteDetails';
  name: string;
  date: string;
  link: string;
  location: string;
  time: string;
};

export const EventbriteDetails = ({
  name,
  date,
  link,
  location,
  time,
}: {
  name: EventbriteDetails['name'];
  date: EventbriteDetails['date'];
  link: EventbriteDetails['link'];
  location: EventbriteDetails['location'];
  time: EventbriteDetails['time'];
}): ParsedEventDetails => ({
  type: 'EventbriteDetails',
  name,
  date,
  link,
  location,
  time,
});

export type MeetupDetails = {
  type: 'MeetupDetails';
};

export type ParsedEventDetails = EventbriteDetails | MeetupDetails;
