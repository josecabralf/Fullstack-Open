import {CourseModel, CoursePartModel} from './models/CourseModels';
import {Course} from './components/Course';


const App = () => {
  const course = new CourseModel('Half Stack application development');

  course.addPart(new CoursePartModel(1, 'Fundamentals of React', 10));
  course.addPart(new CoursePartModel(2, 'Using props to pass data', 7));
  course.addPart(new CoursePartModel(3, 'State of a component', 14));
  course.addPart(new CoursePartModel(4, 'Redux', 11));

  const courses = [
    new CourseModel(1, 'Half Stack application development', [
      new CoursePartModel(1, 'Fundamentals of React', 10),
      new CoursePartModel(2, 'Using props to pass data', 7),
      new CoursePartModel(3, 'State of a component', 14),
      new CoursePartModel(4, 'Redux', 11)
    ]),
    new CourseModel(2, 'Node.js', [
      new CoursePartModel(1, 'Routing', 3),
      new CoursePartModel(2, 'Middlewares', 7)
    ])
  ];

  return (
    <div>
      {courses.map((course, i) => <Course key={i} course={course} />)}
    </div>
  );
}

export default App;