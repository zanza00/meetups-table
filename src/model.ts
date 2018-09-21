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
};

export const EventbriteDetails = ({
  name,
  date,
  link,
  location,
}: {
  name: EventbriteDetails['name'];
  date: EventbriteDetails['date'];
  link: EventbriteDetails['link'];
  location: EventbriteDetails['location'];
}): ParsedEventDetails => ({
  type: 'EventbriteDetails',
  name,
  date,
  link,
  location,
});

export type MeetupDetails = {
  type: 'MeetupDetails';
  name: string;
  date: number;
  link: string;
  location: string;
};

export const MeetupDetails = ({
  name,
  date,
  link,
  location,
}: {
  name: MeetupDetails['name'];
  date: MeetupDetails['date'];
  link: MeetupDetails['link'];
  location: MeetupDetails['location'];
}): ParsedEventDetails => ({
  type: 'MeetupDetails',
  name,
  date,
  link,
  location,
});

export type ParsedEventDetails = EventbriteDetails | MeetupDetails;
