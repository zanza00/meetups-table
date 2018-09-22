import * as parse from 'date-fns/parse';
import { array } from 'fp-ts/lib/Array';
import { sequence } from 'fp-ts/lib/Traversable';
import { scrapeLink } from './scrape';
import { taskEither } from 'fp-ts/lib/TaskEither';

const sequenceTEA = sequence(taskEither, array);

function main(): void {
  const eventsSource: string[] = [
    'https://www.meetup.com/milano-front-end/events/254444645/',
    'https://www.eventbrite.com/e/registrazione-pybirra-sum-50264456342',
    'https://www.meetup.com/rust-language-milano/events/254832595/',
    'https://www.meetup.com/Avanscoperta-Meetups-Workshops-Courses/events/253415687/',
  ];

  const programs = eventsSource.map(source => scrapeLink(source));

  sequenceTEA(programs)
    .fold(err => console.log('error', err), data => console.log('data', data))
    .run();
}

main();
