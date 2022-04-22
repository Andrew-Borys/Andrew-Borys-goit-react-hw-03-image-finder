import { Component } from 'react';
import { getGallary } from './services/API';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { Wraper } from './App.styled';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    page: 1,
    isLoading: false,
    error: null,
    modal: null,
    modalImage: '',
    isButton: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.receiveGalary(searchQuery, page);
    }
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

      if (images.totalHits === 0) {
        Notiflix.Report.info(
          'Opppsss....',
          `Sorry '${searchQuery}' no results found... Try again with a new query.`,
          'Try again?'
        );
      }

      if (images.totalHits > page * 12) {
        this.setState({
          isButton: true,
        });
      }
      if (images.totalHits < page * 12) {
        this.setState({
          isButton: false,
        });
      }
      this.setState(state => ({
        gallery: [...state.gallery, ...images.hits],
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
    const { gallery, isLoading, modal, modalImage, isButton, error } =
      this.state;

    return (
      <Wraper>
        <Searchbar onSubmit={this.onSearchQuery} />
        {error &&
          Notiflix.Report.failure(
            `${error}`,
            'Oppp smth going wrong..., pls reload page.',
            'Reload page'
          )}
        <ImageGallery gallery={gallery} onClick={this.onCurrentImage} />

        {isLoading && Notiflix.Loading.dots('Loading...')}
        {!isLoading && Notiflix.Loading.remove()}

        {isButton && (
          <Button onClick={this.handleClick} isSubmitting={isLoading} />
        )}
        {modal && (
          <Modal modalImage={modalImage} onModalClose={this.onModalClose} />
        )}
      </Wraper>
    );
  }
}
