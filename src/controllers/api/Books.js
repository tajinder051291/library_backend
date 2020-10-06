import { RESPONSE_CODES } from '../../../config/constants';
import Services from '../../services/api/Books';
import { validator } from '../../helpers/schemaValidator';
import { saveBook, updateBook, deleteBook } from '../../validators/Books';
import moment from 'moment-timezone';

export default class BooksInstance {

  async init(db) {
    this.services = new Services();
    await this.services.init(db);
  }

  async createBook(req, res) {
    try {
      const {body} = req;
      const {isError, errors} = validator(body, saveBook);

      if (isError) {
        return res.status(RESPONSE_CODES.BAD_REQUEST).json({
          status: 0,
          message: 'Invalid Input, Contact Support',
          error: errors,
          status_code:RESPONSE_CODES.BAD_REQUEST
        });
      }

      if(body.releaseDate){
        if(!moment(body.releaseDate, 'YYYY/MM/DD',true).isValid()){
          return res.status(RESPONSE_CODES.BAD_REQUEST).json({
            status: 0,
            message: 'Invalid Input, Contact Support',
            error: "Invalid Date Format 'YYYY/MM/DD' ",
            status_code:RESPONSE_CODES.BAD_REQUEST
          });
        }
      }
      
      const bookDetails = await this.services.insert(body);
      if(bookDetails){
        return res.status(RESPONSE_CODES.POST).json({
          status: 1,
          message: 'Book Added Successfully',
          status_code:RESPONSE_CODES.POST
        });
      }
      
      return res.status(RESPONSE_CODES.ERROR).json({
        status: 0,
        message: 'Something went wrong, please try later',
        status_code:RESPONSE_CODES.ERROR
      });

    }
    catch(error) {
      return res.status(RESPONSE_CODES.ERROR).json({ error });
    }
  }

  async updateBook(req, res) {
    try {
      const {body} = req;
      
      const {isError, errors} = validator(body, updateBook);

      if (isError) {
        return res.status(RESPONSE_CODES.BAD_REQUEST).json({
          status: 0,
          message: 'Invalid Input, Contact Support',
          error: errors,
          status_code:RESPONSE_CODES.BAD_REQUEST
        });
      }

      if(body.releaseDate){
        if(!moment(body.releaseDate, 'YYYY/MM/DD',true).isValid()){
          return res.status(RESPONSE_CODES.BAD_REQUEST).json({
            status: 0,
            message: 'Invalid Input, Contact Support',
            error: "Invalid Date Format 'YYYY/MM/DD' ",
            status_code:RESPONSE_CODES.BAD_REQUEST
          });
        }
      }

      const response = await this.services.update(body);

      if(response){
        return res.status(RESPONSE_CODES.PUT).json({
          status: 1,
          message: 'Book successfully updated',
          status_code:RESPONSE_CODES.PUT,
        });
      }else{
        return res.status(RESPONSE_CODES.FORBIDDEN).json({
          status: 0,
          message: 'Invalid BookId',
          status_code:RESPONSE_CODES.FORBIDDEN
        });
      }
    }
    catch(error) {
      return res.status(RESPONSE_CODES.ERROR).json({
        error
      });
    }
  }

  async deleteBook(req, res) {
    try {
      const { query } = req;
      let body = {};
      body.bookId=query.bookId;
      const {isError, errors} = validator(body, deleteBook);

      if (isError) {
        return res.status(RESPONSE_CODES.BAD_REQUEST).json({
          status: 0,
          message: 'Invalid Input, Contact Support',
          error: errors,
          status_code:RESPONSE_CODES.BAD_REQUEST
        });
      }

      const response = await this.services.toDelete(body);
      if(response){
        return res.status(RESPONSE_CODES.DELETE).json({
          status: 1,
          message: 'Book successfully deleted',
          status_code:RESPONSE_CODES.DELETE,
        });
      }else{
        return res.status(RESPONSE_CODES.FORBIDDEN).json({
          status: 0,
          message: 'Invalid BookId',
          status_code:RESPONSE_CODES.FORBIDDEN
        });
      }
    }
    catch(error) {
      return res.status(RESPONSE_CODES.ERROR).json({
        error
      });
    }
  }

  async getBooks(req, res) {
    try {

      const bookslisting = await this.services.booksListing();
      return res.status(RESPONSE_CODES.GET).json({
        status: 1,
        message: 'Books Listing',
        status_code:RESPONSE_CODES.GET,
        data:bookslisting
      });

    }
    catch(error) {
      this.logger.logError('Forum Listing Error', error);
      return res.status(RESPONSE_CODES.ERROR).json({
        error
      });
    }
  }

}
