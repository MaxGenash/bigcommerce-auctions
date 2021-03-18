import { BigcommerceConfig } from '../api'
import type { Auction } from '@commerce/types'

const auctions: Auction[] = [
  {
    id: 1,
    description: 'Some interesting auction',
    source_product_id: 1,
    source_variant_id: 1,
    initial_price: 1,
    actual_price: 10,
  },
  {
    id: 2,
    description: 'Here will be description for the auction',
    source_product_id: 1,
    source_variant_id: 1,
    initial_price: 1,
    actual_price: 10,
  },
  {
    id: 3,
    description: 'Some interesting auction',
    source_product_id: 1,
    source_variant_id: 1,
    initial_price: 1,
    actual_price: 10,
  },
]

const getMockedAuctions = () => auctions

async function getActiveAuctions(
  config: BigcommerceConfig
): Promise<Auction[]> {
  return getMockedAuctions()
  const url = '/auctions?status=1'
  const { data } = await config.storeApiFetch<any>(url)
  return data
}

export default getActiveAuctions
