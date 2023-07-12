import PropTypes from 'prop-types';
import React from 'react';
import css from './ContactForm.module.css';

const ContactForm = () => {
const initialValues = {
  name: '',
  number: '',
};

  const handleChange = value => {
    return { [initialValues.name]: value };
  };

  const handleSubmit = event => {
    event.preventDefault();

    const doesContactExist = contacts =>
      contacts.name === initialValues.name ||
      contacts.number === initialValues.number;
    if (doesContactExist) {
      alert(`Contact already exists!`);
      return;
    }
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
        value={initialValues.name}
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
        value={initialValues.number}
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
