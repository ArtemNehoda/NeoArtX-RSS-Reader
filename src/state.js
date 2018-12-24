
export default () => ({
  inputState: {
    state: 'done',
    message: '',
  },

  modal:
   {
     modalTitle: '',
     modalDescription: '',
   },
  addedChannels: [],
  addedNews: [],
  hasChannel(channel) {
    return this.addedChannels.find(e => e.link === channel.link);
  },
  hasNewsItem(item) {
    return this.addedNews.find(e => e.title === item.title);
  },
  getItemFromGuid(guid) {
    return this.addedNews.find(e => e.guid === guid);
  },

});

