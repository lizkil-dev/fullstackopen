const Notification = ({info, error}) => {
  if(info === null && error === null){
    return null
  }else if (info) { 
    return (
    <div className='info'>
      {info}
    </div>
  )}else if (error){
    return (
      <div className='error'>
        {error}
      </div>
  )}
}

export default Notification