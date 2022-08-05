import firebase from './firebase'
import { format } from 'date-fns';
import { getCookie } from '../utils/cookieUtils';
export const getDonations = async (startDate = null, endDate = null, options = {}) => {
	let db = firebase.firestore();
	let campusCode = getCookie('campus_code');
	let donationsRef;
	let total = 0;
	donationsRef = db.collection('donations');
	if(startDate != null) {
		donationsRef = donationsRef.where('date', '>=', startDate)
	}
	if(endDate != null){
		donationsRef = donationsRef.where('date', '<=', endDate)
	} 
	if(campusCode != null){
		donationsRef = donationsRef.where('campus_code', '==', campusCode);
	}
	if(options.types != null && options.types.length > 0){
		console.log(options.types)
		donationsRef = donationsRef.where('donation_type', 'in', options.types);
	}
	if(options.sources != null && options.sources.length > 0){
		console.log(options.sources)
		donationsRef = donationsRef.where('source', 'in', options.sources);
	}
	donationsRef = donationsRef.orderBy('date', 'desc').orderBy('donor_name');

	return donationsRef.get().then(donations => {
		let typetotals = {}
		let sourcetotals = {};
		var data = donations.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})
		data.forEach( donation => {
			total += donation.amount
			if(typetotals[donation.donation_type]){
				typetotals[donation.donation_type] += donation.amount;
			} else {
				typetotals[donation.donation_type] = donation.amount;
			}
			if(sourcetotals[donation.source]){
				sourcetotals[donation.source] += donation.amount;
			} else {
				sourcetotals[donation.source] = donation.amount;
			}
		})
		return {typetotals, sourcetotals, total, data }
	}).catch((err) => {
		console.log("there's been an error getting donations", err)

	}
	)
}

export const getDonationTypes = async () => {
	let db = firebase.firestore();
	let donationTypesRef = db.collection('donation_types');
	return donationTypesRef.get().then(types => {
		return types.docs.map(doc => {
			return {
				id: doc.id,
				value: doc.data().name,
				label: doc.data().name
			}
		})
	}).catch((err) => {
		console.log("there's been an error getting donations", err)

	}
	)
}

export const createDonation = (donation, user) => {
	let db = firebase.firestore();
	let donationsRef = db.collection('donations');
	donationsRef.add({
		date: donation.date,
			donor_pco_id: donation.donor_pco_id,
			amount: donation.amount,
			donor_name: donation.donor_name,
			donation_type: donation.donation_type,
			source: donation.source,
			campus_code: donation.campus_code,
            creatorID: user.id,
            creatorName: user.attributes.name,
            createdOn: new Date(),
			updatorID: user.id,
			updatorName: user.attributes.name,
            updatedOn: new Date()
	}).then((donation) => {
		console.log("success!",donation)
	}).catch( (err) => {
		console.log("failure!", err)
	});
}


export const createDonationType = (dt, user) => {
	let db = firebase.firestore();
	console.log(dt,user)
	let donationsRef = db.collection('donation_types');
	donationsRef.add({
		name: dt,
		creatorID:  user.id,
		creatorName: user.attributes.name,
		createdOn: new Date(),
		updatorID: user.id,
		updatorName: user.attributes.name,
		updatedOn: new Date()
	}).then((donation) => {
		console.log("success!",donation)
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const createDonationSource = (ds, user) => {
	let db = firebase.firestore();
	console.log(ds,user)
	let donationsRef = db.collection('donation_sources');
	donationsRef.add({
		name: ds,
		creatorID: user.id,
		creatorName: user.attributes.name,
		createdOn: new Date(),
		updatorID: user.id,
		updatorName: user.attributes.name,
		updatedOn: new Date()
	}).then((donation) => {
		console.log("success!",donation)
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const deleteDonation = async (id) => {
	let db = firebase.firestore();
	id && db.collection('donations').doc(id).delete().then(() => {
		console.log("success DELETE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const deleteDonationType = async (id) => {
	let db = firebase.firestore();
	id && db.collection('donation_types').doc(id).delete().then(() => {
		console.log("success DELETE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const deleteDonationSource = async (id) => {
	let db = firebase.firestore();
	id && db.collection('donation_sources').doc(id).delete().then(() => {
		console.log("success DELETE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}


export const updateDonation = async (id, data, user) => {
	let db = firebase.firestore();
	console.log('updating donation', id, data)
	id && db.collection('donations').doc(id).update({
			id: data.id,
			date: data.date,
			donor_pco_id: data.donor_pco_id,
			amount: data.amount,
			donor_name: data.donor_name,
			donation_type: data.donation_type,
			source: data.source,
			updatorID: user.id,
			updatorName: user.attributes.name,
			updatedOn: new Date()
	}).then(() => {
		console.log("success UPDATE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const getDonationsByDateAndPerson = async (ids,startDate,endDate) => {
	let db = firebase.firestore();
	let campusCode = getCookie("campus_code");

	console.log('getting data for user', ids, startDate, endDate );
	let total = 0;
	let donationsRef = db.collection('donations')
		.where('donor_pco_id', 'in', ids)
		.where('date', '>=', startDate)
		.where('date','<=',endDate)
		.where('campus_code','==', campusCode)
		.orderBy('date', 'desc').orderBy('donor_name');
	return donationsRef.get().then(donations => {
		var data = donations.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})
		data.forEach( donation => {
			total += donation.amount
		})
		return {total, data }
	}).catch((err) => {
		console.log("there's been an error getting donations", err)

	}
	)
}

export const getDonationTotalsByPerson = async (id, startDate = null, endDate = null) => {
	let db = firebase.firestore();
	let campusCode = getCookie("campus_code");

	let donationsRef = db.collection('donations')
		.where('donor_pco_id', '==', id)
		.where('campus_code','==', campusCode);

	if (startDate != null && endDate != null) {
		donationsRef = donationsRef.where('date', '>=', startDate)
			.where('date','<=',endDate)
	}
	let total = 0;
	return donationsRef.get().then( donations => {
		var data = donations.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})

		data.forEach( don => {
			total += don.amount;
		})

		return total;

	}).catch( err => {
		console.log("there's been an error getting donations", err)
	})
}

export const getDonationTotalsAggregate = async (startDate = null, endDate = null) => {
	let db = firebase.firestore();
	let campusCode = getCookie("campus_code");

	let donationsRef = db.collection('donations')
		.where('date', '>=', startDate)
		.where('date','<=',endDate)
		.where('campus_code','==', campusCode).orderBy('date','desc').orderBy('donor_name');
	
	let total = 0;
	return donationsRef.get().then( donations => {
		var dbData = donations.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})

		var data = []
		dbData.reduce(function(res, value) {
			if (!res[value.donor_pco_id]) {
				res[value.donor_pco_id] = { donor_pco_id: value.donor_pco_id, type: 'donation', donor_name: value.donor_name, amount: 0 };
				data.push(res[value.donor_pco_id])
			}
			res[value.donor_pco_id].amount += value.amount;
			total += value.amount;
			console.log(res, value, data, total)
			return res;
		}, {});

		console.log({total, data})
		return {total, data};

	}).catch( err => {
		console.log("there's been an error getting donations", err)
	})
}

export const getDonationTotalsAggregateByDate = async (startDate = null, endDate = null, filterByType = null) => {
	let db = firebase.firestore();
	let campusCode = getCookie("campus_code");

	let donationsRef = db.collection('donations')
		.where('date', '>=', startDate)
		.where('date','<=',endDate)
		.where('campus_code','==', campusCode);
	if (filterByType != null && filterByType.length > 0) {
		donationsRef = donationsRef.where('donation_type', 'in', filterByType)
	}
	let total = 0;
	return donationsRef.get().then( donations => {
		var dbData = donations.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})

		var data = []
		dbData.reduce(function(res, value) {
			let formattedDate = value.date.toDate();
			let dayOfWeek = format(formattedDate, 'EEEE')
			if (!res[formattedDate]) {
				res[formattedDate] = { date: value.date, type: 'donation', dayOfWeek: dayOfWeek ,amount: 0 };
				data.push(res[formattedDate])
			}
			res[formattedDate].amount += value.amount;
			total += value.amount;
			// console.log(formattedDate, value, res, total)

			return res;
		}, {});

		console.log({total, data})
		return {total, data};

	}).catch( err => {
		console.log("there's been an error getting donations", err)
	})

}
