import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBox(props) {
	// let [inval, setinval] = React.useState("")

	const { label, inputType, stations, name, onAction } = props
	// console.log(handleinp)
	// let handletext = (val) => {
	// 	if (val) {
	// 		handleinp(val)
	// 		console.log(val)
	// 	}
	// }

	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			autoHighlight
			options={stations}
			getOptionLabel={(option) => option.stationId}
			sx={{ width: 500 }}
			onSelect={onAction}
			renderInput={(params) => <TextField {...params}
				label={label}
				type={inputType}
				required
				name={name}
			/>}
		/>
	);
}
