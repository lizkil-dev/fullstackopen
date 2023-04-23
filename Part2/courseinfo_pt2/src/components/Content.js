import Parts from './Parts'



const Content = ({ parts }) => {

  
  const total = parts.reduce((sum, c) => sum += c.exercises, 0)
 
  return (
    <>
    <ul>
      {parts.map(part => 
      <Parts key = {part.id} part={part} />
      )}
    </ul>
    <p>Number of Exercises: {total}</p> 
    
    </>
  )
}

export default Content