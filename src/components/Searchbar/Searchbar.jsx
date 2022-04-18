import { Component } from 'react/cjs/react.production.min';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };

  handleInputEntry = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
      page: 1,
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
            name="inputValue"
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
