import express from 'express';
import Joi from 'joi';
import TokensModel from 'models/Tokens';
import { handlerWrapper } from './utils';
import Session from '../infra/database/Session';
import TokensRepository from '../infra/database/TokensRepository';

const router = express.Router();

router.get(
  '/:tokenId',
  handlerWrapper(async (req, res) => {
    Joi.assert(req.params.tokenId, Joi.string().required());
    const repo = new TokensRepository(new Session());
    const exe = TokensModel.getById(repo);
    const result = await exe(req.params.tokenId);
    res.send(result);
    res.end();
  }),
);

export default router;
