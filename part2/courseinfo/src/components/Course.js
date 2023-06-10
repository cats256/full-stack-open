const Header = ({ course }) => <h3>{course}</h3>

const Content = ({ parts }) => <>{parts.map(parts => <Part key={parts.id} part={parts} />)}</>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Course = ({ course }) => (
  <>
    <h2>Web Development Curriculum</h2>
    {course.map(course => 
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((partialSum, part) => partialSum + part.exercises, 0)} />
    </div>
    )}
  </>
)

export default Course