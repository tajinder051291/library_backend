import { RESPONSE_CODES } from '../../config/constants';

export const authMiddleWare = async  (req, res, next) => {
  try {
    
    const ignorePaths = ['/api/book/create','/api/books/listing','/api/book/update','/api/book/delete/?'];
    
    const {
      method,
      headers,
      originalUrl
    } = req;

    if ((method === 'DELETE' && originalUrl.includes("?bookId=")) ) {
      return next();
    }
    
    const ignoreIndex = ignorePaths.findIndex(item => item === originalUrl);
    if (ignoreIndex > -1) {
      return next();
    }else{
       return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: 'Invalid Request' });
    }
  }
  catch(error) {
    return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error });
  }
};
