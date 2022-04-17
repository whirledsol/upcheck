import 'dotenv/config';
import sgMail from '@sendgrid/mail';
import * as config from './config.js';
import Handlebars from 'handlebars';
import axios from 'axios';
import moment from 'moment';

const {SITES, EMAIL} = config;
const {TO,FROM,SUBJECT_TEMPLATE,BODY_TEMPLATE} = EMAIL;


/**
 * sendEmail
 * @param {*} metadata 
 */
const sendEmail = async (metadata)=>{
	const subject = Handlebars.compile(SUBJECT_TEMPLATE)(metadata);
	const body = Handlebars.compile(BODY_TEMPLATE)(metadata);
	console.log(subject,body)
	const msg = {
	  to: TO, // Change to your recipient
	  from: FROM, // Change to your verified sender
	  subject: subject,
	  text: body,
	  html: `<p>${body}</p>`,
	}
	console.log('about to send email',process.env.SENDGRID_API_KEY)
	sgMail.setApiKey(process.env.SENDGRID_API_KEY)
	await sgMail.send(msg)
	console.log('\tEmail sent');
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