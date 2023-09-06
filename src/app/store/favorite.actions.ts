import { createActionGroup, props } from '@ngrx/store';
import { Favorite } from '../models/favorite.model';

export const FavoriteActions = createActionGroup({
    source: 'Favorites',
    events: {
      'Add Favorite': props<{ favorite: Favorite }>(),
      'Remove Favorite': props<{ favoriteId: string }>(),
    },
  });
