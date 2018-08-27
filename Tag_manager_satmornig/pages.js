var root = {
    tag_data: {
    11392: {
            baseAppId: "9178",
            base_campaign_id: "2796",
            email_campaign_id: "2798",
            basket_timeout: "1800"
        },
        pixel_src: "//platform.cloud-iq.com.au/cartrecovery/",
        domain: "www.candlemaking-au.com",
        multi_bytes: "false"
    },
    targets:{
        0: {
            name: "Default Page",
            status: "enabled",
            inputs: {
                page_exclude: "/Page Match",
                element_exclude: "#Element Match",
                events :{
                    blur: ["#selector1", "#selector2"],
                    click: ["#selector3", "#selector4"]
                }
            }
        },
        1: {
            name: "Category Page",
            status: "enabled",
            inputs: {
                page_match: "/Page Match",
                element_match: "#Element Match",
                  events: {
                      click: ["#Add to Basket"]
                  }
            }
        },
        2: {
            name: "Product Page",
            status: "enabled",
            inputs: {
                page_match: "Page Match",
                element_match: "#Element Match",
                events: {
                    click: ["#Add to Basket"]
                }
            }
        },
        3: {
            name: "Login Page",
            status: "enabled",
            inputs: {
                page_match: "/Page Match",
                element_match: "#Element Match",
                events: {
                    blur: ["#Email input Id"]
                }
            }
        },
        4: {
            name: "Register Page",
            status: "enabled",
            inputs: {
                page_match: "/Page Match",
                element_match: "#Element Match",
                events: {
                    blur: ["#Email input Id", "#Name input Id", "#Last name input Id", "#Phone input Id"],
                    click: ["#submit"]
                }
            }
        },
        5: {
            name: "Basket Page",
            status: "enabled",
            inputs: {
                page_match: "/Page Match",
                element_match: "#Element Match",
                events: {
                    load: ["#Basket element", "#Product image", "#Product name", "#Product quantity", "#Product price", "#Product total", "#Basket total"],
                    click: ["#submit"]
                }
            }
        },
        6: {
            name: "Mini Basket",
            status: "enabled",
            inputs: {
                page_match: "/Page Match",
                element_match: "#Element Match",
                events: {
                    load: ["#Basket element", "#Product image", "#Product name", "#Product quantity", "#Product price", "#Product total", "#Basket total"],
                        click: ["#submit"]
                }
            }
        },
        7: {
            name: "Checkout page login",
            status: "enabled",
            inputs: {
                page_match: "/Page Match",
                element_match: "#Element Match",
                events: {
                    blur: ["#Email input Id"],
                    load: ["#Basket total"]
                }
            }
        },
        8: {
            name: "Checkout page Register",
            status: "enabled",
            inputs: {
                page_match: "/Page Match",
                element_match: "#Element Match",
                events: {
                    blur: ["#Email input Id", "#Name input Id", "#Last name input Id", "#Phone input Id"],
                    click: ["#submit"],
                    load: ["#Basket total"]
                }
            }
        },
        9: {
            name: "Checkout page Payment",
            status: "enabled",
            inputs: {
                page_match: "/Page Match",
                element_match: "#Element Match",
                events: {
                    blur: ["#Payment input"]
                }
            }
        },
        10: {
            name: "Confirmation Page",
            status: "enabled",
            inputs: {
                page_match: "/Page Match",
                element_match: "#Element Match"
            }
        }
    }
};
