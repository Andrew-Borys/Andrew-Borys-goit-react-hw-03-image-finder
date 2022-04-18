import { Component } from 'react/cjs/react.production.min';
import ReactDOM from 'react-dom';
import { Overlay, Popup } from './Modal.styled';

export default class ModaL extends Component {
  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };
  componentDidMount(_, prevState) {
    window.addEventListener('keydown', this.keyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }
  render() {
    return ReactDOM.createPortal(
      <>
        <Overlay onClick={this.props.onModalClose}>
          <Popup>
            <img src={this.props.modalImage} alt="#" />
          </Popup>
        </Overlay>
      </>,
      document.getElementById('modal-root')
    );
  }
}
