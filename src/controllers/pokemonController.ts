import { Request, Response } from "express";
import Pokemon from "../models/pokemon";
import { response } from "../utils/response";

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = (await Pokemon.findAll()).map((pokemon: Pokemon) => {
      const splits = pokemon.fibonacciIndex.split('-');
      const length = splits.length;

      let formattedNickname = `${pokemon.nickname}-${splits[length-1]}`;
      if (pokemon.fibonacciIndex == "") {
        formattedNickname = pokemon.nickname;
      }

      return {
        id: pokemon.id,
        url: pokemon.url,
        nickname: formattedNickname,
        fibonacciIndex: pokemon.fibonacciIndex,
        createdAt: pokemon.createdAt,
        updatedAt: pokemon.updatedAt,
      };
    });
    return response(res, 200, "Success to get pokemons data", pokemons);
  } catch (error: any) {
    return response(res, 500, error.message, null);
  }
};

export const findPokemon = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const pokemon = await Pokemon.findOne({ where: { url } });
    if (!pokemon) {
      return response(res, 500, "Pokemon not found", null);
    }
    return response(res, 200, 'Pokemon Found', pokemon);
  } catch (error: any) {
    return response(res, 500, error.message, null);
  }
}

export const catchPokemon = async (req: Request, res: Response) => {
  try {
    const { nickname, url } = req.body;  
    const probability = Math.floor(Math.random() * 2);
    if (probability === 1) {
      const pokemon = await Pokemon.create({
        nickname,
        url,
        fibonacciIndex: ""
      });
      return response(res, 200, "Success to catch pokemon", pokemon);
    }
    return response(res, 500, "Failed to catch pokemon", null);
  } catch (error: any) {
    return response(res, 500, error.message, null);
  }
}

export const releasePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokemon = Pokemon.findByPk(id);
    if (!pokemon) {
      return response(res, 500, "Pokemon not found", null);
    }
  } catch (error: any) {
    return response(res, 500, error.message, null);
  }
}

export const isPrime = (number: number) => {
  if (number <= 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

export const getFibonacci = (numbers: string) => {
  const splits = numbers.split('-');
  const length = splits.length;
  if (length < 3) {
    if (length === 1) return '1';
    if (length === 2) return '1';
  }

  const lastOne = splits[length - 1];
  const lastTwo = splits[length - 2];
  return parseInt(lastOne) + parseInt(lastTwo);
}