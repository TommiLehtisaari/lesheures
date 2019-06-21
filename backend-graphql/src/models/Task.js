const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
  // hourlogs: [{ type: Schema.Types.ObjectId, ref: 'Hourlog' }],
  // project: { type: Schema.Types.ObjectId, ref: 'Project' }
})

module.exports = mongoose.model('Task', schema)
