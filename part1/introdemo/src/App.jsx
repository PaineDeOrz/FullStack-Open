const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    } 
  ] 
  }
  return (
    <div>
      <Head name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}

const Head = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = (props) => {
  const exercises1 = props.exercises[0].exercises;
  const exercises2 = props.exercises[1].exercises;
  const exercises3 = props.exercises[2].exercises;

  const totalExercises = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

export default App