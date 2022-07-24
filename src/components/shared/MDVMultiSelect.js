import React, { useState, useEffect } from 'react';
import { MultiSelect } from '@mantine/core';
import { searchPeopleByName } from '../../pco/requests';

function MDVMultiSelect(props) {
	const [data, setData] = useState([])
	
	useEffect(()=> {
		setData(props.data)
	},[props.data])

	const unique = (arr) => {
		var a = arr.concat();
		for(var i=0; i<a.length; ++i) {
			for(var j=i+1; j<a.length; ++j) {
				if(a[i].value === a[j].value)
					a.splice(j--, 1);
			}
		}
	
		return a;
	};

	const handleSearchChange = (val) => {
		searchPeopleByName(val).then( res => {
			let r = unique(res.concat(data))
			setData(r)
		})
		// changeValue(val)
	}

	const changeValue = (vals) => {
		props.setValue(vals)
}

	return (
		<MultiSelect 
			data={data} 
			label={props.label}
			maxSelectedValues={props.maxSelectedValues}
			searchable
			creatable
			limit={20}
			// getCreateLabel={(query) => `+ Create ${query}`}
			// onCreate={(query) => props.createNewOption(query)}
			onSearchChange={(q) => handleSearchChange(q)}
			onChange={(query) => changeValue(query)}
			value={props.value}
			maxDropdownHeight={160}

		/>
	);
}

export default MDVMultiSelect;