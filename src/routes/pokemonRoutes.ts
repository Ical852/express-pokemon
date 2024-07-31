import { Router } from "express";
import {
  getPokemons,
  findPokemon,
  catchPokemon,
  releasePokemon,
  renamePokemon,
} from '../controllers/pokemonController';

const router = Router();

router.get('/', getPokemons);
router.post('/find', findPokemon);
router.post('/catch', catchPokemon);
router.post('/release/:id', releasePokemon);
router.post('/rename/:id', renamePokemon);

export default router;
