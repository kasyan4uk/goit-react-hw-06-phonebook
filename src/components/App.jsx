//import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList } from './ContactList/ContactList';
import { Header } from './Header/Header';
import { Filter } from './Filter/Filter';
import { getContacts } from 'redux/contacts/contacts-selectors';

export const App = () => {
  const contacts = useSelector(getContacts);
  return (
    <Layout>
      <Section title="Phonebook">
        <ContactForm />
        {contacts.length > 0 && (
          <>
            <Header title="Contacts" />
            <Filter />
            <ContactList />
          </>
        )}
      </Section>
      <ToastContainer />
      <GlobalStyle />
    </Layout>
  )
};