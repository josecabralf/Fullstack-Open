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
    <p>Number of exercises {props.total}</p>
  )
}

class CoursePart {
  part;
  exercises;

  constructor(part, exercises) {
    this.part = part;
    this.exercises = exercises;
  }
}

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    new CoursePart('Fundamentals of React', 10),
    new CoursePart('Using props to pass data', 7),
    new CoursePart('State of a component', 14)
  ];
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  )
}

export default App