import React from 'react'
import loading from '../../assets/ZZ5H.gif'
export default (props) => {
  return (
    <>
      <div style={{
        display: props.loading ? 'flex' : 'none', justifyContent: 'center',
        position: 'fixed', zIndex: 9, width: '100%', left: '10%'
      }} >
        <img src={loading} alt="loading" width={100} />
      </div>
    </>
  )
}