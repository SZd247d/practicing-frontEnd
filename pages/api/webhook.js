import { buffer } from 'micro'
import * as admin from 'firebase-admin'

// Secure Connection to firebase from the backend
const serviceAccount = require('../../permissions.json')
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app()

// Establish Connection To Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const endpointSecret = process.env.STRIPE_SIGNIN_SECRET

const fulfillOrder = async (session) => {
  console.log('fulfillOrder', session)

  try {
    const order = {
      amount: session.amount_total / 100,
      amount_shipping: session.total_details_amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    }

    // Create a new order in the database
    const db = app.firestore()
    const orders = db
      .collection('users')
      .doc(session.metadata.email)
      .collection('orders')
      .doc(session.id)
    const newOrder = await orders.add(order)
    return newOrder
  } catch (error) {
    console.log(error)
  }
}
export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()
    const sig = req.headers['stripe-signature']

    let event

    // Verify that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (e) {
      console.log('error', e.message)
      return res.status(400).send(`Webhook error: ${e.message}`)
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      console.log(event)

      // Fullfill the purchase
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook error: ${err.message}`))
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}
