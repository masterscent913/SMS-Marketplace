import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from 'src/reducers/calendar-reducer';

export const rootReducer = combineReducers({
  calendar: calendarReducer
});
