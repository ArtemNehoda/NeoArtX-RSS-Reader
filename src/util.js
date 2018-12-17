import $ from 'jquery';
import _ from 'lodash';

export const getChannelname = (parsedData) => {
  const titleElement = parsedData.querySelector('channel title');
  return $(titleElement).text();
};
export const getChannelDescription = (parsedData) => {
  const descriptionElement = parsedData.querySelector('channel description');
  return $(descriptionElement).text();
};

export const getNewsItems = (parsedData) => {
  const collection = [];
  const channel = parsedData.querySelector('channel');
  const children = $(channel).children('item');
  children.each((i, item) => {
    collection.push({
      guid: _.uniqueId(),
      title: $(item).find('title').text(),
      description: $(item).find('description').text(),
      link: $(item).find('link').text(),
    });
  });
  return collection;
};

