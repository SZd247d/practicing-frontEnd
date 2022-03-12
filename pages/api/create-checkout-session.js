const stripe = require('stripe')(process.env.STRIPE_SECRET)

export default async (req, res) => {
  const { items, email } = req.body
  console.log(items)
  console.log(email)

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
    description: item.description,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: ['shr_1KbmvoLdZcAdk3MFktNVUfDK'],
    shipping_address_collection: {
      allowed_countries: ['US', 'ER', 'CA', 'GB'],
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email: email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  })
  res.status(200).json({ id: session.id })
}

// export const async (req, res, next) => {
//     const stripe = await stripePromise
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [{
//         price_data: {
//             currency: 'usd',
//             product_data: {
//             name: 'T-shirt',
//             images: ['https://example.com/t-shirt.png'],
//             },
//             unit_amount: 2000,
//         },
//         quantity: 1,
//         }],
//         mode: 'payment',
//         success_url: 'https://example.com/success',
//         cancel_url: 'https://example.com/cancel',
//     })
//     res.send({ session })
// }
