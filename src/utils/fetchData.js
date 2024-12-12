const {REACT_APP_DEFAULT_AUTHOR_HOST, REACT_APP_DEFAULT_PUBLISH_HOST} = process.env;

export const fetchData = async (path) => {
	const host = getAuthorHost();
	const endpointURL = `${host}/${path.split(":/")[1]}.model.json`;
	console.log(endpointURL);
	const data = await fetch(endpointURL, {credentials: "include"});
	const json = await data.json();
	return json;
};

export const getHostUrl = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	let host = getPublishHost();
	if (searchParams.has("authorHost")) {
		host = searchParams.get("authorHost");
	} else if (url.href.includes('https://experience.adobe.com/#/')) {
		host = getAuthorHost();
	}
	const endpointURL = `${host}/${path.split(":/")[1]}.model.json`;
	const data = await fetch(endpointURL, { headers: {"X-Aem-Affinity-Type": "api"}, credentials: "include"});
	const json = await data.json();
	return json;
};

export const getAuthorHost = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("authorHost")) {
		return searchParams.get("authorHost");
	} else {
		return REACT_APP_DEFAULT_AUTHOR_HOST;
	}
}

export const getProtocol = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("protocol")) {
		return searchParams.get("protocol");
	} else {
		return "aem";
	}
}

export const getService = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("service")) {
		return searchParams.get("service");
	}
	return null;
}

export const getPublishHost = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("publishHost")) {
		return searchParams.get("publishHost");
	} else {
		return REACT_APP_DEFAULT_PUBLISH_HOST;
	}
}
