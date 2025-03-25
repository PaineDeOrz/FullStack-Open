import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else{
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticsLine text='good' value={good}/>
      <StatisticsLine text='neutral' value={neutral}/>
      <StatisticsLine text='bad' value={bad}/>
      <StatisticsLine text='all' value={good + neutral + bad}/>
      <StatisticsLine text='average' value={(good - bad) / (good + neutral + bad)}/>
      <StatisticsLine text='positive' value={(good / (good + neutral + bad)) * 100 + ' %'}/>
    </div>)
    }
}

const StatisticsLine = (props) => {
  return(
    <p>{props.text}: {props.value}</p>
  )
}

const Button = (props) =>{
  if(props.text === 'good'){
    return(
      <button onClick={props.onClick}>good</button>
    )
  }
  if(props.text === 'neutral'){
    return(
      <button onClick={props.onClick}>neutral</button>
    )
  }
  if(props.text === 'bad'){
    return(
      <button onClick={props.onClick}>bad</button>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App