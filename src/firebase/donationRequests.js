import firebase from './firebase'
import { format } from 'date-fns';
export const getDonations = async (startDate = null, endDate = null) => {
	let db = firebase.firestore();
	let donationsRef;
	let total = 0;
	if(startDate != null && endDate != null) {
		donationsRef = db.collection('donations')
			.where('date', '>=', startDate)
			.where('date','<=',endDate)
			.orderBy('date', 'desc');
	}else if(startDate != null){
		donationsRef = db.collection('donations')
			.where('date', '>=', startDate)
			.orderBy('date', 'desc');
	} else{
		donationsRef = db.collection('donations').orderBy('date', 'desc');
	}
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
            creatorID: 'test',
            creatorName: 'test',
            createdOn: new Date(),
            updatedOn: new Date()
	}).then((donation) => {
		console.log("success!",donation)
	}).catch( (err) => {
		console.log("failure!", err)
	});
}


export const createDonationType = (dt, user) => {
	let db = firebase.firestore();
	let donationsRef = db.collection('donation_types');
	donationsRef.add({
		name: dt,
		createdBy: 'test',
		creatorName: 'test',
		createdOn: new Date(),
		updatedOn: new Date()
	}).then((donation) => {
		console.log("success!",donation)
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const createDonationSource = (ds, user) => {
	let db = firebase.firestore();
	let donationsRef = db.collection('donation_sources');
	donationsRef.add({
		name: ds,
		createdBy: 'test',
		creatorName: 'test',
		createdOn: new Date(),
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

export const updateDonation = async (id, data) => {
	let db = firebase.firestore();
	console.log('updating donation', id, data)
	id && db.collection('donations').doc(id).set({
			id: data.id,
			date: data.date,
			donor_pco_id: data.donor_pco_id,
			amount: data.amount,
			donor_name: data.donor_name,
			donation_type: data.donation_type,
			source: data.source,
			updatedBy: 'test',
            updatedOn: new Date()
	}).then(() => {
		console.log("success UPDATE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const getDonationsByDateAndPerson = async (id,startDate,endDate) => {
	let db = firebase.firestore();
	console.log('getting data for user', id, startDate, endDate );
	let total = 0;
	let donationsRef = db.collection('donations')
		.where('donor_pco_id', '==', id)
		.where('date', '>=', startDate)
		.where('date','<=',endDate)
		.orderBy('date', 'desc'); //.where('date', '>=', startDate).where(date, '<=', endDate)
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
	let donationsRef = db.collection('donations').where('donor_pco_id', '==', id);
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
	let donationsRef = db.collection('donations').where('date', '>=', startDate)
			.where('date','<=',endDate)
	
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

export const getDonationTotalsAggregateByDate = async (startDate = null, endDate = null) => {
	let db = firebase.firestore();
	let donationsRef = db.collection('donations').where('date', '>=', startDate)
			.where('date','<=',endDate)
	
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
