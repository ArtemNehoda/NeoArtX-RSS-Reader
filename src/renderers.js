

export const renderNewsItem = (item) => {
  const htmlString = `<div  class="list-group-item list-group-item-action flex-column align-items-start">
  <div class="d-flex w-100 justify-content-between">
    <a href="${item.link}" class="mb-1 list-group-item-action"><h5>${item.title}</h5></a>
    <button id="${item.guid}" class="modal-touch btn btn-secondary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><small>More...</small></button>
  </div>`;
  return htmlString;
};

export const renderChannel = (channel) => {
  const htmlString = `<a href="#" class="list-group-item list-group-item-action">
  <h5 class="list-group-item-heading">${channel.title}</h5>
  <p class="list-group-item-text">${channel.description}</p>
</a>`;
  return htmlString;
};

