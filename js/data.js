const BOOK_SELF_APPS = "bookid";

let dataBook = [];

// check if local storage is available
const isStorageAvailable = () => {
  try {
    return true;
  } catch (e) {
    alert("Local storage is not available");
    return false;
  }
};

// get data from local storage
const getDataBook = () => {
  if (isStorageAvailable()) {
    dataBook = JSON.parse(localStorage.getItem(BOOK_SELF_APPS));
    if (dataBook === null) {
      dataBook = [];
    }
  }
  document.dispatchEvent(new Event("loaded"));
  return dataBook;
};

// set data to local storage
const setDataBook = (data) => {
  if (isStorageAvailable()) {
    localStorage.setItem(BOOK_SELF_APPS, JSON.stringify(data));
  }
};

// add data to local storage
const addDataBook = (data) => {
  dataBook.push(data);
  setDataBook(dataBook);
};
