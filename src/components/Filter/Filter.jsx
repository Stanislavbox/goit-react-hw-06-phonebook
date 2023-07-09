import React from 'react';
import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/contactSlice';
import { filterSelector } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(filterSelector);
  const changeFilter = event => {
    dispatch(getFilter(event.currentTarget.value));
  };

  return (
    <>
      <label className={css.filter_label} htmlFor="example filter">
        Find contacts by name
      </label>
      <input
        className={css.filter_input}
        type="text"
        name="filter"
        value={value}
        onChange={changeFilter}
      />
    </>
  );
};
