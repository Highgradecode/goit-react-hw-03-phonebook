import { Component } from "react";
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { AppWrapper } from "./AppWrapper.styled";

export class App extends Component {
  
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount(){
    this.setState({
      contacts: JSON.parse(window.localStorage.getItem('contacts')) ?? []
    })
  }

  componentDidUpdate(){
    window.localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }

  handlerChange = (e) => {

    const {value, name} = e.target

    this.setState(
      {
        [name]: value
      }
    )
  }
  
  addContact = (e) => {
    e.preventDefault();

    e.target.reset()

    if(this.state.contacts.find(contact => contact.name === this.state.name)){
      alert(`${this.state.name} already in contacts`)

      return

    }

    const contact = [{
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    }]



    this.setState({
      contacts: [...this.state.contacts, ...contact]
    })


  };

  contactsFilter = () => {

    const normalizeContactName = this.state.filter.toLowerCase() 

    return this.state.contacts.filter(({name}) => {
      return name.toLowerCase().includes(normalizeContactName)
    })

  }

  deleteContact = (id) => {
    this.setState(prevState => ({contacts: prevState.contacts.filter(contact => contact.id !== id)}))
    
  }

  render(){
    return(
      <AppWrapper>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} handlerChange={this.handlerChange}/>
        <h2>Contacts</h2>
        <Filter 
        handlerChange={this.handlerChange}
        filter={this.state.filter} />
        <ContactList deleteContact={this.deleteContact} contacts={this.contactsFilter()}/>
      </AppWrapper>
    );
  };
};
