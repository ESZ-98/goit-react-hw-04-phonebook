import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const { onSubmit, contacts } = this.props;

    const doesContactExist = contacts.some(contact => contact.name === name || contact.number === number)
    if (doesContactExist) {
      alert(`Contact already exists!`);
      return;
    }

    onSubmit({ name, number });
    this.setState({name: '', number: ''})
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.contact_form} onSubmit={this.handleSubmit}>
        <span className={css.contact_span}>Name</span>
        <input
          className={css.contact_input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={this.handleChange}
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
          onChange={this.handleChange}
          required
        />
        <button className={css.contact_button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
