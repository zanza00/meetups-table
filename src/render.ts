import * as getMonth from 'date-fns/get_month';
import * as getDate from 'date-fns/get_date';
import * as getDay from 'date-fns/get_day';

import { MONTHS_ITA, DAYS_ITA } from './constants';
import { EventDetails } from './model';

export function renderTable({
  from,
  to,
  events,
}: {
  from: Date;
  to: Date;
  events: EventDetails[];
}): string {
  return `
  ## ${renderHeaderRange(from, to)}
  | *Giorno*         | *Cosa*                                                                                                               | *Gruppo*        | *Chi*            | *Dove Quando* |
  | ---------------- | -------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- | ------------- |
  ${events.map(x => renderRow(x)).join('\n')}
  `;
}

function renderHeaderRange(from: Date, to: Date): string {
  const monthFrom = getMonth(from);
  const monthTo = getMonth(to);
  if (monthFrom === monthTo) {
    return `${getDate(from)} → ${getDate(to)} ${MONTHS_ITA[monthFrom]}`;
  }
  return `${getDate(from)} ${MONTHS_ITA[monthFrom]} → ${getDate(to)} ${
    MONTHS_ITA[monthFrom]
  }`;
}

function renderRow(data: EventDetails): string {
  const { date, group, link, locationTime, name, who } = data;
  const evntDate = ` ${DAYS_ITA[getDay(date)]} **${getDate(date)}**`.padEnd(18);
  const eventData = ` [${name}](${link})`.padEnd(118);
  return `|${evntDate}|${eventData}| ${group.padEnd(16)}| ${who.padEnd(
    16,
  )} | ${locationTime.padEnd(13)} |`;
}

export function printTable(table: string): void {
  console.log(table);
}
