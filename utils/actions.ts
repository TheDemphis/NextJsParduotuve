'use server'
import { redirect } from 'next/navigation'
import db from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import {
  imageSchema,
  productSchema,
  reviewsSchema,
  zodCreateSchema,
} from './schemas'
import { deleteImage, imageUpload } from './supabase'
import { revalidatePath } from 'next/cache'
import { Cart } from '@prisma/client'

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  })
  return products
}
export const fetchAllProducts = ({ search }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) {
    redirect('/')
  }
  return product
}

const getCurrentUser = async () => {
  const user = await currentUser()
  if (!user) redirect('/')
  return user
}

// const getCurrentUser = async () => {
//   const user = await currentUser()
//   if (!user) {
//     throw new Error('You must be logged in to access this route')
//   }

//   return user
// }
const getAdminUser = async () => {
  const user = await getCurrentUser()
  if (user.id !== process.env.ADMIN_ID) redirect('/')
  return user
}

export const actionFunction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getCurrentUser()

  try {
    const formdata = Object.fromEntries(formData)
    const zodValidation = zodCreateSchema(productSchema, formdata)
    const imageFile = formData.get('image') as File
    const imageValidation = zodCreateSchema(imageSchema, { image: imageFile })
    const validatedImage = await imageUpload(imageValidation.image)
    await db.product.create({
      data: {
        ...zodValidation,
        clerkId: user.id,
        image: validatedImage,
      },
    })
  } catch (error) {
    console.log(error)
    return { message: error instanceof Error ? error.message : 'Ivyko klaida' }
  }
  redirect('/admin/products')
}
export const FetchAdminProd = async () => {
  await getAdminUser()
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return products
}

const getError = (error: unknown): { message: string } => {
  console.log(error)
  return { message: error instanceof Error ? error.message : 'Ivyko klaida' }
}
export const deleteAction = async (item: { productId: string }) => {
  const { productId } = item
  await getAdminUser()
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    })
    deleteImage(product.image)
    revalidatePath('/admin/products')
    return { message: 'Produktas ištrintas' }
  } catch (error) {
    return getError(error)
  }
}

export const fetchAdminProdAction = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) redirect('/admin/products')
  return product
}

export const updateProductInfoAction = async (
  prevState: any,
  formData: FormData
) => {
  getAdminUser()
  try {
    const productId = formData.get('id') as string
    const getData = Object.fromEntries(formData)
    const validatedData = zodCreateSchema(productSchema, getData)
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedData,
      },
    })
    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: 'Prekė atnaujinta' }
  } catch (error) {
    return getError(error)
  }
}
export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser()
  try {
    const imageUrl = formData.get('url') as string
    const imageFile = formData.get('image') as File
    const imageId = formData.get('id') as string
    const validatedImg = zodCreateSchema(imageSchema, { image: imageFile })
    const fullPath = await imageUpload(validatedImg.image)
    await deleteImage(imageUrl)
    await db.product.update({
      where: {
        id: imageId,
      },
      data: {
        image: fullPath,
      },
    })
    revalidatePath(`/admin/products/${imageId}/edit`)
    return { message: 'Nuotrauka atnaujinta' }
  } catch (error) {
    return getError(error)
  }
}
export const FavoriteToggle = async (prevState: {
  productId: string
  favoriteId: string | null
  pathName: string
}) => {
  const user = await getCurrentUser()
  const { productId, favoriteId, pathName } = prevState

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      })
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      })
    }
    revalidatePath(pathName)
    return {
      message: favoriteId
        ? 'Prekė ištrinta iš megstamiausių sąrašo'
        : 'Prekė pridėta į mėgstamiausių sąrašą',
    }
  } catch (error) {
    return getError(error)
  }
}

export const FetchFavorites = async ({ productId }: { productId: string }) => {
  const user = await getCurrentUser()
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  })
  return favorite?.id || null
}
export const FetchUserFav = async () => {
  const user = await getCurrentUser()
  const favoriteProducts = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  })
  return favoriteProducts
}

export const createReview = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser()
  try {
    const data = Object.fromEntries(formData)
    const validateData = zodCreateSchema(reviewsSchema, data)
    await db.review.create({
      data: {
        ...validateData,
        clerkId: user.id,
      },
    })
    revalidatePath(`/products/${validateData.productId}`)
    return { message: 'Successfully created' }
  } catch (error) {
    return getError(error)
  }
}
export const findReview = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  })
}
export const deleteReview = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState
  const user = await getCurrentUser()
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    })
    revalidatePath('/reviews')
    return { message: 'Įvertinimas ištrintas' }
  } catch (error) {
    return getError(error)
  }
}
export const fetchUserReviews = async () => {
  const user = await getCurrentUser()
  const reviews = db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      rating: true,
      comment: true,
      id: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  })
  return reviews
}
export const fetchProductReviews = async (productId: string) => {
  const reviews = db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return reviews
}
export const fetchProdRating = async (productId: string) => {
  const getRating = await db.review.groupBy({
    by: ['productId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  })
  return {
    rating: getRating[0]?._avg?.rating?.toFixed(1) ?? 0,
    count: getRating[0]?._count.rating ?? 0,
  }
}
const productAndCartItems = {
  cartItems: {
    include: {
      product: true,
    },
  },
}
export const addToCart = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser()

  try {
    const amount = Number(formData.get('amount'))
    const productId = formData.get('productId') as string
    await fetchProduct(productId)
    const cart = await fetchOrCreateCart({ userId: user.id })
    await updateOrCreateCartItem({ productId, amount, cartId: cart.id })
    await updateCart(cart)
  } catch (error) {
    return getError(error)
  }
  redirect('/cart')
}
export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  let numItemsInCart = 0
  let cartTotal = 0
  for (const item of cartItems) {
    numItemsInCart += numItemsInCart + item.amount
    cartTotal += item.amount * item.product.price
  }
  const tax = cartTotal * cart.taxRate
  const shipping = cartTotal ? cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping
  const updateCartItem = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: { tax, cartTotal, numItemsInCart, orderTotal },
    include: productAndCartItems,
  })
  return { updateCartItem, cartItems }
}

export const removeCartItem = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser()
  try {
    const cartItemId = formData.get('id') as string
    const cart = await fetchOrCreateCart({
      userId: user.id,
      failureError: true,
    })
    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    })
    await updateCart(cart)
    revalidatePath('/cart')
    return { message: 'Prekė pašalinta' }
  } catch (error) {
    return getError(error)
  }
}
export const updateCartItem = async ({
  amount,
  cartItemId,
}: {
  amount: number
  cartItemId: string
}) => {
  const user = await getCurrentUser()
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      failureError: true,
    })
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    })
    await updateCart(cart)
    revalidatePath('/cart')
    return { message: 'Krepšelis atnaujintas' }
  } catch (error) {
    return getError(error)
  }
}
export const fetchCartItems = async () => {
  // const { userId } = auth()
  const user = await currentUser()
  const cart = await db.cart.findFirst({
    where: {
      clerkId: user?.id ?? '',
    },
    select: {
      numItemsInCart: true,
    },
  })
  return cart?.numItemsInCart || 0
}
export const fetchOrCreateCart = async ({
  userId,
  failureError = false,
}: {
  userId: string
  failureError?: boolean
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: productAndCartItems,
  })
  if (!cart && failureError) {
    throw new Error('Krepšelis neegzistuoja')
  }

  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: productAndCartItems,
    })
  }
  return cart
}
const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) {
    throw new Error('Nėra tokios prekės')
  }
  return product
}
const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string
  cartId: string
  amount: number
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  })
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: { amount: cartItem.amount + amount },
    })
  }
  if (!cartItem) {
    cartItem = await db.cartItem.create({
      data: { productId, amount, cartId },
    })
  }
}
export const createOrder = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser()
  let orderId: null | string = null
  let cartId: null | string = null
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      failureError: true,
    })
    cartId = cart.id
    const order = await db.order.create({
      data: {
        products: cart.numItemsInCart,
        clerkId: user.id,
        orderTotal: cart.orderTotal,
        shipping: cart.shipping,
        tax: cart.tax,
        email: user.emailAddresses[0].emailAddress,
      },
    })
    orderId = order.id
  } catch (error) {
    return getError(error)
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`)
}

export const fetchAdminOrders = async () => {
  await getAdminUser()
  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return orders
}

export const fetchUserOrders = async () => {
  const user = await getCurrentUser()
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return orders
}
