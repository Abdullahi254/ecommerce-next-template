# E-commerce Project using Next.js, GraphQL, Hygraph, Snipcart, and M-Pesa

E-commerce template built using Next.js, Hygraph, Snipcart, and M-Pesa. This project is a simple yet powerful way to create an online store with modern tools and technologies. With Snipcart, we are able to handle the shopping cart and checkout process, while M-Pesa enables customers to pay using one of the most popular mobile payment methods in Africa.

## Features

- Product listings and details pages
- Shopping cart using Snipcart
- Checkout process using Snipcart
- Integration with M-Pesa payment method
- Admin panel to manage products and orders using Hygraph

## Getting Started

To get started with this project, you will need to follow these steps:

1. Clone this repository to your local machine using git clone https://github.com/Abdullahi254/ecommerce-next-template.git
2. Navigate to the project directory using cd ecommerce-nextjs
3. Install the dependencies using npm install
4. Start the development server using npm run dev

## Configuration

Our project uses environment variables to configure Snipcart, hypraph and M-Pesa. You will need to set the following environment variables in a .env file in the root directory of the project:

```
NEXT_PUBLIC_HYGRAPH_ENDPOINT=<your_hygraph_public_key>
HYGRAPH_QUERY_TOKEN=<your_hygraph_query_token>
HYGRAPH_MUTATION_TOKEN=<your_hygraph_mutation_key>
NEXT_PUBLIC_SNIPCART_API_KEY=<your_public_snipcart_api_key>
NEXT_SAFARICOM_CONSUMER_KEY=<your_safaricom_consumer_key>
NEXT_SAFARICOM_CONSUMER_SECRET=<your_safaricom_consumer_secret>
NEXT_SAFARICOM_SHORTCODE=<your_safaricom_short_key>
NEXT_SAFARICOM_PASSKEY=<your_safaricom_passkey>
NEXT_PRIMARY_SECRET_API_KEY=<your_snipcart_api_key>
NEXT_SECONDARY_SECRET_API_KEY=<your_snipcart_api_key>
```

## Contributing

If you would like to contribute to our project, you are welcome to create a pull request. Please ensure that your changes follow basic coding standards and are well-tested.
