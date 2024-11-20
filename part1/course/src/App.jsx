class Course {
  constructor(name, parts) {
    this.name = name;
    this.parts = parts;
  }

  total() {
    return this.parts.reduce((acc, part) => acc + part.exercises, 0);
  }
}

class CoursePart {
  constructor(name, exercises) {
    this.name = name;
    this.exercises = exercises;
  }
}

const Header = ({name}) => <h1>{name}</h1>;

const Part = ({part}) => {
  const { name, exercises } = part;

  return (
    <p>{name} {exercises}</p>
  );
}

const Content = ({ parts }) => {
  const renderParts = () => parts.map(part => <Part key={part.name} part={part} />);

  return (
    <div>
      {renderParts()}
    </div>
  )
}

const Total = ({total}) => <p><b>Number of exercises: {total}</b></p>;

const CoursePage = ({course}) => 
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.total()} />
    </div>


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
      <CoursePage course={course} />
    </div>
  );
}

export default App;