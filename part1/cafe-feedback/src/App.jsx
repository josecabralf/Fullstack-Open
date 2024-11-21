import { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
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
      <div id="buttons">
        <Header text="give feedback" />
        <div>
          <Button onClick={handleClick('good')} text="good" />
          <Button onClick={handleClick('neutral')} text="neutral" />
          <Button onClick={handleClick('bad')} text="bad" />
        </div>
      </div>

      <div id="statistics">
        <Header text="statistics" />
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
      </div>
    </div>
  )
}

export default App