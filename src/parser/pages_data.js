export const tag_data = {
    app_id: "2091",
    base_campaign_id: "769",
    email_campaign_id: "771",
    basket_timeout: "1800",
    pixel_src: "//platform.cloud-iq.com.au/cartrecovery/",
    domain: "www.ecostore.com.au/",
    multi_bytes: "false"
}, pages = {
    0: {
        name: 'Category',
        status: 'enabled',
        inputs: {
            match: {
                element_match: '.products-grid.category-products-grid .button.btn-cart',
            },
            add_to_basket: '.products-grid.category-products-grid .button.btn-cart',
        }
    },
    1: {
        name: 'ProductPage',
        status: 'enabled',
        inputs: {
            match: {
                element_match: '#product-addtocart-button',
            },
            add_to_basket: '#product-addtocart-button',
        }
    },
    2: {
        name: 'Login',
        status: 'enabled',
        inputs: {
            click: '#send2',
            match: {
                page_match: '/account/login',
            },
            fields: {
                cloudiqConsumerEmail: '#email'
            }
        }
    },
    3: {
        name: 'Register',
        status: 'enabled',
        inputs: {
            click: '.account-create .button',
            match: {
                page_match: '/account/create',
            },
            fields: {
                cloudiqConsumerEmail: '#email_address',
                cloudiqConsumerFirstName: '#firstname',
                cloudiqConsumerLastName: '#lastname',
            }
        }
    },
    4: {
        name: 'BasketPage',
        status: 'enabled',
        inputs: {
            match: {
                page_match: '/cart'
            },
            basket: {
                container: '#shopping-cart-table tbody tr',
                cloudiqProductImage: 'img',
                cloudiqProductUrl: 'td:nth-child(2) a',
                cloudiqProductName: 'td:nth-child(2) a',
                cloudiqProductQuantity: '.input-text.qty',
                cloudiqProductPrice: '.col-unit-price .price',
            },
            cloudiqBasketTotal: '#shopping-cart-totals-table strong .price',
            cloudiqBasketSubTotal: '#shopping-cart-totals-table tbody tr .a-right:last-child .price',
            cloudiqDiscountCode: '#coupon_code'
        }
    },
    5: {
        name: 'MiniBasket',
        status: 'enabled',
        inputs: {
            match: {
                element_match: '#cart-sidebar .product-image img',
                page_exclude: '/cart,/Order-Confirmation'
            },
            basket: {
                container: '#cart-sidebar .item',
                cloudiqProductImage: '.product-image img',
                cloudiqProductUrl: '.product-name a',
                cloudiqProductName: '.product-name a',
                cloudiqProductQuantity: '.product-details strong',
                cloudiqProductPrice: '.product-details .price',
            },
            cloudiqBasketTotal: '#mini-cart .subtotal .price',
        }
    },
    6: {
        name: 'CheckoutLogin',
        status: 'enabled',
        inputs: {
            match: {
                page_match: '/checkout/onepage',
                element_match: '#login-email'
            },
            click: '#checkout-step-login .button',
            fields: {
                cloudiqConsumerEmail: '#login-email',
            }
        }
    },
    7: {
        name: 'CheckoutRegister',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/checkout/onepage',
                element_match: '#billing-new-address-form'
            },
            click: '#billing-new-address-form button',
            fields: {
                cloudiqConsumerEmail: '#billing:email',
                cloudiqConsumerFirstName: '#billing:firstname',
                cloudiqConsumerLastName: '#billing:lastname',
                cloudiqConsumerZipCode: '#billing:postcode',
                cloudiqConsumerNumber: '#billing:telephone',
                cloudiqConsumerCountyState: '#billing:region',
            }
        }
    },
    8: {
        name: 'CheckoutGuest',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/checkout',
                page_exclude: '/onepagecheckout/gateway'
            },
            click: '#shipping-submit',
            fields: {
                cloudiqConsumerEmail: '#delivery-email',
                cloudiqConsumerFirstName: '#firstname',
                cloudiqConsumerLastName: '#lastname',
                cloudiqConsumerCountyState: '[name=province]',
                cloudiqConsumerNumber: '#phone-number',
                cloudiqConsumerZipCode: '#postal-code'
            },
        }
    },
    9: {
        name: 'CheckoutPayment',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/checkout/onepage',
                element_match: '#checkout-review-load'
            },
            cloudiqBasketTotal: '#checkout-review-load strong .price',
        }
    },
    10: {
        name: 'ConfirmationPage',
        status: 'enabled',
        inputs: {
            match: {
                page_match: '/checkout/onepage/success',
            },
            cloudiqOrderNumber: 'p:nth-child(4)',
            cloudiqBasketTotal: '#checkout-review-load strong .price',
        }
    },
    11: {
        name: 'AccountPage',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/updatepersonalinfo',
                element_match: '#login',
            },
            fields: {
                cloudiqConsumerEmail: '#login',
                cloudiqConsumerFirstName: '#firstName',
                cloudiqConsumerLastName: '#lastName',
            },
        }
    },
};
