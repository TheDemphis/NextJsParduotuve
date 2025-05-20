import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
import { type NextRequest } from 'next/server'
import db from '@/utils/db'

export const POST = async (req: NextRequest) => {
  const request = new Headers(req.headers)
  const origin = request.get('origin')
  const { cartId, orderId } = await req.json()
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  })
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  })
  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: 'Not found',
    })
  }

  const line_items = cart.cartItems.map((cartItem) => {
    return {
      quantity: cartItem.amount,
      price_data: {
        currency: 'usd',
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100,
      },
    }
  })
  try {
    const sessions = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    })
    return Response.json({ clientSecret: sessions.client_secret })
  } catch (error) {
    console.error(error)

    let message = 'Įvyko serverio klaida'

    if (error instanceof Stripe.errors.StripeError) {
      return (message = 'Mokėjimo paslauga nepasiekiama')
    }

    return Response.json(null, {
      status: 500,
      statusText: message,
    })
  }
}
