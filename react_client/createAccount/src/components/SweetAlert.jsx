import React from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const SweetAlert = (props) => {
    const { icon, title, text, confirmButtonColor, confirmButtonText, onClose } = props;

    Swal.fire({
        icon,
        title,
        text,
        confirmButtonColor,
        confirmButtonText
    }).then((result) => {
        if (result.isConfirmed && onClose) {
            onClose();
        }
    });

    return null;
};

SweetAlert.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    confirmButtonColor: PropTypes.string.isRequired,
    confirmButtonText: PropTypes.string.isRequired,
    onClose: PropTypes.func
};

export default SweetAlert;
