export const Role = {
  SELLER: 'seller',
  CUSTOMER: 'customer'
}

export const Permission = {
  READ_PROFILE: 'read_profile',
  EDIT_PROFILE: 'edit_profile',

  BROWSE_PRODUCTS: 'browse_products',
  READ_PRODUCT: 'read_product',
  EDIT_PRODUCT: 'edit_product',
  ADD_PRODUCT: 'add_product',
  DELETE_PRODUCT: 'delete_product',

  READ_CART: 'read_cart',
  ADD_TO_CART: 'add_to_cart',
  DELETE_FROM_CART: 'delete_from_cart',

  BROWSE_ORDERS: 'browse_orders',
  READ_ORDER: 'read_order',
  ADD_ORDER: 'add_order',
}

export const PermissionAssigntment = {
  [Role.SELLER]: [
    Permission.READ_PROFILE,
    Permission.EDIT_PROFILE,

    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.ADD_PRODUCT,
    Permission.DELETE_PRODUCT
  ],
  [Role.CUSTOMER]: [
    Permission.READ_PROFILE,
    Permission.EDIT_PROFILE,

    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,
    
    Permission.READ_CART,
    Permission.ADD_TO_CART,
    Permission.DELETE_FROM_CART,
    
    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
    Permission.ADD_ORDER,
  ]
}