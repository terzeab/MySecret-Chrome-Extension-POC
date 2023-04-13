const setValueInStorage = (key, value) => {
  const data = {};
  data[key] = value;
  chrome.storage.local.set(data);
};

const getValueFromStorage = (key: string | string[], callback) => {
  chrome.storage.local.get(key, (result) => {
    callback(typeof key === 'string' ? result[key] : result);
  });
};

const resetStorage = (callback) => {
  chrome.storage.local.clear(callback);
};

export const ChromeService = {
  setValueInStorage,
  getValueFromStorage,
  resetStorage
};
