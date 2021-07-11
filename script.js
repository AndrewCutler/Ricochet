const blacklist = ["google.com"];

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (info) => {
		const currentInfo = info[0];
		if (currentInfo) {
			console.log(currentInfo);
			const { pendingUrl, id } = currentInfo;
			for (const site of blacklist) {
				if (pendingUrl?.toLowerCase().includes(site)) {
					console.log("\nSanctifying site:", site);
					chrome.tabs.update(id, { url: "https://www.espn.com" });
				}
			}
		}
	});
});
