const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.sen('<h>Hello World!</h1>')
})

app.get('/api/persons', (reuest, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`Phonebook has info for ${persons.length} people<br>${date}`)
})

app.post('/api/persons', (request, response) => {
    const generateId = () => {
        const maxId = persons.length > 0
          ? Math.max(...persons.map(n => Number(n.id)))
          : 0
        return String(maxId + 1)
      }
      
    const body = request.body
    if (!body.name) {
          return response.status(400).json({ 
            error: 'name missing' 
          })
        }
    if (!body.number) {
          return response.status(400).json({ 
            error: 'number missing' 
          })
        }
    if (persons.some(p => p.name === body.name)) {
          return response.status(400).json({ 
            error: 'name must be unique' 
          })
        }
    if (persons.some(p => p.number === body.number)) {
          return response.status(400).json({ 
            error: 'number must be unique' 
          })
        }
      
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
      
    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})