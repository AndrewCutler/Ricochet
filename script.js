const blacklist = ["google.com"];

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (info) => {
		const currentInfo = info[0];
		if (currentInfo) {
			const { pendingUrl, id } = currentInfo;

			if (checkBlacklist(pendingUrl)) {
				chrome.tabs.update(id, { url: "https://www.espn.com" });
			}
		}
	});
});

const checkBlacklist = (pendingSiteUrl) => {
	for (const site of blacklist) {
		if (pendingSiteUrl?.toLowerCase().includes(site)) {
			console.log("\nSanctifying site:", site);
			return true;
		}

		return false;
	}
};
