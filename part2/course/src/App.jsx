import {CourseModel, CoursePartModel} from './models/Course';


const Header = ({name}) => <h1>{name}</h1>;

const Part = ({part}) => {
  const { name, exercises } = part;

  return (
    <p>{name} {exercises}</p>
  );
}

const Content = ({ parts }) => {
  return (
    <div>
      { parts.map(part => <Part key={part.id} part={part} />) }
    </div>
  )
}

const Total = ({total}) => <p><b>total of {total} exercises</b></p>;

const Course = ({course}) => 
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.total()} />
    </div>


const App = () => {
  const course = new CourseModel('Half Stack application development');

  course.addPart(new CoursePartModel(1, 'Fundamentals of React', 10));
  course.addPart(new CoursePartModel(2, 'Using props to pass data', 7));
  course.addPart(new CoursePartModel(3, 'State of a component', 14));
  course.addPart(new CoursePartModel(4, 'Redux', 11));

  return (
    <div>
      <Course course={course} />
    </div>
  );
}

export default App;