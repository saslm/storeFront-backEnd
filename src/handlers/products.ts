import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import verifyToken from '../middleware/authToken';

const productStore= new ProductStore();

const index = async (_req: Request, res: Response) => {
	const products = await productStore.index();
	res.json(products);
};

const show = async (req: Request, res: Response) => {
	const product = await productStore.show(req.params.id as unknown as number);
	res.json(product);
};

const create = async (req: Request, res: Response) => {
	const product: Product = {
		name: req.body.name,
		price: req.body.price,
		category: req.body.category
	};

	try {
		const newProduct = await productStore.create(product);
		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(err + product);
	}
};

const edit = async (req: Request, res: Response) => {
	const product: Product = {
		name: req.body.name,
		price: req.body.price,
		category: req.body.category,
		id: req.body.id
	};

	try {
		const editedProduct = await productStore.edit(product);
		res.json(editedProduct);
	} catch(err) {
		res.status(400);
		res.json(err + product);
	}
};

const destroy = async (req: Request, res: Response) => {
	const product = await productStore.delete(req.body.id as unknown as number);
	res.json(product);
};

const productRoutes = (app: express.Application): void => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', verifyToken, create);
	app.patch('/products/:id', verifyToken, edit);
	app.delete('/products', verifyToken, destroy);
};
export default productRoutes;