import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import PropTypes from 'prop-types'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, DialogActions, DialogContentText, Typography } from '@mui/material'
import axios from 'axios'
import { SERVER_URL } from 'src/constants'

function CreditCardPayment (props) {
  const {
    onClose,
    openPayment,
    amount,
    setPaymentCompleted,
    paymentDescription,
    payButtonText,
    dialogTitle
  } = props

  const handleClose = () => {
    onClose()
  }

  const handleProceed = async () => {
    console.log('handleProceed');
    try {
      const response = await axios.post(`${SERVER_URL}/payCredit`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
      } else {
        // toast.error("Password Incorrect.");
      }
    } catch (err) {
      console.error('=========Error========', err)
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={openPayment}
      px={2}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{paymentDescription}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleProceed}>{payButtonText}</Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  )
}

CreditCardPayment.propTypes = {
  onClose: PropTypes.func.isRequired,
  openPayment: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  setPaymentCompleted: PropTypes.func.isRequired,
  paymentDescription: PropTypes.string.isRequired,
  payButtonText: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired,
}

export default CreditCardPayment
