//import PropTypes from 'prop-types'
import React, { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import initialContacts from './contacts.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList } from './ContactList/ContactList';
import { Header } from './Header/Header';
import Filter from './Filter/Filter';
import useLocaStorage from 'hooks/useLocalStorage';
import { nanoid } from 'nanoid';

const notifyOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export default function App() {
  const [contacts, setContacts] = useLocaStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  const addContact = newContact => {

    const isExist = contacts.some(
      ({ name, number }) => name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        number.trim() === newContact.number.trim()
    );

    if (isExist) {
      return toast.error(`${newContact.name}: is already in contacts`, notifyOptions)
    }
     
    setContacts(contacts => [{ ...newContact, id: nanoid() }, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.target.value.toLowerCase().trim());
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContact = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );

    if (normalizedFilter && !filteredContact.length) {
      toast.warn(`No contacts matching your request`, notifyOptions);
    }

    return filteredContact;
  };

 
    return (
      <Layout>
        <Section title="Phonebook">
          <ContactForm onAddContact={addContact} />
          <Header title="Contacts" />
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={getVisibleContacts()}
            onDelete={deleteContact}
          />
        </Section>
        <ToastContainer />
        <GlobalStyle />
      </Layout>
    );
  }
