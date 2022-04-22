import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

const Button = ({ onClick, isLoading }) => {
  return (
    <Btn type="button" onClick={onClick} disabled={isLoading}>
      Load more
    </Btn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default Button;
