import * as parse from 'date-fns/parse';
import { EventDetails } from './model';
import { printTable, renderTable } from './render';
import { scrapeLink } from './scrape';

function main(): void {
  const eventsSource: string[] = [
    'https://www.meetup.com/milano-front-end/events/254444645/',
    'https://www.eventbrite.com/e/registrazione-pybirra-sum-50264456342',
    'https://www.meetup.com/rust-language-milano/events/254832595/',
    'https://www.meetup.com/Avanscoperta-Meetups-Workshops-Courses/events/253415687/',
  ];
  scrapeLink(eventsSource[0])
    .fold(err => console.log('error', err), data => console.log('data', data))
    .run();
}

main();
