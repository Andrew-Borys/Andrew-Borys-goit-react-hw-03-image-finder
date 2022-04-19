import { Component } from 'react';
import { getGallary } from './services/API';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { Wraper } from './App.styled';
import Loader from 'react-js-loader';

export class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    page: 1,
    isLoading: false,
    error: null,
    modal: null,
    modalImage: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.receiveGalary(searchQuery, page);
    }
    console.log('UPDATE:', searchQuery);
    console.log('UPDATE:', page);
  }

  onSearchQuery = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      gallery: [],
      page: 1,
    });
  };

  receiveGalary = async (searchQuery, page) => {
    try {
      this.setState({ isLoading: true });
      const images = await getGallary(searchQuery, page);
      this.setState(state => ({
        gallery: [...state.gallery, ...images],
        isLoading: false,
      }));
    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        isLoading: false,
      });
    }
  };

  handleClick = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  onCurrentImage = data => {
    // console.log(data);
    this.setState({
      modal: true,
      modalImage: data,
    });
  };

  onModalClose = () => {
    this.setState({
      modal: null,
    });
  };

  render() {
    const { gallery, isLoading, modal, modalImage, error } = this.state;

    return (
      <Wraper>
        <Searchbar onSubmit={this.onSearchQuery} />
        {error && <p>Oppp smth going wrong..., pls reload page.</p>}
        <ImageGallery gallery={gallery} onClick={this.onCurrentImage} />
        {isLoading && (
          <Loader
            type="rectangular-ping"
            bgColor={'#3f51b5'}
            title={'box-rotate-x'}
            size={200}
          />
        )}
        {gallery.length > 1 && (
          <Button onClick={this.handleClick} isSubmitting={isLoading} />
        )}
        {modal && (
          <Modal modalImage={modalImage} onModalClose={this.onModalClose} />
        )}
      </Wraper>
    );
  }
}
