//  change text to Set book in rack
document.querySelector(".input-status-book > input").addEventListener("change", () => {
  if (document.querySelector(".input-status-book > input").checked) {
    document.querySelector(".buttonSubmit > span").innerHTML = "Sudah Dibaca";
  } else {
    document.querySelector(".buttonSubmit > span").innerHTML = "Belum selesai Dibaca";
  }
});

//Input data book
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
});

//Searh book in Rack
document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector(".search-book-title").value;
  const book = document.querySelectorAll(".container-book");
  book.forEach((item) => {
    const title = item.querySelector(".data-book-container > h2").innerHTML.toLowerCase();
    if (title.indexOf(search.toLowerCase()) != -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

//Method for Make book in rack
const makeBookInRack = (dataBook) => {
  const uncompleteBookRead = document.querySelector("#book-uncomplete-read");
  const completeBookRead = document.querySelector("#book-complete-read");
  (completeBookRead.innerHTML = ""), (uncompleteBookRead.innerHTML = "");
  dataBook.forEach((book) => {
    const judul = document.createElement("h2");
    judul.innerText = book.judul;
    const kodeBuku = document.createElement("p");
    kodeBuku.innerText = `Kode Buku  : ${book.id}`;
    const penulis = document.createElement("p");
    penulis.innerText = `Penulis  : ${book.penulis}`;
    const tahun = document.createElement("p");
    tahun.innerText = `Tahun  : ${book.tahun}`;
    const buttonDelete = createButton("button-delete", "Delete Book", book.id, function (e) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          removeDataBook(e);
        }
      });
    });
    const buttonRefresh = createButton("button-refresh", "RefreshBooktoUncomplete", book.id, function (e) {
      Swal.fire({
        title: "Are you sure?",
        text: "Your book will be moved to the bookshelf unfinished read",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, moved it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Moved!", "Your file has been moved.", "success");
          changeStatusBook(e);
        }
      });
    });
    const buttonAddComplete = createButton("button-complete", "AddBooktoComplete", book.id, function (e) {
      Swal.fire({
        title: "Are you sure?",
        text: "Your book will be moved to the bookshelf already read",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, moved it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Moved!", "Your file has been moved.", "success");
          changeStatusBook(e);
        }
      });
    });
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    const dataBookContainer = document.createElement("div");
    dataBookContainer.classList.add("data-book-container");
    dataBookContainer.append(judul, kodeBuku, penulis, tahun);
    const container = document.createElement("div");
    container.classList.add("container-book");
    if (book.isComplete) {
      buttonContainer.append(buttonDelete, buttonRefresh);
      container.append(dataBookContainer, buttonContainer);
      completeBookRead.append(container);
    } else {
      buttonContainer.append(buttonDelete, buttonAddComplete);
      container.append(dataBookContainer, buttonContainer);
      uncompleteBookRead.append(container);
    }
  });
};

// Method for add book to rack
const addBook = () => {
  const judul = document.querySelector("#book-title").value;
  const penulis = document.querySelector("#book-author").value;
  const tahun = document.querySelector("#book-release").value;
  const isComplete = document.querySelector("#status-book").checked;
  const Book = {
    id: +new Date(),
    judul: judul,
    penulis: penulis,
    tahun: tahun,
    isComplete: isComplete,
  };
  addDataBook(Book);
  makeBookInRack(dataBook);
};

//Method for create button
const createButton = (className, title, buttonId, evenListener) => {
  const button = document.createElement("button");
  button.classList.add(className);
  button.setAttribute("title", title);
  button.id = buttonId;
  button.addEventListener("click", evenListener);
  return button;
};

// Method for delete book
const removeDataBook = (e) => {
  const id = Number(e.target.id);
  dataBook = dataBook.filter((data) => data.id !== id);
  setDataBook(dataBook);
  makeBookInRack(dataBook);
};

//Method for change status book
const changeStatusBook = (e) => {
  const id = Number(e.target.id);
  const data = dataBook.find((x) => x.id === id);
  data.isComplete = !data.isComplete;
  setDataBook(dataBook);
  makeBookInRack(dataBook);
};
