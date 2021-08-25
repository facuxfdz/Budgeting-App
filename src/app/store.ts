import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice'
import operationsReducer from '../features/operations/operationsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    operations: operationsReducer
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
