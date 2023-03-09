import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad, all, average }) => {
  return (all == 0 ? 'no feedback given' :
    <>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average == 0 ? 0 : average / all} />
      <StatisticLine text="positive" value={all == 0 ? 0 : (100 * good) / all} />
    </>)
}


const StatisticLine = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>{props.text}: {props.value}</th></tr>
      </thead>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
    setAverage(average + 1)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(updatedNeutral + good + bad)

  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(updatedBad + good + neutral)
    setAverage(average - 1)
  }

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
      </div>

    </>
  )
}

export default App