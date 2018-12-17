
export default {
  saveChannels(channels) {
    localStorage.setItem('channels', JSON.stringify(channels));
  },
  loadSavedChannels() {
    const data = localStorage.getItem('channels');
    return data ? JSON.parse(localStorage.getItem('channels')) : null;
  },
  saveNews(news) {
    localStorage.setItem('news', JSON.stringify(news));
  },
  loadSavedNews() {
    const data = localStorage.getItem('news');
    return data ? JSON.parse(localStorage.getItem('news')) : null;
  },
};

