import React, { useEffect, useState } from 'react'
import UserDashboard from './userDashboard'
import SearchBox from '../../components/autoComplete';
import axios from 'axios'
import config from '../../config';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';




const UserSearchTrain = () => {

	const [stations, setStation] = useState([]);
	const [journeyFrom, setJourneyFrom] = useState("");
	const [journeyTo, setJourneyTo] = useState("");
	const [departureDate, setDepartureDate] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		loadStations()
	}, [])

	const loadStations = () => {
		axios
			.get(config.URL + '/user/all-stations', {
				// headers: { token: sessionStorage['token'] },
				headers: { Authorization: sessionStorage['token'] }
			})
			.then((response) => {
				const result = response.data
				setStation(result)
				console.log(result)
			})
			.catch((error) => {
				toast.error(error.response.data);
			})
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const body = { journeyFrom, journeyTo, departureDate };
		console.log(body);
		axios.post(config.URL + "/search-train", body)
			.then((response) => {
				const result = response.data;
				toast.success("Train Found");
				console.log(result);
				navigate("/user/train-found", { state: { result } });
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			})

	}

	return (
		<>
			<UserDashboard />
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Search Train</h1>
				</div>{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-lg-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Enter Search Details</h5>
									{/* General Form Elements */}
									<form onSubmit={handleSubmit}>
										{/* <div className="row mb-3">
                                        </div> */}
										<div className="row mb-3">
											<label htmlFor="inputText" className="col-form-label">Enter Source</label>
											<SearchBox label="Source"
												inputType="text"
												stations={stations}
												name="journeyFrom"
												className="form-control"
												onAction={(event) => {
													setJourneyFrom(event.target.value)
												}}
											/>
											{/* <div><input type="text" className="form-control" /></div> */}
										</div>
										<div className="row mb-3">
											<label htmlFor="inputEmail" className="col-form-label">Enter Destination</label>
											<SearchBox label="Destination"
												inputType="text"
												stations={stations}
												name="journeyTo"
												className="form-control"
												onAction={(event) => {
													setJourneyTo(event.target.value)
												}}
											/>
											{/* <div><input type="text" className="form-control" /></div> */}
										</div>
										<div className="row mb-3">
											<label htmlFor="inputDate" className="col-form-label">Date</label>
											<div>
												<input type="date"
													className="form-control"
													required
													name='departureDate'
													onSelect={(event) => {
														setDepartureDate(event.target.value)
													}}
												/>
											</div>
											{/* <div className="">
                                                <BasicDatePicker />
                                            </div> */}
										</div>
										<div className="text-center">
											<button type="submit" className="btn btn-primary mx-1">Search</button>
											<button type="reset" className="btn btn-secondary mx-1">Reset</button>
										</div>
									</form>{/* End General Form Elements */}
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default UserSearchTrain