import { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ text, value }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad }) => 
    <div id="statistics">
      <Header text="statistics" />
      <div id='basic-statistics'>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
      </div>
      <div id='complex-statistics'>
        <Statistic text="all" value={good + neutral + bad} />
        <Statistic text="average" value={(good - bad)/(good + neutral + bad) || '0'} />
        <Statistic text="positive" value={`${good/(good + neutral + bad) * 100 || '0'}%`} />
      </div>
    </div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (type) => {
    if (type === 'good')
      return () => setGood(good + 1)
    if (type === 'neutral')
      return () => setNeutral(neutral + 1)
    if (type === 'bad')
      return () => setBad(bad + 1)
  }

  return (
    <div>
      <div id="feedback">
        <Header text="give feedback" />
        <div>
          <Button onClick={handleClick('good')} text="good" />
          <Button onClick={handleClick('neutral')} text="neutral" />
          <Button onClick={handleClick('bad')} text="bad" />
        </div>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App