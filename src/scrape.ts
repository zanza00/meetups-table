import * as cheerio from 'cheerio';
import axios, { AxiosResponse } from 'axios';
import * as parse from 'date-fns/parse';
import * as getHours from 'date-fns/get_hours';
import * as getMinutes from 'date-fns/get_minutes';
import { ParsedEventDetails, EventbriteDetails } from './model';

const link = 'https://www.meetup.com/milano-front-end/events/254444645/';
axios.get(link).then(res => {
  extractDetailsFromMeetupResponse(link, res);
});

function extractDetailsFromMeetupResponse(
  link: string,
  response: AxiosResponse<any>,
) {
  const $ = cheerio.load(response.data);

  const

  console.log($('.pageHead-headline').text());
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
    time: `${getHours(fullDate)}:${getMinutes(fullDate)
      .toString()
      .padStart(2, '0')}`,
  };
  return EventbriteDetails(parsedEventbriteData);
}
