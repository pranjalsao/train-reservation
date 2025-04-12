import background from '../assets/img/train.jpg'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import config from '../config'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/navbar'

const Register = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userEmail, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userMobile, setMobile] = useState('')
  const [userDob, setDob] = useState('')
  const [userAddress, setAddress] = useState('')
  const [securityQues, setQusetion] = useState('')
  const [securityAns, setAnswer] = useState('')
  const [mesg, setMesg] = useState('')
  const [role, setRole] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setRole("USER")
  }, [])

  const body = {
    firstName,
    lastName,
    userEmail,
    userPassword,
    userMobile,
    userAddress,
    userDob,
    securityQues,
    securityAns,
    role
  }

  const register = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      form.classList.add('was-validated');
    }
    else if (userPassword !== confirmPassword) {
      toast.error('Password and Confirm Password do not match!')
    } else {
      axios.post(config.URL + '/register', body).then((response) => {
        if (response.status === 201) {
          toast.success("You are successfully registered!")
          navigate('/login')
        }

        console.log('Printing data', response.data);
      })
        .catch((error) => {
          console.log('Something went wrong', error);
          toast.error("Email or Password is not matching validation criteria.Try different one!")
          navigate('/register')
        })
    }
  }

  return (
    <>
      <Navbar />
      <div class="container-fluid" style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
      }}>

        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div className='container'>
                  {mesg.length > 0 && <b style={{ color: 'red' }}>{mesg}</b>}
                </div>

                <div className="card mb-3">

                  <div className="card-body">

                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                      <p className="text-center small">Enter your personal details to create account</p>
                    </div>

                    <form className="row g-3 needs-validation" noValidate onSubmit={register}>
                      <div className="col-12">
                        <label for="firstName" className="form-label">Your First Name</label>
                        <input type="text" name="firstName" className="form-control" id="firstName" required
                          onChange={(event) => {
                            setFirstName(event.target.value)
                          }} />
                        <div className="invalid-feedback">Please, enter your First name!</div>
                      </div>

                      <div className="col-12">
                        <label for="lastName" className="form-label">Your Last Name</label>
                        <input type="text" name="lastName" className="form-control" id="lastName" required
                          onChange={(event) => {
                            setLastName(event.target.value)
                          }} />
                        <div className="invalid-feedback">Please, enter your Last name!</div>
                      </div>


                      <div className="col-12">
                        <label for="userEmail" className="form-label">Your Email</label>
                        <input type="email" name="userEmail" className="form-control" id="userEmail" required
                          onChange={(event) => {
                            setEmail(event.target.value)
                          }} />
                        <div className="invalid-feedback">Please enter a valid Email adddress!</div>
                      </div>



                      <div className="col-12">
                        <label for="userPassword" class="form-label">Password</label>
                        <input type="password" name="userPassword" className="form-control" id="userPassword" required
                          onChange={(event) => {
                            setPassword(event.target.value)
                          }} />
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>

                      <div className="col-12">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input type="password" name="password" className="form-control" id="confirmPassword" required
                          onChange={(event) => {
                            setConfirmPassword(event.target.value)
                          }} />
                        <div className="invalid-feedback">Please confirm password!</div>
                      </div>

                      <div className="col-12">
                        <label for="userMobile" class="form-label">Your Mobile No.</label>
                        <div className="input-group has-validation">
                          <input type="text" name="userMobile" className="form-control" id="userMobile" required
                            onChange={(event) => {
                              setMobile(event.target.value)
                            }} />
                          <div className="invalid-feedback">Please enter Mobile No.!</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label for="userAddress" class="form-label">Your Address</label>
                        <input type="text" name="userAddress" className="form-control" id="userAddress" required
                          onChange={(event) => {
                            setAddress(event.target.value)
                          }} />
                        <div className="invalid-feedback">Please enter your Address!</div>
                      </div>

                      <div className="col-12">
                        <label for="userDob" class="form-label">Your Date Of Birth</label>
                        <input type="Date" name="userDob" className="form-control" id="userDob" required
                          onChange={(event) => {
                            setDob(event.target.value)
                          }} />
                        <div className="invalid-feedback">Please enter your Date of Birth!</div>
                      </div>

                      <div className="col-12">
                        <label for="securityQues" class="form-label">Security Question</label>
                        <select id="securityQues" className='form-select' name="securityQues" size="1" onChange={(event) => {
                          setQusetion(event.target.value)
                        }}>
                          <option value="0">Please select Security Question</option>
                          <option value="What is your hobby?" >What is your hobby?</option>
                          <option value="What is your favourite sports?">What is your favourite sports?</option>
                          <option value="What is your favourite color?">What is your favourite color?</option>
                          <option value="What is your favourite movie?">What is your favourite movie?</option>
                        </select>
                        <div className="invalid-feedback">Please select Security Question!</div>
                      </div>

                      <div className="col-12">
                        <label for="securityAnswer" class="form-label">Security Answer</label>
                        <input type="text" name="answer" className="form-control" id="securityAnswer" required
                          onChange={(event) => {
                            setAnswer(event.target.value)
                          }} />
                        <div className="invalid-feedback">Please enter Security Answer!</div>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
                          <label className="form-check-label" for="acceptTerms">I agree and accept the <a href="#">terms and conditions</a></label>
                          <div className="invalid-feedback">You must agree before submitting.</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit" >Create Account</button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">Already have an account? <a href="/login">Log in</a></p>
                      </div>
                    </form>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

      </div>

    </>


  );
}

export default Register