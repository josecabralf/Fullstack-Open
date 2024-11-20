const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.part} part={part.part} exercises={part.exercises} />)}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
  )
}

class CoursePart {
  constructor(part, exercises) {
    this.part = part;
    this.exercises = exercises;
  }
}

class Course {
  constructor(name, parts) {
    this.name = name;
    this.parts = parts;
  }
}

const App = () => {
  const course = new Course(
    'Half Stack application development', 
    [
      new CoursePart('Fundamentals of React', 10),
      new CoursePart('Using props to pass data', 7),
      new CoursePart('State of a component', 14)
    ]
  );

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App