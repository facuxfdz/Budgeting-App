import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice'
import operationsReducer from '../features/operations/operationsSlice'
import categoriesReducer from '../features/categories/categoriesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    operations: operationsReducer,
    categories: categoriesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
