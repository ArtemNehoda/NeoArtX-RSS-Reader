import $ from 'jquery';

const rssInputElement = $('#url-input');
const rssInputButton = $('#url-form-button');
const rssNameList = $('#rssNameList');
const newsList = $('#newsList');

export const setModalDescription = (modal, description) => {
  modal.find('.modal-body').html(description);
};

export const setModalTitle = (modal, title) => {
  modal.find('.modal-title').text(title);
};

export const setInputState = (inputState, message) => {
  if (inputState === 'correct') {
    rssInputButton.attr('disabled', false);
    rssInputElement.attr('disabled', false);
    rssInputElement.removeClass('is-valid');
    rssInputElement.removeClass('is-invalid');
  }
  if (inputState === 'done') {
    rssInputButton.attr('disabled', false);
    rssInputElement.attr('disabled', false);
    rssInputElement.val('');
    rssInputElement.removeClass('is-valid');
    rssInputElement.removeClass('is-invalid');
  }
  if (inputState === 'wait') {
    rssInputButton.attr('disabled', false);
    rssInputElement.attr('disabled', true);
    rssInputElement.addClass('is-valid');
    rssInputElement.removeClass('is-invalid');
  }
  if (inputState === 'error') {
    rssInputButton.attr('disabled', true);
    rssInputElement.attr('disabled', false);
    rssInputElement.addClass('is-invalid');
    rssInputElement.removeClass('is-valid');
    $('#error-url-text').text(message);
  }
};

export const prependRssName = (html) => {
  rssNameList.prepend(html);
};

export const prependNews = (html) => {
  newsList.prepend(html);
};

export const appendNews = (html) => {
  newsList.append(html);
};
export const deleteNews = () => {
  newsList.empty();
};

export const deleteChannelNames = () => {
  rssNameList.empty();
};
