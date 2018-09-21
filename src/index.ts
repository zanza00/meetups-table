import * as parse from 'date-fns/parse';
import * as getMonth from 'date-fns/get_month';
import * as getDate from 'date-fns/get_date';
import * as getDay from 'date-fns/get_day';

const MONTHS_ITA = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];
const DAYS_ITA = [
  'PHAIL',
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
  'Domenica',
];

type EventData = {
  date: Date;
  name: string;
  link: string;
  group: string;
  who: string;
  locationTime: string;
};

const renderTable = ({
  from,
  to,
  events,
}: {
  from: Date;
  to: Date;
  events: EventData[];
}): string => `
## ${renderHeaderRange(from, to)}
| *Giorno*         | *Cosa*                                                                                                               | *Gruppo*        | *Chi*            | *Dove Quando* |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- | ------------- |
${events.map(x => renderRow(x)).join('\n')}
`;

const renderHeaderRange = (from: Date, to: Date): string => {
  const monthFrom = getMonth(from);
  const monthTo = getMonth(to);
  if (monthFrom === monthTo) {
    return `${getDate(from)} → ${getDate(to)} ${MONTHS_ITA[monthFrom]}`;
  }
  return `${getDate(from)} ${MONTHS_ITA[monthFrom]} → ${getDate(to)} ${
    MONTHS_ITA[monthFrom]
  }`;
};

const renderRow = (data: EventData): string => {
  const { date, group, link, locationTime, name, who } = data;
  const evntDate = ` ${DAYS_ITA[getDay(date)]} **${getDate(date)}**`.padEnd(18);
  const eventData = ` [${name}](${link})`.padEnd(118);
  return `|${evntDate}|${eventData}| ${group.padEnd(16)}| ${who.padEnd(
    16,
  )} | ${locationTime.padEnd(13)} |`;
};

function printTable(table: string): void {
  console.log(table);
}

function main(): void {
  const events: EventData[] = [
    {
      date: parse('20180924'),
      name: 'Awesome Vue Vol.1',
      link: 'https://www.meetup.com/milano-front-end/events/254444645/',
      group: 'Milano Frontend',
      who: 'Claudio Bisconti',
      locationTime: 'mikamai 19:00',
    },
    {
      date: parse('20180925'),
      name: 'PyBirra - Sum',
      link:
        'https://www.eventbrite.com/e/registrazione-pybirra-sum-50264456342',
      group: 'Python Milano',
      who: 'birra',
      locationTime: 'Baladin 19:00',
    },
    {
      date: parse('20180926'),
      name: '8080 emulator in Rust to play Space Invaders',
      link: 'https://www.meetup.com/rust-language-milano/events/254832595/',
      group: 'Rust Milano',
      who: "Michele D'Amico",
      locationTime: 'mikamai 19:00',
    },
    {
      date: parse('20180927'),
      name: 'An Evening with... Matteo Baglini',
      link:
        'https://www.meetup.com/Avanscoperta-Meetups-Workshops-Courses/events/253415687/',
      group: 'Avanscoperta',
      who: 'Matteo Baglini',
      locationTime: 'buildo 19:00',
    },
  ];

  const table = renderTable({
    from: parse('20180924'),
    to: parse('20180929'),
    events,
  });

  printTable(table);
}

main();
