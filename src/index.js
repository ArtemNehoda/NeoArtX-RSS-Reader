
import $ from 'jquery';
import axios from 'axios';
import 'bootstrap';
import normalizeUrl from 'normalize-url';
import 'bootstrap/dist/css/bootstrap.min.css';
import isURL from 'validator/lib/isURL';
import { watch } from 'melanke-watchjs';
import { getNewsItems, getChannelname, getChannelDescription } from './util';
import { renderChannel, renderNewsItem } from './renderers';
import { renderInputState, appendNews, deleteNews, prependRssName, renderModalDescription, renderModalTitle, deleteChannelNames } from './view';
import getState from './state';
import localSaver from './localSaver';

export default () => {
  const rssInputElement = $('#url-input');
  const rssInputButton = $('#url-form-button');
  const modal = $('#exampleModal');
  const rssNameList = $('#rssNameList');
  const newsList = $('#newsList');
  const state = getState();

  const loadLocalData = () => {
    if (localSaver.loadSavedNews()) state.addedNews = localSaver.loadSavedNews();
    if (localSaver.loadSavedChannels()) state.addedChannels = localSaver.loadSavedChannels();
  };

  const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

  const validateURL = (str) => {
    if (isURL(str.trim().toLowerCase()) || str.trim().length === 0) {
      state.inputState.state = 'correct';
    } else {
      state.inputState.message = 'invalide URL';
      state.inputState.state = 'error';
    }
  };

  const makeChannelObj = (data, url, isUpdated) => {
    const parsedData = new DOMParser().parseFromString(data, 'application/xml');
    if (!isUpdated) {
      if ($(parsedData).find('rss').length <= 0) throw new Error('is not RSS Url');
    }
    return {
      description: getChannelDescription(parsedData),
      items: getNewsItems(parsedData),
      title: getChannelname(parsedData),
      link: url,
    };
  };

  const getXmlDocument = (rssUrl, corsProxy, isUpdated) => {
    if (!isUpdated) state.inputState.state = 'wait';
    const url = normalizeUrl(rssUrl, { forceHttp: true }).trim();
    return axios.get(`${corsProxy}${url}`, { timeout: 10000 })
      .then((response) => {
        const channel = makeChannelObj(response.data, url, isUpdated);
        if (!isUpdated) {
          if (!state.isAddedChannel(channel)) {
            state.addedChannels = [...state.addedChannels, channel];
            state.addedNews = [...channel.items, ...state.addedNews];
            state.inputState.state = 'done';
          } else throw new Error('is already added Channel');
        } else {
          channel.items = channel.items.filter(item => !state.isAddedNewsItem(item));
          state.addedNews = [...channel.items, ...state.addedNews];
        }
      })
      .catch((err) => {
        if (!isUpdated) {
          state.inputState.message = err;
          state.inputState.state = 'error';
        }
      });
  };

  const updateNews = () => {
    const promises = state.addedChannels.map(channel =>
      getXmlDocument(channel.link, CORS_PROXY_URL, true));
    window.setTimeout(
      () => {
        Promise.all(promises)
          .then(updateNews());
      }
      , 10000,
    );
  };

  watch(state, 'addedNews', () => {
    deleteNews(newsList);
    state.addedNews.forEach((e) => {
      appendNews(newsList, renderNewsItem(e));
    });
    localSaver.saveNews(state.addedNews);
  });

  watch(state, 'addedChannels', () => {
    deleteChannelNames(rssNameList);
    state.addedChannels.forEach((e) => {
      prependRssName(rssNameList, renderChannel(e));
    });
    localSaver.saveChannels(state.addedChannels);
  });

  watch(state.inputState, 'state', () => {
    renderInputState(
      rssInputElement, rssInputButton,
      state.inputState.state, state.inputState.message,
    );
  });

  watch(state.modal, 'modalDescription', () => {
    renderModalDescription(modal, state.modal.modalDescription);
  });

  watch(state.modal, 'modalTitle', () => {
    renderModalTitle(modal, state.modal.modalTitle);
  });

  rssInputElement.on('keyup', () => {
    validateURL(rssInputElement.val());
  });
  rssInputButton.on('click', () => {
    getXmlDocument(rssInputElement.val(), CORS_PROXY_URL, false);
  });

  modal.on('show.bs.modal', (event) => {
    const id = $(event.relatedTarget).attr('id');
    const item = state.getItemFromGuid(id);
    const { description, title } = item;
    state.modal.modalDescription = description;
    state.modal.modalTitle = title;
  });
  modal.on('hide.bs.modal', () => {
    state.modal.modalDescription = ' ';
    state.modal.modalTitle = ' ';
  });

  Promise.resolve(window.location)
    .then(loadLocalData())
    .then(updateNews());
};

