import { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, neutral, bad }) => 
    <table id="statistics">
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={ (good - bad) / (good + neutral + bad) } />
        <StatisticLine text="positive" value={`${ good / (good + neutral + bad) * 100 }%`} />
      </tbody>
    </table>

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