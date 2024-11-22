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

export const Course = ({course}) => 
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.total()} />
    </div>