const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://painedeorz:4ndr31t0d1@db.wbnxw2w.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=DB`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
else if(process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    mongoose.connection.close()
  })
  console.log('Added ' + process.argv[3] + ' number ' + process.argv[4] + ' to phonebook')
} else {
  console.log('Invalid number of arguments')
  mongoose.connection.close()
}