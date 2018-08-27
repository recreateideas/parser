
export  const modules = JSON.parse('[{"name":"ddl","dependancies":["tha"]},{"name":"tha"},{"name":"dca","dependancies":["ddl","tha","wm"]}]'),
clickthrough = JSON.parse('{"name":"clickthrough","pattern":"clickthrough","strategy":"document_selector","transfer_method":"pixel","type":"","ddl_component_mappings":{"component_name":"page","referrer":"referrer","location":"destinationURL","title":"page_title"}}'),
ddl_mapping = JSON.parse('{"component_name":"page","referrer":"referrer","location":"destinationURL","title":"page_title"}'),
starter = {
	default_request: {
		pattern: 'page',
		strategy: 'document_selector',
		page_load: 'true',
		wait_on_load: 'true',
	},
	page_load: {
		pattern: 'page',
		strategy: 'document_selector',
		page_load: 'true',
		wait_on_load: 'true',
	},
	no_page_load: {
		pattern: 'page',
		strategy: 'document_selector',
		//page_load: 'true',
		wait_on_load: 'true',
	},
	category_page: {
		strategy: 'query_selector',
		pattern: 'body',
		cart_started: 'true',
		product_viewed: 'true',
		type: 'click',
		wait_on_load: 'true',
	},
	product_page: {
		strategy: 'document_selector',
		pattern: 'page',
		page_load: 'true',
		product_viewed: 'true',
		wait_on_load: 'true',
	},
	product_page_click: {
		strategy: 'query_selector',
		pattern: 'body',
		cart_started: 'true',
		wait_on_load: 'true',
		type: 'click',
	},
	confirmation_page: {
		pattern: 'page',
		strategy: 'document_selector',
		cart_started: 'true',
		page_load: 'true',
	},
	basket_total_capture: {
		pattern: 'page',
		strategy: 'document_selector',
		page_load: 'true',
		custom_function: 'ciqdca.total_capture',
		wait_on_load: 'true'
	},
	mini_basket_total_capture: {
		pattern: 'page',
		strategy: 'document_selector',
		custom_function: 'ciqdca.total_capture',
		wait_on_load: 'true'
	},
	basket_capture: {
		pattern: 'page',
		strategy: 'document_selector',
		type: 'group_only',
		transmission_group: 'basket_page_total_capture',
		custom_function: 'ciqdca.basket_capture',
	},
	total_capture: {
		pattern: 'page',
		strategy: 'document_selector',
		type: 'group_only',
		custom_function: 'ciqdca.total_capture',
		transmission_group: 'basket_capture'
	},
	payment_method: {
		strategy: 'query_selector',
		pattern: 'body',
		type: 'click',
		cart_started: 'true',
		custom_function: 'ciqdca.payment_capture',
		wait_on_load: 'true',
	},
	order_number: {
		strategy: 'document_selector',
		pattern: 'page',
		page_load: 'true',
		cart_started: 'true',
		transfer_mode: 'cancel'
	},
	order_number_capture: {
		strategy: 'document_selector',
		pattern: 'page',
		transfer_mode: 'cancel',
		cart_started: 'true',
		wait_on_load: 'true',
		custom_function: 'ciqdca.order_number'
	},
	field_capture: {
		strategy: 'query_selector',
		pattern: 'body',
		start_session: 'true',
		wait_on_load: 'true'
	},
	checkout_field_capture: {
		strategy: 'query_selector',
		pattern: 'body',
		cart_started: 'true',
		wait_on_load: 'true'
	},
	transmission_target: {
		strategy: 'document_selector',
		pattern: 'page',
		type: 'group_only',
		custom_function: 'ciqdca.mixed_inputs_capture'
	},
	discount_code_capture: {
		strategy: 'query_selector',
		pattern: 'body',
		type: 'blur',
		cart_started: 'true',
		wait_on_load: 'true'
	},
	paypal_express_shortcut: {
		strategy: 'query_selector',
		pattern: 'body',
		type: 'click',
		params: {
			extra_fields: {
				cloudiqBasketPayment: "paypalExpressShortcut"
			}
		},
		cart_started: 'true',
		wait_on_load: 'true',
	},
	extra_capture: {
		strategy: 'query_selector',
		pattern: 'body',
		type: '',
		custom_function: 'ciqdca.mixed_inputs_capture',
		wait_on_load: 'true'
	},
	innerText_capture: {
		strategy: 'document_selector',
		pattern: 'page',
		type: '',
		custom_function: 'ciqdca.innerText_capture',
		wait_on_load: 'true'
	}
};
