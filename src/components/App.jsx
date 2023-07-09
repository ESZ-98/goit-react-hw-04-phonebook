import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  submitForm = ({ name, number }) => {
    const newContact = { name, number, id: nanoid() };
    const { contacts } = this.state;

    if (contacts.some(contact => name === contact.name)) {
      alert(`{$name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    const getStorageContacts = localStorage.getItem('contacts');
    if (getStorageContacts) {
      this.setState({ contacts: JSON.parse(getStorageContacts) });
    }
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  render() {
    const { contacts, filter } = this.state;
    return (
      <div
        style={{
          paddingLeft: '20px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onSubmit={this.submitForm} />

        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.getFilteredContacts(contacts, filter)}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
