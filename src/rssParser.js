
import _ from 'lodash';

export default (data) => {
  const parsedData = new DOMParser().parseFromString(data, 'application/xml');
  if (parsedData.querySelector('rss').length <= 0) { throw new Error('is not RSS'); }
  const channel = parsedData.querySelector('channel');
  const children = [...channel.querySelectorAll('item')].map(item => ({
    guid: _.uniqueId(),
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
  }));
  return {
    description: channel.querySelector('description').textContent,
    items: children,
    title: channel.querySelector('title').textContent,
  };
};
