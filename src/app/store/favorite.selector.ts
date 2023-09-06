import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Favorite } from '../models/favorite.model';

export const selectCollectionState = createFeatureSelector<
  ReadonlyArray<Favorite>
>('collection');

export const selectFavoriteCollection = createSelector(
  selectCollectionState,
  ( collection) => {
    return collection;
  }
);