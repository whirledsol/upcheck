export const SITES = {
	google: 'https://www.google.com',
	github: 'https://www.github.com'
};

export const EMAIL = {
	TO: 'to@example.com',
	FROM: 'from@example.com',
	SUBJECT: `UPCHECK: {{site}} returned {{status}}`,
	body: `{{site}} at {{url}} returned {{status}} at {{now}}`
};