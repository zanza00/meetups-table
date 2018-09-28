import { array } from 'fp-ts/lib/Array';
import { sequence } from 'fp-ts/lib/Traversable';
import { taskEither } from 'fp-ts/lib/TaskEither';
import { parse } from 'date-fns';

import { scrapeLink } from './scrape';
import { fromParsedEventToEventDetails } from './conversion';
import { printTable, renderTable } from './render';
import { calcNextFridayFromMonday } from './utils';

const sequenceTEA = sequence(taskEither, array);

function main(): void {
  const fromTo = calcNextFridayFromMonday(
    parse('1/10/2018', 'dd/MM/yyyy', new Date()),
  );

  const eventsSource: string[] = [
    'https://www.meetup.com/milano-front-end/events/254444645/',
    'https://www.eventbrite.com/e/registrazione-pybirra-sum-50264456342',
    'https://www.meetup.com/rust-language-milano/events/254832595/',
    'https://www.meetup.com/Avanscoperta-Meetups-Workshops-Courses/events/253415687/',
  ];

  const programs = eventsSource.map(source =>
    scrapeLink(source).map(event => fromParsedEventToEventDetails(event)),
  );

  sequenceTEA(programs)
    .fold(
      err => console.log('error', err),
      events =>
        printTable(
          renderTable({
            events,
            ...fromTo,
          }),
        ),
    )
    .run();
}

main();
