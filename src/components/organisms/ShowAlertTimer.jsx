import Swal from 'sweetalert2'

export const showAlertTimer = () => {
  Swal.fire({
    title: 'Download Success!',
    html: 'Close in.. (<b>3</b>)',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      const timerEl = Swal.getPopup().querySelector('b')
      let lastSecondsLeft = 3

      timerInterval = setInterval(() => {
        const secondsLeft = Math.ceil(Swal.getTimerLeft() / 1000)
        if (secondsLeft !== lastSecondsLeft) {
          timerEl.textContent = `${secondsLeft}`
          lastSecondsLeft = secondsLeft
        }
      }, 300)
    },
    willClose: () => {
      clearInterval(timerInterval)
    },
    showCancelButton: false,
    showConfirmButton: false,
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title',
    },
    inputAttributes: {
      id: 'swal-alert',
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}
