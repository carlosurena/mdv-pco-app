import axios from 'axios';
import Vault from '../components/vault/vault'
import { setCookie, checkCookie, getCookie } from '../utils/cookieUtils';
const vault = new Vault();


export const getAllPeople = async () =>  {
	axios.get("https://api.planningcenteronline.com/people/v2/people?per_page=1000", {
		auth: {
			username: vault.username,
			password: vault.password
		}
	})
		.then(res => {
			return res.data;
		}).catch(err => {
			console.log(err)
			alert("ERROR with getAllPeople.")
		}
		);

}

export const getAllPeopleReshaped = async () => {

	let response;
	response = await axios.get("https://api.planningcenteronline.com/people/v2/people?per_page=1000", {
		auth: {
			username: vault.username,
			password: vault.password
		}
	})
		.then(res => {
			let reshapedPeople = []
			let data = res.data.data
			data.forEach( person => {
				let label =
					(person.attributes.first_name ? person.attributes.first_name : '' ) + 
					(person.attributes.middle_name ? ' ' + person.attributes.middle_name : '') + 
					(person.attributes.last_name ? ' ' + person.attributes.last_name : '');
				let image = person.attributes.avatar;
				let id = person.id;
				let value = person.id
				reshapedPeople.push({ value, image, id, label})
			});
			return reshapedPeople;
		}).catch(err => {
			console.log(err)
			alert("ERROR with getAllPeopleReshaped.")
		}
		);
		return response
	
}

export const getPersonByID = async (id) => {
	let person = axios.get("https://api.planningcenteronline.com/people/v2/people/"+ id , {
            auth: {
                username: vault.username,
                password: vault.password
            }
        })
            .then(res => {
                const person = res.data.data;
                console.log("successfully retrieved person of id:" + id)
                console.log(person)
				return person
            }).catch(err => {
                console.log(err)
                alert("We've encountered an error. Please check your internet connection and try again later.")
            }
            );
		return person;
}

export const getOauthRedirectURL = () => {
	let CLIENT_ID = process.env.REACT_APP_PCO_CLIENT_ID;
	// let redirect_uri = 'https://mdv-admin.netlify.app/'
	let redirect_uri = process.env.REACT_APP_PCO_REDIRECT_URI;
	let scope = 'people';

	return `https://api.planningcenteronline.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`
}

export const getAuthToken = async (code) => {
	let CLIENT_ID = process.env.REACT_APP_PCO_CLIENT_ID;
	let CLIENT_SECRET = process.env.REACT_APP_PCO_SECRET;
	// let redirect_uri = 'https://mdv-admin.netlify.app/'
	let redirect_uri = process.env.REACT_APP_PCO_REDIRECT_URI
	const requestObj = {"grant_type": "authorization_code", "code": code, "client_id": CLIENT_ID, "client_secret": CLIENT_SECRET, "redirect_uri": redirect_uri}
	
	console.log(requestObj)
	// return axios.post('/oauth/redirect', requestObj)
	//   .then(function (response) {
	// 	console.log(response); //response.data = { access_token, token_type, expires_in, refresh_token, scope, created_at}
	// 	setCookie('jwt',response.data.access_token)
	// 	return response.data.access_token
	//   })
	//   .catch(function (error) {
	// 	console.error(error);
	//   });

	return axios.post('.netlify/functions/oauth-redirect', requestObj)
	  .then(function (response) {
		console.log(response); //response.data = { access_token, token_type, expires_in, refresh_token, scope, created_at}
		setCookie('jwt',response.data.access_token)
		return response.data.access_token
	  })
	  .catch(function (error) {
		console.error(error);
	  });
}

export const getCurrentUserData = async () => {
	if (checkCookie('jwt')){
		let jwt = getCookie('jwt')
		return await axios.post('.netlify/functions/getMe', {jwt}).then( response => {
			return response.data
		}).catch( err => {
			console.error(err)
			console.log('pco error, probably expired token')
			return null
		})

	}else {
		console.log('no cookie set, cant make call')
		return null
	}
}