import { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad }) => 
    <div id="statistics">
      <div id='basic-statistics'>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
      </div>
      <div id='complex-statistics'>
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={ (good - bad) / (good + neutral + bad) } />
        <StatisticLine text="positive" value={`${ good / (good + neutral + bad) * 100 }%`} />
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

  const statistics = !good && !neutral && !bad
    ? <div>No feedback given</div>
    : (<Statistics good={good} neutral={neutral} bad={bad} />)

  return (
    <div>
      <Header text="give feedback" />
      <div id="feedback">
          <Button onClick={handleClick('good')} text="good" />
          <Button onClick={handleClick('neutral')} text="neutral" />
          <Button onClick={handleClick('bad')} text="bad" />
      </div>

      <Header text="statistics" />
      {statistics}
    </div>
  )
}

export default App