const oauth = require('./util/oauth');
const axios = require('axios');

exports.handler = async (event) => {
	if (!event.body) {
	  return {
		statusCode: 401,
		body: JSON.stringify({
		  error: 'Missing required parameters',
		}),
	  };
	}
  
	const { grant_type, code, client_id, client_secret, redirect_uri } = JSON.parse(event.body);
	console.log('******OAUTH REDIRECT*****')

	console.log(client_id)
	const authorizationURI = oauth.authorizeURL({
	  redirect_uri,
	  client_id,
	  client_secret,
	  grant_type,
	  code,
	//   scope: 'people',
	});
	console.log(authorizationURI)
	
	return axios.post(authorizationURI)
		.then(function (response) {
			// console.log(response);
			// ACCESS_TOKEN_DATA = response
			// res.send(response.data)
			return {
				statusCode: 200,
				body: JSON.stringify(response.data),
			};
		})
		.catch(function (error) {
			console.log(error && error.response ? error.response.data : error);
			return {
				statusCode: 401,
				body: JSON.stringify({
				  error: 'Cant retrieve auth token ',
				}),
			  };
		});	
  };