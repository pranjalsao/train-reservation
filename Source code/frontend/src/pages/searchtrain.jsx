import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Background from '../assets/img/frontpage.jpg'
import axios from 'axios'
import config from '../config'
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
const SearchTrain = () => {

  const [trainDetails, setTrainDetails] = useState('')
  const [journeyFrom, setFrom] = useState('')
  const [journeyTo, setTo] = useState('')
  const [departureDate, setDate] = useState('')
  const [trainTypeId, setTrainType] = useState('')
  const [coachId, setCoach] = useState('')
  const [stationList, setStationList] = useState([])
  const [coachList, setCoachList] = useState([])
  const [traintypeList, setTrainTypeList] = useState([])

  /* useEffect(()=>{
   },[])*/

  const fetchcoach = () => {
    axios.get(config.expressURL + '/coach')
      .then((response) => {
        setCoachList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchtraintype = () => {
    axios.get(config.expressURL + '/train-type')
      .then((response) => {
        setTrainTypeList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const navigate = useNavigate()
  const data = { journeyFrom, journeyTo, departureDate }

  const search = () => {

    axios.post(config.URL + '/search-train', data)
      .then((response) => {
        setTrainDetails(response.data)

      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data)
      })


  }

  const navigation = (e) => {
    e.preventDefault()
    if (trainDetails.length == 0)
      toast.error('Selected train is not available!! Try different train or date')
    else
      navigate('/show-trains', { state: { trains: trainDetails } })
  }

  /* const validate=()=>{
     axios.get('http://localhost:4000/show-train_type/'+trainTypeId+'/'+coachId)
     .then((response)=>{
       const result=response.data
       if(result.status==="error")
       toast.error("No Such Trains available!!Try Different train")
     })
   }*/

  const fetchstations = () => {
    axios.get(config.expressURL + '/show-stations')
      .then((response) => {
        setStationList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data)
      })
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid" style={{
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
      }}>

        <br></br>
        <div className="col-md-6 card" style={{ marginLeft: 50, marginTop: 40, marginBottom: -10, backgroundColor: 'white', padding: 20 }}>
          <form className="row g-3">

            <h2 style={{ color: '#012970', textAlign: 'center' }}><b>BOOK TICKET</b></h2>

            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingFrom" placeholder="From"
                  list="source" onClick={fetchstations} onChange={(e) => setFrom(e.target.value)} required />
                <datalist id="source">
                  {
                    stationList.map((station) => {
                      return (
                        <option value={station.station_id}>{station.station_id}-{station.station_name}</option>
                      )

                    })
                  }
                </datalist>
                <label htmlFor="floatingFrom">
                  <div className="icon" style={{ color: '#012970' }}>
                    <i className="bi bi-cursor-fill">From</i>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-md-6" style={{ color: '#012970' }}>
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingDate" placeholder="DD/MM/YYYY"
                  onChange={(e) => setDate(e.target.value)} required />
                <label htmlFor="floatingDate">Date</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="icon">
                <i className="bi bi-arrow-down-up" style={{ paddingLeft: 150 }} />
              </div>

            </div>
            <div className="col-md-6">
              <div className="col-md-12">
                <div className="form-floating">
                  <input type="text" className="form-control" id="floatingTo" placeholder="To"
                    list="destination" onClick={fetchstations} onChange={(e) => setTo(e.target.value)} required />
                  <datalist id="destination">
                    {
                      stationList.map((station) => {
                        return (
                          <option value={station.station_id}>{station.station_id}-{station.station_name}</option>
                        )

                      })
                    }
                  </datalist>
                  <label htmlFor="floatingTo">
                    <div class="icon" style={{ color: '#012970' }}>
                      <i class="bi bi-geo-alt-fill"> To</i>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6" style={{ color: '#012970' }}>
              <div className="form-floating mb-3">
                <select className="form-select" id="floatingTrainType" aria-label="TrainType"
                  onChange={(e) => setTrainType(e.target.value)} onClick={fetchtraintype} required>
                  <option selected>SELECT</option>
                  {
                    traintypeList.map((type) => {
                      return (
                        <option value={type.train_type_id}>{type.train_type_id}</option>
                      )
                    })

                  }
                </select>
                <label htmlFor="floatingTrainType">Train Type</label>
              </div>
            </div>

            <div className="col-md-6"  >
              <div className="form-floating mb-3">
                <select className="form-select" id="floatingCoachClass" aria-label="CoachClass"
                  onChange={(e) => setCoach(e.target.value)} onClick={fetchcoach} required>
                  <option selected>SELECT</option>
                  {
                    coachList.map((coach) => {
                      return (
                        <option value={coach.coach_id}>{coach.coach_id}</option>
                      )
                    })
                  }

                </select>
                <label htmlFor="floatingTrainType">Coach Class</label>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary" onClick={navigation}
                onMouseEnter={search}>Submit</button>
              &nbsp;&nbsp;
              <button type="reset" className="btn btn-secondary">Reset</button>
            </div>

          </form>
          <br></br>
        </div>
        <br />
        <br />
        <br />
      </div>

    </>

  );
}


export default SearchTrain