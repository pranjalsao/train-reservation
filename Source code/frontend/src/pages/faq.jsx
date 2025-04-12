import Navbar from "../components/navbar"
import train from "../assets/img/faqimage.jpg"


const Faq=()=>{
        return(
            <>
             <Navbar/>

    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={train} className="img-fluid" style={{height:"300px",width:"100%"}}  alt="..." />
      <div className="carousel-caption">
        <h1>
       
        <p style={{color:'white',marginBottom:0}}><b>
        <i class="bi bi-question-circle"></i>FAQ </b></p>
        </h1>
        <p style={{color:'white',marginBottom:0}}>Frequently Asked Questions</p>
      </div>
    </div>
  </div>
</div>


            <div className="card">
            <div className="card-body">
              <h4 className="card-title contentWrap">How to Book Train Tickets</h4>
              <hr/>
              It is extremely easy to book train tickets. 

<p style={{marginBottom:0}}>
Below, we are mentioning the steps that you can follow to make your bookings quickly.
</p>

<p style={{marginBottom:0}}>Step 1: Choose the source of your journey and the destination to get your train tickets book. Select the date on which you wish to start the journey </p>
<p style={{marginBottom:0}}>Step 2: Now, you will have a list of trains based on your destination and source. You have to choose the one you want to book tickets for.</p>
<p style={{marginBottom:0}}>Step 3: Filter and select the seat class. You can choose from a wide variety of options such as sleeper, seater, first-class AC, second-class AC and third-class AC. </p>
<p style={{marginBottom:0}}>Step 4: Select your boarding point. Enter the berth preferences and passenger details. There can be multiple passengers, and you will have to enter the details of each person separately. 
</p>
<p style={{marginBottom:0}}>Step 5: Enter the necessary contact details including email and mobile number. 
</p>

<p style={{marginBottom:0}}>Step 6: Once you have filled all the above-stated details, you can make payment through your linked wallet and if needed you can also add some amount of money in your wallet. </p>
<p style={{marginBottom:0}}>Step 7:  You will soon be redirected to the final page, and your tickets will be confirmed. Insantly, you can download your ticket. </p>

As you can see, the process is immensely easy, and it’s much better than spending hours just waiting in front of the railway ticket counter for your turn. If you are using train reservation system for ticket booking, the procedure is pretty much the same. You will notice that having a valid account is mandatory for you to be eligible for making your railway ticket booking. 



<h4 className="card-title contentWrap">Essential Documents to Carry</h4>
<hr/>
<p style={{marginBottom:0}}>It is essential to carry a few important documents, including government approved ID documents, when you board a train. You must present the same when the Travelling Ticket Examiner asks for it along with your tickets. Here is a list of the important documents that you should keep handy while travelling:  </p>
<p style={{marginBottom:0}}>1: Adhar Card</p>
<p style={{marginBottom:0}}>2: PAN Card </p>
<p style={{marginBottom:0}}>3: Driving license 
</p>
<p style={{marginBottom:0}}>4: Voter Card
</p>
<p style={{marginBottom:0}}>5: Passport
</p>

              </div>
              </div>
              
            
            </>
           

        )
}


export default Faq