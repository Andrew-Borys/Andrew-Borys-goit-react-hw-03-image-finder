import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ gallery, onClick }) => {
  return (
    <>
      <Gallery>
        {gallery.map(item => (
          <ImageGalleryItem key={item.id} onClick={onClick} item={item} />
        ))}
      </Gallery>
    </>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array,
  onClick: PropTypes.func,
};

export default ImageGallery;
