const {Schema, model} = require('mongoose')

const sсhema = new Schema({
    title: {type: String, required: true, unique: true},
    link: {type: String, required: true, unique: true},
    id1: {type: String, required: true},
    id2: {type: String, required: true}

})

module.exports = model('Card', sсhema)
