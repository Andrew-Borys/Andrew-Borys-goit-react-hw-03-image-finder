import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

const Button = ({ onClick, isSubmitting }) => {
  return (
    <Btn type="button" onClick={onClick} disabled={isSubmitting}>
      Load more
    </Btn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default Button;
