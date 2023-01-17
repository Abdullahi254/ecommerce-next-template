import { gql, GraphQLClient } from "graphql-request"
import { Product } from "../typing"

const hygraph = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!
);


export const getProducts = async (): Promise<Product[]> => {
  const query = gql`
    query products {
        products {
          id
          name
          slug
          description
          images {
            url
          }
          price
          variants {
            ... on ProductColorVariant {
              name
            }
            ... on ProductSizeColorVariant {
              name
            }
            ... on ProductSizeVariant {
              name
            }
          }
        }
      }
      `

  const rawResult = await hygraph.request(query)
  const result: Product[] = await rawResult.products
  return result
}