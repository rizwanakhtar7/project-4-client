import React from 'react'
import Loader from 'react-spinners/RingLoader';

function Spinner() {
  return (
    <>
      <div id="loading">
        <Loader type="Circles" color="orange" size={95} timeout={2000}/>
      </div>

    </>
  )
}

export default Spinner