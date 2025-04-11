import Swal from 'sweetalert2'

export const showAlert = (text, buttonText, onConfirm) => {
  Swal.fire({
    text: text,
    showCancelButton: false,
    confirmButtonText: buttonText,
    customClass: {
      confirmButton: 'swal-confirm-btn',
      popup: 'swal-popup',
      title: 'swal-title',
    },
    inputAttributes: {
      id: 'swal-alert',
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm()
    }
  })
}
