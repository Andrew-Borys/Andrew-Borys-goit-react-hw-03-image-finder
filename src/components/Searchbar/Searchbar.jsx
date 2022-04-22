import { Component } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmitForm = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchQuery.toLowerCase().trim());
  };

  handleInputEntry = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmitForm}>
          <Button type="submit">
            <ImSearch size={24} />
          </Button>

          <Input
            // autofocus
            autocomplete="off"
            type="text"
            name="searchQuery"
            value={this.state.inputValue}
            onChange={this.handleInputEntry}
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
