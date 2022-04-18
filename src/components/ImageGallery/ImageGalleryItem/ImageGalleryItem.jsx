import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ item, onClick }) => {
  return (
    <GalleryItem onClick={() => onClick(item.largeImageURL)}>
      <GalleryItemImage src={item.webformatURL} alt={item.tag} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
