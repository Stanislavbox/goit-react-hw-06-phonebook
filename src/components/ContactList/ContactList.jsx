import React from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector, filterSelector } from 'redux/selectors';
import { deleteContact } from 'redux/contactSlice';
import PropTypes from 'prop-types';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelector);
  const contactsQuery = useSelector(filterSelector);
  const filterContactsList = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactsQuery.toLowerCase())
  );

  return (
    <ul className={css.contact_List}>
      {filterContactsList.length ? (
        filterContactsList.map(contact => (
          <li className={css.contact_item} key={contact.id}>
            {contact.name} - {contact.number}
            <button
              type="button"
              className={css.contact_button}
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </button>
          </li>
        ))
      ) : (
        <p className={css.contact__message}>No such contact with that name</p>
      )}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  contactsQuery: PropTypes.string,
  dispatch: PropTypes.func,
};
