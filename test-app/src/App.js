import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'bold',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <div>Note app, Department of Computer Science, University of Helsinki 2022</div>
    </div>
  )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
    }, [])
    
    console.log('render', notes.length, 'notes')
  
    const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        important: Math.random() > 0.5
      }
  
      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
    }

    const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }
  
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
              <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
              </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                  <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                  
                )}
            </ul>
            <form onSubmit={addNote}>
              <input value={newNote} onChange={handleNoteChange}/>
              <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    )
}

export default App