import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';
import MobileSessionController from './app/controllers/MobileSessionController';

import PendingDeliveryController from './app/controllers/PendingDeliveryController';
import CompletedDeliveryController from './app/controllers/CompletedDeliveryController';
import StartDeliveryController from './app/controllers/StartDeliveryController';
import EndDeliveryController from './app/controllers/EndDeliveryController';

import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliveryCancelController from './app/controllers/DeliveryCancelController';

import authMiddleware from './app/middlewares/auth';
import authMiddlewareAdmin from './app/middlewares/authAdmin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/users', UserController.store);

// Mobile routes to deliveryman
routes.get('/deliveryman/:id/sessions', MobileSessionController.show);
// Pending orders and not canceled
routes.get('/deliveryman/:id/pending', PendingDeliveryController.index);
// Can see the orders done
routes.get('/deliveryman/:id/deliveries', CompletedDeliveryController.index);
// Route to deliveryman start the order
routes.put('/deliveries/:id/start', StartDeliveryController.update);
// Route to deliveryman end the order
routes.put('/deliveries/:id/end', EndDeliveryController.update);
// This route the deliveryman can use because the route to register the problem
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
// Route to show all problems orders
routes.get('/delivery/:id/problems', DeliveryProblemController.show);

// Routes that the deliveryman has the access
routes.get('/delivery/:deliveryman_id/deliveries', DeliveryController.show);
routes.put(
    '/delivery/:deliveryman_id/deliveries/:order_id',
    DeliveryController.update
);
routes.post('/delivery', DeliveryController.store);

// Below these routes, who can access is only who has authentication
routes.use(authMiddleware);
routes.use(authMiddlewareAdmin);

routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.get('/deliveryman', DeliverymanController.index);
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);
routes.get('/orders', OrderController.index);

routes.get('/delivery/:order_id/problems', DeliveryProblemController.show);
routes.get('/delivery/problems', DeliveryProblemController.index);

routes.delete('/problem/:id/cancel', DeliveryCancelController.delete);

export default routes;
