import Navbar from "../components/navbar"
import ticketImage from "../assets/img/trainticket.png"
import wallet from "../assets/img/wallet.jpg"
import enquiry from "../assets/img/enquiry.png"
import cancellation from "../assets/img/cancellation.jpg"
import refund from "../assets/img/refund.png"
import schedule from "../assets/img/schedule.jpg"
import train from "../assets/img/train2.jpg"


const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={train} className="img-fluid" style={{ height: "300px", width: "100%" }} alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h3>
                <marquee style={{ color: 'white' }}>Welcome to Train Reservation System</marquee>
              </h3>

            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">About Us</h5>
          <hr />
          Travelling across the country is now easier than ever because of the complete digitization of the ticketing procedure. Now, you can book train tickets online from the comfort of your home. And it’s not just the train tickets booking system that has been revolutionized. All other services such as live train status, train schedule, and train availability are easy-to-use as well. You only have to enter your login credentials to book train tickets with ease.
          There are several reasons why our website is one of the most trusted online ticket booking platforms, and we will discuss the same later. For now, let us find out the process by which you can book train tickets easily. Remember, having an  Email ID and password is mandatory even if you are trying to book train tickets.
          <h5 className="card-title">Why Book Train Tickets With us?</h5>
          <hr />
          <section class="section">
            <center>
              <div class="row d-flex justify-content-center">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">
                        <img src={ticketImage} style={{ height: 30, width: 30 }}></img> Get Train Tickets</h5>
                      With our same train alternates and prediction feature, increase your chances of getting confirm train tickets.
                    </div>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">
                        <img src={wallet} style={{ height: 30, width: 30 }}></img> Wallet Enable Secured Payment</h5>

                      Payment on train reservation system is highly secured. Easy payment modes available.
                    </div>
                    <br />
                  </div>
                </div>
              </div>


              <div class="row d-flex justify-content-center">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">
                        <img src={cancellation} style={{ height: 30, width: 30 }}></img> Free Cancellation on Tickets</h5>
                      Get a full refund on train tickets by opting our free cancellation feature.
                    </div>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">
                        <img src={enquiry} style={{ height: 30, width: 30 }}></img>
                        Booking and Enquiry Support</h5>
                      24X7 customer support, for any train enquiry and booking related queries call 0411-152545.
                    </div>
                  </div>
                </div>
              </div>

              <div class="row d-flex justify-content-center">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">
                        <img src={refund} style={{ height: 30, width: 30 }}></img> Instant Refund and Cancellation</h5>
                      Get an instant refund and book your next train ticket easily.
                    </div>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">
                        <img src={schedule} style={{ height: 30, width: 30 }}></img>
                        Train Schedule Tracking</h5>
                      Train schedule and can also download your train tickets.
                    </div>
                  </div>
                </div>
              </div>




            </center>
          </section>


        </div>
      </div>

    </>
  )
}

export default AboutUs