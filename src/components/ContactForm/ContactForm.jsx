import PropTypes from 'prop-types';
import React, { useState } from 'react';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = value => {
    return { [name]: value };
  };

  const handleSubmit = event => {
    event.preventDefault();

    const doesContactExist = contacts =>
      contacts.setName === name || contacts.setNumber === number;
    if (doesContactExist) {
      alert(`Contact already exists!`);
      return;
    }
  };

  const onSubmit = () => {
    return { name: name, number: number };
  };

  return (
    <form className={css.contact_form} onSubmit={handleSubmit}>
      <span className={css.contact_span}>Name</span>
      <input
        className={css.contact_input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        onChange={handleChange}
        required
      />
      <span className={css.contact_span}>Number</span>
      <input
        className={css.contact_input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        onChange={handleChange}
        required
      />
      <button className={css.contact_button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
