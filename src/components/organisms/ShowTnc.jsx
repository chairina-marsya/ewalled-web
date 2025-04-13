import Swal from 'sweetalert2'

export const showTnc = () => {
  //   <div>
  //   <button id="backButton" style="background: none; border: none; font-size: 16px; cursor: pointer;"> < </button>
  // </div>
  Swal.fire({
    title: 'Terms and Conditions',
    html: `
        <div style="text-align: left; font-size:14px;border-top: 1px solid black">
            <p style="margin-top: 10px;">Please read these terms and conditions ("terms and conditions", "terms") carefully before using Walled mobile application ("app", "service") operated by Walled ("us", "we", "our").</p>
            <br>
            <p style="font-weight:bold">1. Conditions of Use</p>
            <p>By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to stop using the app accordingly. Walled only grants use and access of this app, its products, and its services to those who have accepted its terms.</p>
        
            <br>
            <p style="font-weight:bold">2. Privacy Policy</p>
            <p>Before you continue using our app, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.</p>
        
            <br>
            <p style="font-weight:bold">3. Intellectual Property</p>
            <p>You agree that all materials, products, and services provided on this app are the property of Walled, its affiliates, directors, officers, employees, agents, suppliers, or licensors, including all copyrights, trademarks, trade secrets, patents, and other intellectual property. You also agree that you will not reproduce or redistribute Walled’s intellectual property in any way, including electronic, digital, or new trademark registrations.</p>
        
            <br>
            <p>Any unauthorized use of the materials or content appearing on the app may violate copyright, trademark, and other applicable laws and could result in criminal or civil penalties.</p>
        </div>
      `,
    showConfirmButton: true,
    confirmButtonText: 'Done',
    customClass: {
      confirmButton: 'swal2-done-button',
      popup: 'swal2-custom-popup',
    },
    inputAttributes: {
      id: 'swal-tnc',
    },
    width: '80vw',
    didOpen: () => {
      document.getElementById('backButton').addEventListener('click', () => {
        Swal.close() // or trigger any custom back logic
      })
    },
  })
}
