import Joi from 'joi';

module.exports = {
  
  saveBook: Joi.object().keys({
    author: Joi.string().required().min(2).max(30).error(() =>'Author is required'),
    title:  Joi.string().required().min(2).max(30).error(() =>'Title is required'),
    ISBN:   Joi.string().required().min(13).max(13).error(() => 'ISBN must be 13 digits'),
    releaseDate:Joi.date().allow('').error(() => 'Please provide valid Date format YYYY/MM/DD')
  }),

  updateBook: Joi.object().keys({
    bookId: Joi.string().guid().required().error(() => 'BookId is required'),
    author: Joi.string().required().min(2).max(30).error(() =>'Author is required'),
    title:  Joi.string().required().min(2).max(30).error(() =>'Title is required'),
    ISBN:   Joi.string().required().min(13).max(13).error(() => 'ISBN must be 13 digits'),
    releaseDate:Joi.date().allow('').error(() => 'Please provide valid Date format YYYY/MM/DD')
  }),

  deleteBook: Joi.object().keys({
    bookId: Joi.string().guid().required().error(() => 'BookId is required')
  })
  
};