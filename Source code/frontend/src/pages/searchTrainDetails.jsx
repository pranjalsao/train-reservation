import Navbar from "../components/navbar"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

const SearchedTrainDetails=()=>{
    const location=useLocation()

        const {traindetails}=location.state
        const{train,routes,schedule}=traindetails


    return(
        <>
        
        <Navbar/>
            <main className="main" id="main" >
            <div className="pagetitle">
                <h1>Train Found</h1>
            </div>{/* End Page Title */}
            <div className="card col-10">
                <div className="text-center"  >
                    <div className="mt-3 train-found-title">Train No. {train.trainNo}</div>
                    <div className="train-found-title">{train.trainName}</div>
                    
                </div>
                <hr />
                <div className="train-found-body">
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='text-start'>
                            <div className="train-found-title">{train.source.stationName} ({train.source.stationId})</div>
                            <div className='train-found-text'>{train.sourceDepartureTime}</div>
                        </div>
                        <div className='text-center'>
                            <div className='train-found-text' style={{ marginBottom: '-10px' }}>{Math.abs(train.destination.distance-train.source.distance)} KM</div>
                            <div className="train-found-title">---------</div>
                            <div className="train-found-title" style={{fontSize:'small'}}>Schedule:
                            {
                            schedule.map((day)=>{
                                return(
                                    <span  style={{color:'green',fontSize:'small'}}>{day} </span> 
                                )
                             })
                            }                               
                                                                                   
                    </div>
                        </div>
                        <div className='text-end'>
                            <div className="train-found-title">{train.destination.stationName} ({train.destination.stationId})</div>

                            <div className='train-found-text'>{train.destinationArrivalTime}</div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="train-found-body d-flex justify-content-between">
                <span>To see date wise seat occupancy:</span>                          
                <a type="submit" className="btn btn-primary" href='/'>Click here</a>
                <span>To book ticket,login first:</span>  
                <a type="submit" className="btn btn-success" href='/login'>Go To login</a>        
                </div>
                <br/>
            </div>

    <div class="col-lg-6" >
    <div className="card" >
   <div className="card-body">
    <h5 className="card-title">Route <span>| Train No:{train.trainNo}</span></h5>
    <div className="activity">
    <div className="activity-item d-flex">
    <div className="col-md-3"><b>Distance from source</b></div>
    <div className="col-md-3"></div>
    <div className="col-md-3"><b>Station</b></div>
    <div className="col-md-3"><b>Duration from source</b></div>
    </div>
    <br/>
   
      {
                 
          routes.map((route)=>{
            return(
                <div className="activity-item d-flex">
                <div className="col-md-3">{route.distanceFromSource} Km</div>

                <div className="col-md-3" style={{height:'100%'}}>
                 <i className="bi bi-circle-fill activity-badge text-success align-self-start" ></i>
                <p style={{marginLeft:4,top:0,bottom:0,position:'relative',marginBottom:0}}>|</p> 
                
                </div>
              
                <div className="col-md-3">
                 {route.id.station.stationName}<br/>
                </div>
                <div className="col-md-3">
                 {route.hours} hrs<br/>
                </div>
              </div>
          
            )
        })
      }   
</div> 
</div>
</div>
</div>
        </main>    
    </>
    )
}


export default SearchedTrainDetails