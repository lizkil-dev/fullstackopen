import Header from './Header'
import Content from './Content'


const Courses = ({ courses }) => {
      return (
      <>
      <Header courses = {courses.name} />
      <Content parts = {courses.parts} />
      </>
    )
  }
  
export default Courses