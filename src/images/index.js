const BASE_IMAGE_URL = 'https://picsum.photos';

const sendRequest = (path, queryParams, options) => {
  let url = `${BASE_IMAGE_URL}/${path}`;

  if (queryParams) {
    url = url + '?' + Object.keys(queryParams)
      .filter((key) => queryParams[key] !== undefined)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
      .join('&');
  }

  return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return response.text().then((text) => {
        throw new Error(text);
      });
    });
};

export const getListImages = (page, limit) => {
  return sendRequest('v2/list', {page, limit});
};

export const getImageDetails = (id) => {
  return sendRequest(`id/${id}/info`);
};