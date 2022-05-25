import 'dotenv/config';
import * as config from './config.js';
import Handlebars from 'handlebars';
import axios from 'axios';
import moment from 'moment';
import nodemailer from 'nodemailer';


const {SITES, EMAIL} = config;
const {to,from,subjectTemplate,bodyTemplate,emailSetup} = EMAIL;


/**
 * sendEmail
 * @param {*} metadata 
 */
const sendEmail = async (metadata)=>{
	const subject = Handlebars.compile(subjectTemplate)(metadata);
	const body = Handlebars.compile(bodyTemplate)(metadata);
	console.log(subject,body)
	const transporter = nodemailer.createTransport(emailSetup);


	const msg = {
	  to: to, // Change to your recipient
	  from: from, // Change to your verified sender
	  subject: subject,
	  text: body,
	  html: `<p>${body}</p>`,
	}

	const info = await transporter.sendMail(msg);
	
	console.log(`\tEmail sent: ${info.messageId}`);
}

/**
 * ping
 * @param {*} url 
 */
const ping = async(url) =>{
	try{
		const res = await axios.get(url);
		return res.status;
	}
	catch(ex){
		return ex.response?.status ?? 0;
	}
}

/**
 * check
 * @param {*} site 
 * @param {*} url 
 */
const check = async (site,url) =>{
	
	const status = await ping(url);
	
	const metadata = {
		site: site,
		url: url,
		now: moment().format('MMMM Do YYYY, h:mm:ss a'),
		status: status
	};

	if(status !== 200){
		await sendEmail(metadata);
	}
}

/**
 * checkAll
 * @param {*} _ 
 */
const checkAll = _ =>{
	for(var site in SITES){
		check(site,SITES[site]);
	}
}

checkAll();