import React from 'react'

const PassengerInput = (props) => {

    const { fare } = props;

    return (
        <>
            <div className="col-md-2">
                <input type="text" className="form-control" id="validationCustom01" defaultValue="John" required />
                <div className="invalid-feedback">
                    Please provide passenger name!
                </div>
            </div>
            <div className="col-md-2">
                <select className="form-select" id="validationCustom04" required>
                    {/* <option defaultValue="MALE" disabled value>MALE</option> */}
                    <option defaultValue="MALE">MALE</option>
                    <option>FEMALE</option>
                </select>
                <div className="invalid-feedback">
                    Please select a valid state.
                </div>
            </div>
            <div className="col-md-2">
                <div className="input-group has-validation">
                    <input type="number" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                    <div className="invalid-feedback">
                        Please provide passenger age.
                    </div>
                </div>
            </div>
            <div className="col-md-2">
                <select className="form-select" id="validationCustom04" required>
                    {/* <option selected disabled value>Choose...</option> */}
                    <option defaultValue="PAN">PAN</option>
                    <option>AADHAR</option>
                </select>
                <div className="invalid-feedback">
                    Please select an ID card type.
                </div>
            </div>
            <div className="col-md-2">
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                    <div className="invalid-feedback">
                        Please provide passenger age.
                    </div>
                </div>
            </div>
            <div className="col-md-2">
                <input type="text" className="form-control" id="validationCustom05" defaultValue={fare} disabled required />
                <div className="invalid-feedback">
                    Please provide a valid zip.
                </div>
            </div>
        </>
    )
}

export default PassengerInput