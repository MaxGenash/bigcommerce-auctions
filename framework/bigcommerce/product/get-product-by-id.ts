import { BigcommerceConfig, getConfig } from '../api'
import { normalizeProduct } from '@framework/lib/normalize'
import { Product } from '@commerce/types'
import { Maybe } from '@framework/schema'
import { productInfoFragment } from '@framework/api/fragments/product'

export const getProductByIdQuery = /* GraphQL */ `
  query productById(
    $productId: Int!
    $hasLocale: Boolean = false
    $locale: String = "null"
  ) # Use GraphQL Query Variables to inject your product ID
  {
    site {
      product(entityId: $productId) {
        ...productInfo
        plainTextDescription
        defaultImage {
          ...DefaultImageFields
        }
      }
    }
  }

  fragment DefaultImageFields on Image {
    url320wide: url(width: 320)
    url640wide: url(width: 640)
    url960wide: url(width: 960)
    url1280wide: url(width: 1280)
  }

  ${productInfoFragment}
`

async function getProductById(config: BigcommerceConfig, productId: number): Promise<Maybe<Product>> {
  config = getConfig(config)

  const locale = config.locale
  const variables = {
    productId,
    locale: locale ? locale : 'null',
    hasLocale: !!locale,
  }
  const { data } = await config.fetch<any>(getProductByIdQuery, { variables })
  const product = data?.site?.product

  return product ? normalizeProduct(product) : null
}

export default getProductById
