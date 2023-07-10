import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const submitForm = ({ name, number }) => {
    const newContact = { name, number, id: nanoid() };

    if (contacts.some(contact => name === contact.name)) {
      alert(`{$name} is already in contacts.`);
      return;
    }

    setContacts(({ contacts }) => ({ contacts: [...contacts, newContact] }));
  };

  const changeFilter = event => {
    setFilter({ filter: event.target.value });
  };

  const deleteContact = id => {
    setContacts([...contacts.filter(contact => contact.id !== id)]);
  };

  const getFilteredContacts = (contacts, filter) => {
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    const getStorageContacts = localStorage.getItem('contacts');
    if (getStorageContacts) {
      return { contacts: JSON.parse(getStorageContacts) };
    }
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  });

  return (
    <div
      style={{
        paddingLeft: '20px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={submitForm} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilteredContacts(contacts, filter)}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
