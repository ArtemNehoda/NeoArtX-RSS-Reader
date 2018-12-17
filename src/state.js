
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
  isAddedChannel(channel) {
    return this.addedChannels.find(e => e.link === channel.link);
  },
  isAddedNewsItem(item) {
    return this.addedNews.find(e => e.title === item.title);
  },
  addItemToNews(item) {
    if (!this.isAddedNewsItem(item)) {
      this.addedNews.unshift(item);
    }
  },
  getItemFromGuid(guid) {
    return this.addedNews.find(e => e.guid === guid);
  },

});

