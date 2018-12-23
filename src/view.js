import $ from 'jquery';

export const renderModalDescription = (modal, description) => {
  modal.find('.modal-body').html(description);
};

export const renderModalTitle = (modal, title) => {
  modal.find('.modal-title').text(title);
};

export const renderInputState = (rssInputElement, rssInputButton, inputState, message) => {
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
    rssInputButton.attr('disabled', true);
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

export const prependRssName = (rssNameList, html) => {
  rssNameList.prepend(html);
};

export const prependNews = (newsList, html) => {
  newsList.prepend(html);
};

export const appendNews = (newsList, html) => {
  newsList.append(html);
};
export const deleteNews = (newsList) => {
  newsList.empty();
};

export const deleteChannelNames = (rssNameList) => {
  rssNameList.empty();
};
