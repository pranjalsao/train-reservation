import AdminDashboard from "./adminDashboard"
import { useEffect } from "react"
import axios from "axios"
import config from "../../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
const UpdateSpecialCharges = () => {

    const [trainType, setTrainType] = useState([])
    const navigate = useNavigate()

    let num = 1



    useEffect(() => {
        // if(!sessionStorage['token'])
        // navigate('/error403')
        // else{
        // }
        fetchdetails()

    }, [])

    const fetchdetails = () => {
        axios.get(config.URL + '/admin/show-train-type',
            { headers: { Authorization: sessionStorage['token'] } })
            .then((response) => {
                setTrainType(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const updatecharges = (type) => {
        navigate('/admin/update-traintype-charges', { state: { traintype: type } })
    }

    return (
        <>
            <AdminDashboard />
            <main id="main" className="main">
                <section class="section">
                    <div class="row">
                        <div class="col-md-8"></div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Choose train type to update</h5>

                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr.No</th>
                                            <th scope="col">Train Type Id</th>
                                            <th scope="col">Train Type Name</th>
                                            <th scope="col">Special Charges</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            trainType.map((type) => {
                                                return (
                                                    <tr>
                                                        <td>{num++}</td>
                                                        <td>{type.trainTypeId}</td>
                                                        <td>{type.trainTypeName}</td>
                                                        <td>{type.specialCharges}</td>
                                                        <td>
                                                            <button className="btn btn-primary" onClick={() => { updatecharges(type) }}>
                                                                Edit</button>
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>

    )
}


export default UpdateSpecialCharges