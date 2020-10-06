import config from 'config';
import { MongoClient } from 'mongodb';

export default class DB {
	//seq;
	mongoSession;
	mongod; mongo;
	dbConfig = config.db;
	mongoConfig = this.dbConfig.mongo;

	DB_BOOKS = 'Books';

	db = {};
	MONGO_URI = `mongodb://${this.mongoConfig.host}:${this.mongoConfig.port}/${this.mongoConfig.database}`;

	async init() {
		await this.connectMongo();
		await this.setupModels();
	}

	async connectMongo() {
		try {
			this.mongod = await MongoClient.connect(this.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true});
			this.mongo = await this.mongod.db(this.mongoConfig.database);
			this.mongod.withSession(session => {
				this.mongoSession = session;
			});
		}
		catch(err) {
			throw err;
		}
	}

	async setupModels() {
		this.db.models = {};
		this.db.models.Books = this.mongo.collection(this.DB_BOOKS);
		this.db.mongoSession = this.mongoSession;
	}

	async getDB() {
		return this.db;
	}

}
