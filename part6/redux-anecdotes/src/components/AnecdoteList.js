import { useDispatch, useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { show } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = [...useSelector((state) => state.anecdotes)].sort((a, b) => b.votes - a.votes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(show(`You voted ${anecdote.content}`, 5000))
  }

  return (
    <div>
      {anecdotes.map(
        (anecdote) =>
          anecdote.content.toLowerCase().includes(filter) && (
            <Anecdote key={anecdote.id} anecdote={anecdote} vote={handleVote} />
          ),
      )}
    </div>
  )
}

export default AnecdoteList
