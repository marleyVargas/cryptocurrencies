import { createReducer, on } from '@ngrx/store';
import { FavoriteActions } from './favorite.actions';
import { Favorite } from '../models/favorite.model';

export const initialState: ReadonlyArray<Favorite> = [];

export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteActions.removeFavorite, (state, { favoriteId }) =>
    state.filter((x) => x.id !== favoriteId)
  ),
  on(FavoriteActions.addFavorite, (state, { favorite }) => {
    if (state.indexOf(favorite) > -1) return state;

    return [...state, favorite];
  })
);