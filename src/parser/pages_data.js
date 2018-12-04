export const tag_data = {
    app_id: "10390",
    base_campaign_id: "1906",
    email_campaign_id: "1908",
    basket_timeout: "1800",
    baseAppId: "10124",
    pixel_src: "//platform.cloud-iq.com.au/cartrecovery/",
    domain: "www.onitsukatiger.com",
    multi_bytes: "false"
}, pages = {
    0: {
        name: 'Category',
        status: 'disabled',
        inputs: {
            match: {
                element_match: '[selector]',
            },
            add_to_basket: '[selector]',
        }
    },
    1: {
        name: 'ProductPage',
        status: 'disabled',
        inputs: {
            match: {
                element_match: '[selector]',
            },
            add_to_basket: '[selector]',
        }
    },
    2: {
        name: 'Login',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/URL',
            },
            click: '[selector]',
            fields: {
                cloudiqConsumerEmail: '[selector]'
            }
        }
    },
    3: {
        name: 'Register',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/URL',
            },
            click: '[selector]',
            fields: {
                cloudiqConsumerEmail: '[selector]',
                cloudiqConsumerFirstName: '[selector]',
                cloudiqConsumerLastName: '[selector]',
                cloudiqConsumerZipCode: '[selector]',
                cloudiqConsumerNumber: '[selector]',
                cloudiqConsumerCountyState: '[selector]',
            }
        }
    },
    4: {
        name: 'BasketPage',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/URL'
            },
            basket: {
                container: '[selector]',
                cloudiqProductImage: '[selector]',
                cloudiqProductUrl: '[selector]',
                cloudiqProductName: '[selector]',
                cloudiqProductQuantity: '[selector]',
                cloudiqProductPrice: '[selector]',
                cloudiqProductTotal: '[selector]',
            },
            cloudiqBasketTotal: '[selector]',
            cloudiqBasketSubTotal: '[selector]',
            cloudiqDiscountCode: '[selector]'
        }
    },
    5: {
        name: 'MiniBasket',
        status: 'disabled',
        inputs: {
            match: {
                element_match: '[selector]',
                page_exclude: '/URL'
            },
            basket: {
                container: '[selector]',
                cloudiqProductImage: '[selector]',
                cloudiqProductUrl: '[selector]',
                cloudiqProductName: '[selector]',
                cloudiqProductQuantity: '[selector]',
                cloudiqProductPrice: '[selector]',
                cloudiqProductTotal: '[selector]',
            },
            cloudiqBasketTotal: '[selector]',
        }
    },
    6: {
        name: 'CheckoutLogin',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/URL',
                element_match: '[selector]'
            },
            click: '[selector]',
            fields: {
                cloudiqConsumerEmail: '[selector]',
            }
        }
    },
    7: {
        name: 'CheckoutRegister',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/URL',
                element_match: '[selector]'
            },
            click: '[selector]',
            fields: {
                cloudiqConsumerEmail: '[selector]',
                cloudiqConsumerFirstName: '[selector]',
                cloudiqConsumerLastName: '[selector]',
                cloudiqConsumerZipCode: '[selector]',
                cloudiqConsumerNumber: '[selector]',
                cloudiqConsumerCountyState: '[selector]',
            }
        }
    },
    8: {
        name: 'CheckoutGuest',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/URL',
                page_exclude: '/URL'
            },
            click: '[selector]',
            fields: {
                cloudiqConsumerEmail: '[selector]',
                cloudiqConsumerFirstName: '[selector]',
                cloudiqConsumerLastName: '[selector]',
                cloudiqConsumerCountyState: '[selector]',
                cloudiqConsumerNumber: '[selector]',
                cloudiqConsumerZipCode: '[selector]'
            },
        }
    },
    9: {
        name: 'CheckoutPayment',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/URL',
                element_match: '[selector]'
            },
            cloudiqBasketTotal: '[selector]',
        }
    },
    10: {
        name: 'ConfirmationPage',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/URL/success',
            },
            cloudiqOrderNumber: '[selector]',
            cloudiqBasketTotal: '[selector]',
        }
    },
    11: {
        name: 'AccountPage',
        status: 'disabled',
        inputs: {
            match: {
                page_match: '/URL',
                element_match: '[selector]',
            },
            fields: {
                cloudiqConsumerEmail: '[selector]',
                cloudiqConsumerFirstName: '[selector]',
                cloudiqConsumerLastName: '[selector]',
            },
        }
    },
};
