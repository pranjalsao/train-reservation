import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

const ShowTrains=()=>{
    
    const location=useLocation();
	const { trains } = location.state
   
	console.log(trains);

	const navigate = useNavigate();
	const { trainFound, trainStatus, route1, route2, distance,
		duration, arrivalDate, arrivalTime, fares } = trains;

	for (let status of trainStatus) {
		for (let fare of fares) {
			if (status.coach.coachId === fare.coachId) {
				status.fare = fare;
			}
		}
	}
	console.log(trainStatus);

    
    const submit = (e) => {
        e.preventDefault()
        confirmAlert({
            title: 'You are not logged in!',
            message: 'Please log in first to book tickets.',
            buttons: [
              { 
                label: 'Go to login',
                onClick: () => { navigate('/login')}

              },
              {
                label: 'Cancel',
                onClick: () => {}
              }
            ]
          });
              
      };


        return (
            <>
            <Navbar/>
			<main className="main" id="main">
				<div className="pagetitle">
					<h1>Train Found</h1>
				</div>{/* End Page Title */}
				<div className="card col-10">
					<div className="text-center">
						<div className="mt-3 train-found-title">Train No. {trainFound.trainNo}</div>
						<div className="train-found-title">{trainFound.trainName}</div>
					</div>
					<hr />
					<div className="train-found-body">
						<div className='d-flex align-items-center justify-content-between'>
							<div className='text-start'>
								<div className="train-found-title">{route1.id.station.stationName} ({route1.id.station.stationId})</div>
								<div className='train-found-text'>{trainStatus[0].date}</div>
								<div className='train-found-text'>{trainFound.sourceDepartureTime}</div>
							</div>
							<div className='text-center'>
								<div className='train-found-text' style={{ marginBottom: '-10px' }}>{distance} KM</div>
								<div className="train-found-title">---------</div>
								<div className='train-found-text' style={{ marginTop: '-10px' }}>{duration} Hours</div>
							</div>
							<div className='text-end'>
								<div className="train-found-title">{route2.id.station.stationName} ({route2.id.station.stationId})</div>
								<div className='train-found-text'>{arrivalDate}</div>
								<div className='train-found-text'>{arrivalTime}</div>
							</div>
						</div>
					</div>
					<hr />
					<div className="train-found-body d-flex justify-content-between">
						{
							trainStatus.map((status) => {
								return (
									<div className='card col-2 p-2 text-center border border-2 mx-2'>
										<span className="train-found-title">{status.fare.coachId}</span>
										{status.seatsAvailable > 0 ? <span className="badge rounded-pill bg-success">Available - {status.seatsAvailable}</span> : <span className="badge rounded-pill bg-warning">Waiting</span>}
										<span className="train-found-text my-1">₹{status.fare.totalFare}</span>
										<button className="btn btn-primary"
											onClick={submit}
										>Book</button>
									</div>
								)
							})
						}
					</div>
				</div>
			</main>
		</>
        )
}


export default ShowTrains