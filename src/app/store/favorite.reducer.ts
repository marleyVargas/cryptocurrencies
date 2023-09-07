import { createReducer, on } from '@ngrx/store';
import { FavoriteActions } from './favorite.actions';
import { Favorite } from '../models/favorite.model';

export const initialState: ReadonlyArray<Favorite> = [];

export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteActions.removeFavorite, (state, { favoriteId }) =>
    {
      state = state.filter((x) => x.id !== favoriteId),
      localStorage.removeItem("fav");
      localStorage.setItem("fav", JSON.stringify(state));
      return state;
    }
  ),
  on(FavoriteActions.addFavorite, (state, { favorite }) => {
    
    var str = localStorage.getItem("fav")
    
    if(!state.length && str) state = JSON.parse(str);

    if (state.indexOf(favorite) > -1) return state;
    
    var newArr = [...state, favorite]
    
    localStorage.setItem("fav", JSON.stringify(newArr))
    return newArr;
  })
);