const axios = require("axios");

exports.handler = async (event) => {
	if (!event.body) {
	  return {
		statusCode: 401,
		body: JSON.stringify({
		  error: 'Missing required parameters',
		}),
	  };
	}
  	
	console.log('******GET STATS*****')
	console.log(event.body)
	const { jwt } = JSON.parse(event.body)
	let url = `${process.env.PCO_API_URL}people/v2/stats`;
	return axios.get(url, {
		headers: {
			"Authorization": `Bearer ${jwt}`
		}
	}).then( response => {
		console.log('retrieved current org data (get Stats)')
		// console.log(response.data)

		//res.send(response.data)
		return {
			statusCode: 200,
			body: JSON.stringify(response.data),
		  };
	}).catch( error => {
		console.log('no work')
		//res.status('500').send('cant retrieve data')
		console.log(error.response.data)
		return {
			statusCode: 401,
			body: JSON.stringify({
			  error: 'Cant retrieve org stats data',
			}),
		  };
	})

  };