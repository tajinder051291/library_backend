import BooksController from '../../controllers/api/Books';

export default class Instance {
  constructor(router,db) {
    this.router = router;
    this.db = db;
    this.BooksInstance = new BooksController();
  }

  async routes() {
    await this.BooksInstance.init(this.db);

    this.router
      .route('/api/book/create')
      .post((req, res) => this.BooksInstance.createBook(req, res));

    this.router
      .route('/api/book/update')
      .put((req, res) => this.BooksInstance.updateBook(req, res));

    this.router
      .route('/api/book/delete')
      .delete((req, res) => this.BooksInstance.deleteBook(req, res));

    this.router
      .route('/api/books/listing')
      .get((req, res) => this.BooksInstance.getBooks(req, res));
    
  }
}
