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
  	
	console.log('******CREATE PERSON*****')
	console.log(event.body)
	const { jwt, first_name, last_name, campus_code, gender } = JSON.parse(event.body)
	let url = `${process.env.PCO_API_URL}people/v2/people`;
	console.log(url, jwt, gender, campus_code)


	let person = {
		"data": {
		  "type": "Person",
		  "attributes": {
			"first_name": first_name,
			"last_name": last_name,
			"gender": gender
		  },
		  "relationships": {
			"primary_campus": {
			  "data": { "type": "PrimaryCampus", "id": campus_code }
			}
		  }
		}
	  };
	// for ( var key in item ) {
	// 	form_data.append(key, item[key]);
	// }

	return axios.post(url, person, {
		headers: {
			// "Content-Type": "multipart/form-data",
			"Authorization": `Bearer ${jwt}`
		}
	}).then( response => {
		console.log('worked')
		console.log(response.data)

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
			  error: 'Cant create person',
			}),
		  };
	})

  };