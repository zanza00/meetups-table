import * as cheerio from 'cheerio';
import axios, { AxiosResponse } from 'axios';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

import { ParsedEventDetails, EventbriteDetails, MeetupDetails } from './model';

const meetupRegex = /meetup/g;

export function scrapeLink(link: string): TaskEither<any, ParsedEventDetails> {
  return tryCatch(
    () =>
      axios
        .get(link)
        .then(
          res =>
            meetupRegex.test(link)
              ? extractDetailsFromMeetupResponse(link, res)
              : extractDetailsFromEventrbriteResponse(link, res),
        ),
    reason => reason,
  );
}

function extractDetailsFromMeetupResponse(
  link: string,
  response: AxiosResponse<any>,
) {
  const $ = cheerio.load(response.data);
  const d = parseInt(
    $('div.eventTimeDisplay.eventDateTime--hover time').attr().datetime,
    10,
  );

  const parsedMeetupData = {
    name: $('.pageHead-headline').text(),
    date: d,
    link,
    location: $('.venueDisplay > address:nth-child(1) > p:nth-child(1)').text(),
  };

  return MeetupDetails(parsedMeetupData);
}

function extractDetailsFromEventrbriteResponse(
  link: string,
  response: AxiosResponse<any>,
): ParsedEventDetails {
  const $ = cheerio.load(response.data);
  const fullDate = $('.event-details__data').contents()[1].attribs.content;
  const parsedEventbriteData = {
    name: $('.listing-hero-title').text(),
    group: $('.listing-organizer-name ')
      .text()
      .replace(/\n/g, '')
      .replace(/\t/g, '')
      .replace(/organizzato da /g, ''),
    date: fullDate,
    link,
    location: $('div.event-details__data:nth-child(4) > p:nth-child(1)').text(),
  };
  return EventbriteDetails(parsedEventbriteData);
}
