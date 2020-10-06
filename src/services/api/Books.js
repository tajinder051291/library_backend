import uuid from 'uuid/v1';
import DB from '../../helpers/db';
import { TIMEZONE } from '../../../config/constants';
import moment from 'moment-timezone';

export default class BookServices {

  async init(db) {
    this.model = db.models.Books;
  }

  async insert(payload) {
    try {
      let response = {};
      let todayDate=moment().tz(TIMEZONE).format('x');
      if(!payload.releaseDate){
        payload.releaseDate=null;
      }
      payload.id = uuid();
      payload.createdAt = todayDate;
      payload.updatedAt = todayDate;
      payload._deleted  = false;
      const bookSave = await this.model.insertOne(payload);
      if(!bookSave){
        return response;
      }
      return payload;  
    }
    catch (error) {
      console.log("Insert Book Error",error);
      throw error;
    }
  }

  async update(details) {
    try {
      let todayDate=moment().tz("UTC").format('x');
      
      const query = {
        id: details.bookId,
        _deleted: false,
      };

      const bookDetails = await this.model.findOne(query);
      if(bookDetails){
        let payload={};
        
        if(!details.releaseDate){
          details.releaseDate = null;
        }

        payload.author = details.author;
        payload.ISBN = details.ISBN;
        payload.title = details.title;
        payload.updatedAt = todayDate;
        return await this.model.updateOne(query, {
          $set: payload
        });
      
      }else{
        return false;
      }
    }
    catch (error) {
      console.log('Something went wrong while updating Book', error);
      throw error;
    }
  }

  async toDelete(details) {
    try {
      let todayDate=moment().tz("UTC").format('x');
      const query = {
        id: details.bookId,
        _deleted: false,
      };
      const bookDetails = await this.model.findOne(query);
      if(bookDetails){
        let payload={};
        payload._deleted = true;
        payload.updatedAt = todayDate;
        return await this.model.updateOne(query, {
          $set: payload
        });
      }else{
        return false;
      }
    }
    catch (error) {
      console.log('Something went wrong while Deleteing Book', error);
      throw error;
    }
  }

  async booksListing(details) {
    try {
      let query={
        _deleted: false
      };
      const BooksListing = await this.model.aggregate([
        { $sort : { createdAt : -1} },
        {
          $match: query,
        },
        {
          $project:{
            _deleted:0,
            _id:0
          }
        }
      ]).toArray();
      return BooksListing;
    }
    catch (error) {
      this.logger.logError('Something went wrong while fetching', error);
      throw error;
    }
  }

  

}
