

const Error403 = () => {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <br />
      <div className="w3-display-middle" style={{ marginTop: 150 }}>
        <h1 className="w3-jumbo w3-animate-top w3-center" style={{ color: 'red', fontWeight: 'bolder' }}>Access Denied</h1>
        <hr className="w3-border-white w3-animate-left" style={{ margin: 'auto', width: '50%' }} />
        <h3 className="w3-center w3-animate-right">You dont have permission to view this site.</h3>
        <h3 className="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
        <h6 className="w3-center w3-animate-zoom" style={{ color: 'red', textDecoration: 'underline' }}>
          error code : 403 forbidden</h6>
      </div>

    </div>



  )
}

export default Error403