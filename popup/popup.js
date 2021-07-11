const log = (...params) =>
	chrome.extension.getBackgroundPage().console.log(...params);

const siteListUl = document.getElementById("site-list");
let blacklist;

const createLi = (url, index) => {
	const liElement = document.createElement("li");
	liElement.setAttribute("id", `site-${(index + 1).toString()}`);
	liElement.textContent = url;

	return liElement;
};

const populateList = (blacklist) => {
	for (const [index, site] of blacklist.entries()) {
		siteListUl.appendChild(createLi(site, index));
	}
};

// set by key/value pair
chrome.storage.sync.set({ google: "google.com" });
chrome.storage.sync.set({ espn: "espn.com" });

chrome.storage.sync.get(null, (result) => {
	blacklist = [...Object.values(result)];

	populateList(blacklist);
});
