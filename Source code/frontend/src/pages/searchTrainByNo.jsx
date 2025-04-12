import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Navbar from "../components/navbar"
import config from "../config"
import image from '../assets/img/1457234.jpg'

const SearchTrainByNo = () => {
    const [trainNoList, setTrainNoList] = useState([])
    const [trainNo, setTrainNo] = useState('')
    const [trainDetails, setTrainDetails] = useState({})

    const navigate = useNavigate()

    const fetchtrain = () => {
        axios.get(config.expressURL + '/train-no')
            .then((response) => {
                setTrainNoList(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchDetails = () => {

        axios.get(config.URL + '/train/' + trainNo)
            .then((response) => {
                setTrainDetails(response.data)
            })
            .catch((error) => {
                console.log(error)
                setTrainDetails(error.response.status)
            })

    }

    const submit = (e) => { 
        e.preventDefault();
        if (trainNo.length == 0)
            toast.error('Please provide train no.!')
        else if (trainDetails === 404) {
            toast.error('Invalid Train No.!!')
            navigate('/search-train-details')
        }
        else
            navigate('/train-search-results', { state: { traindetails: trainDetails } })
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <Navbar />
                <main id="main" className="main" style={{ alignItems: 'center', left: 100, position: 'relative' }}>
                    <section class="section">
                        <div class="row">
                            <div class="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Select Train No. here</h5>
                                        <hr />
                                        <form onSubmit={submit}>

                                            <div className="col-md-6">
                                              
                                                <input type="text" className="form-control" placeholder="Enter Train No."
                                                    required onClick={fetchtrain} list='trainno'
                                                    onChange={(e) =>setTrainNo(e.target.value)} onEnded={fetchDetails()} />
                                                <datalist id='trainno'>
                                                    {
                                                        trainNoList.map((trainno) => {
                                                            return (
                                                                <option value={trainno.train_no}>{trainno.train_no}</option>
                                                            )
                                                        })
                                                    }
                                                </datalist>
                                           
                                            </div>
                                            <br />

                                            <div className="text-center">
                                                <button type="submit" className="btn btn-success" 
                                                    >Submit</button>
                                                &nbsp;&nbsp;
                                                <button type="reset" className="btn btn-secondary">Reset</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>

        </>
    )
}

export default SearchTrainByNo