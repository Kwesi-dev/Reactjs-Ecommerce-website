import React,{ useState, useEffect, useHistory } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import { commerce } from '../../../lib/Commerce'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { Link } from 'react-router-dom'

const steps = ['Shipping address', 'Payment details']
export const Checkout = ({ cart, order, error, onCaptureCheckout }) => {
    const classes = useStyles()
    const history = useHistory()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)
 
    useEffect(()=>{
        const generateTokenId = async ()=>{
          try{
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })

              setCheckoutToken(token)
          }catch(error){
              history.pushState("/")
          }
        }
        generateTokenId()
    },[cart])

    const nextStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep + 1)
    const backStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep - 1)

    const next = (data)=>{
        setShippingData(data)

        nextStep()
    }


    const Form = ()=> activeStep === 0 ? <AddressForm next={next} checkoutToken={checkoutToken}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeout={timeout}/>

    const timeout = ()=>{
      setTimeout(()=>{
        setIsFinished(true)
      }, 3000)
    }
    let Confirmation = ()=> order.customer ? (
        <>
          <div>
              <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
              <Divider className={classes.divider}/>
              <Typography variant="subtitle2">Order: ref: {order.customer_reference}</Typography>
          </div>
          <br/>
          <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button> 
        </>
    ) : isFinished ? (
      <>
        <div>
        <Typography variant="h5">Thank you for your purchase</Typography>
        <Divider className={classes.divider}/>
        </div>
        <br/>
        <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    )

    if(error){
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br/>
        <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button> 
      </>
    }



    return (
        <>
        <CssBaseline />
          <div className={classes.toolbar}></div>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography variant="h4" align="center">Checkout</Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map((step)=> (
                    <Step key={step}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
              </Stepper>
              {activeStep === steps.length ? <Confirmation />: checkoutToken && <Form />}
            </Paper>
          </main>  
        </>
    )
}

export default Checkout