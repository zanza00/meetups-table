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
  group: string;
};

export const EventbriteDetails = ({
  name,
  date,
  link,
  location,
  group,
}: {
  name: EventbriteDetails['name'];
  date: EventbriteDetails['date'];
  link: EventbriteDetails['link'];
  location: EventbriteDetails['location'];
  group: EventbriteDetails['group'];
}): ParsedEventDetails => ({
  type: 'EventbriteDetails',
  name,
  date,
  link,
  location,
  group,
});

export type MeetupDetails = {
  type: 'MeetupDetails';
  name: string;
  date: number;
  link: string;
  location: string;
  group: string;
};

export const MeetupDetails = ({
  name,
  date,
  link,
  location,
  group,
}: {
  name: MeetupDetails['name'];
  date: MeetupDetails['date'];
  link: MeetupDetails['link'];
  location: MeetupDetails['location'];
  group: MeetupDetails['group'];
}): ParsedEventDetails => ({
  type: 'MeetupDetails',
  name,
  date,
  link,
  location,
  group,
});

export type ParsedEventDetails = EventbriteDetails | MeetupDetails;
