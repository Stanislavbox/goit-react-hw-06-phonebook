import { useDispatch, useSelector } from 'react-redux';
import css from './ContactForm.module.css';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from 'redux/contactSlice';
import { contactsSelector } from 'redux/selectors';
import PropTypes from 'prop-types';

export const ContactForm = () => {
  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const isDuplicateContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateContact) {
      alert('The contact already exists!');
      setName('');
      setNumber('');
      return;
    }

    const id = nanoid();
    dispatch(addContact({ id, name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form_contact} onSubmit={handleSubmit}>
      <label className={css.form_label} htmlFor="example name">
        Name
      </label>
      <input
        className={css.form_input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        onChange={handleChange}
        required
      />

      <label className={css.form_label} htmlFor="example number">
        Number
      </label>
      <input
        className={css.form_input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        onChange={handleChange}
        required
      />

      <button className={css.form_button}>Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  contactsSelector: PropTypes.func,
  addContact: PropTypes.func,
};
