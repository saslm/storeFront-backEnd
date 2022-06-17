import express, { Request, Response } from 'express';
//import bodyParser from 'body-parser';
import dotenv from 'dotenv';

//import userRoutes
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orders_routes from './handlers/orders';


dotenv.config();

const PORT = process.env.PORT;

const app: express.Application = express();


//bodyParser is deprecated, use express.json() instead
//app.use(bodyParser.json());

app.use(express.json());

app.get('/', function (req: Request, res: Response) {
	res.send('Hello-World!');
});

app.listen(3000, function () {
	console.log(`starting app on: ${PORT}`);
});

userRoutes(app);
productRoutes(app);
orders_routes(app);


//Export app for testing
export default app;