import { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';
import './container.css';
class App extends Component {
  state = {
    // contacts: [],
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  addContact = ({ contacts, id, name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => {
      if (contacts.some(contact => contact.name === name)) {
        return alert(`${contact.name} is already in contacts`);
      }
      return {
        contacts: [contact, ...contacts],
      };
    });
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      filter: '',
    }));
  };
  componentDidMount() {
    // console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App   componentDidUpdate');
    console.log(prevState);
    console.log(this.state);
    // проверяем, если состояние contacts до обновления не равно состоянию contacts после обновления
    // (а они не равны, поскольку при изменении contacts(стейта)создаются новые масивы и сравнивая по ссылке эти массивы не равны)
    // если они не равны, значит стейт обновился,  то записываем в хранилище
    if (this.state.contacts !== prevState.contacts) {
      // console.log('обновился стейт contacts, записываем его в хранилище');
      // берем текущие contacts и записиваем их в локалсторидж
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className="Container">
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2> Contacts : </h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContactList={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;