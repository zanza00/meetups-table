import * as parse from 'date-fns/parse';
import { EventDetails } from './model';
import { printTable, renderTable } from './render';

function main(): void {
  const eventsSource: string[] = [
    'https://www.meetup.com/milano-front-end/events/254444645/',
    'https://www.eventbrite.com/e/registrazione-pybirra-sum-50264456342',
    'https://www.meetup.com/rust-language-milano/events/254832595/',
    'https://www.meetup.com/Avanscoperta-Meetups-Workshops-Courses/events/253415687/',
  ];

  //   const table = renderTable({
  //     from: parse('20180924'),
  //     to: parse('20180929'),
  //     events,
  //   });

  //   printTable(table);
}

main();
