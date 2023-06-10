// Revised code after viewing the solution, not intended for submission

import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const numAnecdotes = anecdotes.length
  const [selected, setSelected] = useState(Math.floor(Math.random() * numAnecdotes))
  const [votes, setVotes] = useState(Array(numAnecdotes).fill(0))
  const [maxIndex, setMaxIndex] = useState(0)

  const SelectRandom = () => {
    while (true) {
      const possibleNext = Math.floor(Math.random() * numAnecdotes) 
      if (possibleNext !== selected) return setSelected(possibleNext)
    }
  }

  const SetVotes = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)

    if (votesCopy[selected] > votes[maxIndex]) setMaxIndex(selected)
  }

  return (
    <div>
      <p><b>Anecdotes of the day</b></p>
      <div>{anecdotes[selected]}</div>
      <div>{votes[selected]} votes</div>
      <button onClick={SetVotes}>Vote</button>
      <button onClick={SelectRandom}>Next</button>
      <p><b>Anecdotes with the most votes</b></p>
      <div>{anecdotes[maxIndex]}</div>
      <div>{votes[maxIndex]} votes</div>
    </div>
  )
}

export default App

// Revised code after viewing the solution, not intended for submission
