export const SITES = {
	google: 'https://www.google.com',
	github: 'https://www.github.com'
};

export const EMAIL = {
	to: 'to@example.com',
	from: 'from@example.com',
	subjectTemplate: `UPCHECK: {{site}} returned {{status}}`,
	bodyTemplate: `{{site}} at {{url}} returned {{status}} at {{now}}`,
	emailSetup: {
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	}
};