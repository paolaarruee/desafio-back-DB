import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import './shared/services/TranslationsYup';
import { router } from './routes';


const server = express();

server.use(cors());


server.use(express.json());

server.use(router);


export { server };