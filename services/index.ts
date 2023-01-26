import { gql, GraphQLClient } from "graphql-request"
import { Product, Comment, Category, Collection } from "../typing"

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

export const getCommentsFromSlug = async (slug: String): Promise<Comment[]> => {
  const query = gql`
  query GetCommentsFromSlug($slug: String!) {
    reviews(where: {product: {slug: $slug}}, orderBy: createdAt_DESC, first: 3) {
      headline
      name
      email
      content
      rating
      createdAt
    }
  }
  `
  const rawResult = await hygraph.request(query, { slug })
  const comments: Comment[] = await rawResult.reviews
  return comments
}

export const getCategories = async (): Promise<Category[]> => {
  const query = gql`
  query MyQuery {
    categories {
      name
      slug
      description
    }
  }
  `
  const rawResult = await hygraph.request(query)
  const categories: Category[] = await rawResult.categories
  return categories
}

export const getCollections = async (): Promise<Collection[]> => {
  const query = gql`
  query GetCollections {
    collections {
      name
      slug
      description
    }
  }
  `
  const rawResult = await hygraph.request(query)
  const collections: Collection[] = await rawResult.collections
  return collections
}