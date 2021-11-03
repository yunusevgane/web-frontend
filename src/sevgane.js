function http(url) {
	var req = new XMLHttpRequest();
	req.overrideMimeType('application/json');
	req.open('GET', url, true);
	req.onload = function() {
		if (req.responseText.length > 2) {
		}
		else {
			return req.responseText;
		}
	};
	req.send(null);
}
