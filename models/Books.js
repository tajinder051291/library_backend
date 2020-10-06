module.exports = {
  id: {type: 'UUID', required: true},
  author: {type: 'String',required: true},
  title:  {type: 'String',required: true},
  ISBN:   {type: 'String',required: true},
  releaseDate: {type: 'Date', required: false},
  _deleted: {type: 'Boolean', required: true, default: false},
  createdAt: {type: 'Timestamp'},
  updatedAt: {type: 'Timestamp'}
};

