import React from 'react';
import PropTypes from 'prop-types';
import './ContactList.css';

const ContactList = ({ contacts, onDeleteContactList }) => (
  <ul className="ContactList">
    {contacts.map(({ id, name, number }) => (
      <li key={id} className="ContactList__item">
        <p className="ContactList__text">
          {name} : <span className="ContactList__number"> {number} </span>
        </p>
        <button
          className="ContactList__button"
          type="button"
          onClick={() => onDeleteContactList(id)}
        >
          Удалить
        </button>
      </li>
    ))}
  </ul>
);
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
export default ContactList;