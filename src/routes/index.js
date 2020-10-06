/***** For Api Version 1  *****/
import Instance from './api/books';

export default class Routes {
  constructor(router,db) {
    this.router = router;
    this.DatabaseConnect=db;
  }

  async register() {

    /*** Front end Apis  For Version 1 ****/
    
    this.db = await this.DatabaseConnect.getDB();
    this.instance = new Instance(this.router,this.db);
    
    await this.instance.routes();

  }
  
}
