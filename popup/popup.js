// aliases
const storage = chrome.storage.sync;
const log = (...params) =>
	chrome.extension.getBackgroundPage().console.log(...params);

// HTML elements
const siteListUl = document.getElementById("site-list");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const siteInput = document.getElementById("site-input");

// global variables
let blacklist;
const validUrlRegex = /^[^ "]+$/;

// HTML helper functions
const createLi = (url, index) => {
	const liElement = document.createElement("li");
	liElement.setAttribute("id", `site-${(index + 1).toString()}`);
	liElement.textContent = url;

	return liElement;
};

const appendLi = (url, index) => {
	siteListUl.appendChild(createLi(url, index));
};

const populateList = (blacklist) => {
	for (const [index, site] of blacklist.entries()) {
		appendLi(site, index);
	}
};

const validateInput = (input) => {
	return validUrlRegex.test(input);
};

addButton.onclick = () => {
	const url = siteInput.value;
	if (validateInput(url)) {
		addSite(url);
		if (!blacklist.contains(url)) {
			appendLi(url, blacklist.length);
		}
		siteInput.value = "";
	}
};

clearButton.onclick = () => {
	storage.clear();
	while (siteListUl.hasChildNodes()) {
		siteListUl.removeChild(list.siteListUl);
	}
};

// API helper functions
// storage.clear();
const addSite = (url) => {
	storage.set({ [url]: url });
};

// set by key/value pair
// addSite("google.com");
// addSite("espn.com");

storage.get(null, (result) => {
	log(result);
	blacklist = Object.values(result);

	populateList(blacklist);
});
