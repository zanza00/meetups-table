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

const printTable = ({
  from,
  to,
  events,
}: {
  from: Date;
  to: Date;
  events: EventData[];
}): string => `
## ${renderHeaderRange(from, to)}
| *Giorno*         | *Cosa*                                                                                                        | *Gruppo*        | *Chi*            | *Dove Quando* |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- | ------------- |
${events.map(x => renderRow(x))}
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
  const evntDate = ` ${DAYS_ITA[getDay(data.date)]} **${getDate(
    data.date,
  )}**`.padEnd(10, ' ');
  return `|${evntDate}| [Awesome Vue Vol.1](https://www.meetup.com/milano-front-end/events/254444645/)                                | Milano Frontend | Claudio Bisconti | mikamai 19:00 |
  `;
};

console.log(
  printTable({
    from: parse('20180924'),
    to: parse('20180929'),
    events: [
      {
        date: parse('20180924'),
        name: 'string',
        link: 'string',
        group: 'string',
        who: 'string',
        locationTime: 'string',
      },
    ],
  }),
);
