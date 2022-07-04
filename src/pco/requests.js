import axios from 'axios';
import Vault from '../components/vault/vault'
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