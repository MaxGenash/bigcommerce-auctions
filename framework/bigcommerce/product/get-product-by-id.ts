import { BigcommerceConfig, getConfig } from '../api'

export const getProductByIdQuery = /* GraphQL */ `
  query productById(
    $productId: Int!
  ) # Use GraphQL Query Variables to inject your product ID
  {
    site {
      product(entityId: $productId) {
        id
        entityId
        name
        plainTextDescription
        defaultImage {
          ...ImageFields
        }
        images {
          edges {
            node {
              ...ImageFields
            }
          }
        }
        reviewSummary {
          summationOfRatings
          numberOfReviews
        }
        prices {
          price {
            ...MoneyFields
          }
          priceRange {
            min {
              ...MoneyFields
            }
            max {
              ...MoneyFields
            }
          }
          salePrice {
            ...MoneyFields
          }
          retailPrice {
            ...MoneyFields
          }
          saved {
            ...MoneyFields
          }
          bulkPricing {
            minimumQuantity
            maximumQuantity
            ... on BulkPricingFixedPriceDiscount {
              price
            }
            ... on BulkPricingPercentageDiscount {
              percentOff
            }
            ... on BulkPricingRelativePriceDiscount {
              priceAdjustment
            }
          }
        }
        brand {
          name
        }
      }
    }
  }

  fragment ImageFields on Image {
    url320wide: url(width: 320)
    url640wide: url(width: 640)
    url960wide: url(width: 960)
    url1280wide: url(width: 1280)
  }

  fragment MoneyFields on Money {
    value
    currencyCode
  }
`

async function getProductById(config: BigcommerceConfig, productId: number) {
  const variables = { productId }
  const { data } = await config.fetch<any>(getProductByIdQuery, { variables })
  return data
}

export default getProductById
