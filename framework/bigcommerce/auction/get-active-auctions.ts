import { BigcommerceConfig } from '../api'
import type { Auction } from '@commerce/types'

const auctions: Auction[] = [
  {
    id: 1,
    description: '[Auction of] Orbit Terrarium - Large',
    source_product_id: 80,
    source_variant_id: 64,
    initial_price: 50,
    actual_price: 60,
    price_step: 10,
    status: 1,
    start_date: Date.UTC(2021, 3, 10, 9, 30),
    end_date: Date.UTC(2021, 3, 23, 9, 30),
  },
  {
    id: 2,
    description: '[Auction of] Fog Linen Chambray Towel',
    source_product_id: 77,
    source_variant_id: 1,
    initial_price: 20,
    actual_price: 80,
    price_step: 10,
    status: 1,
    start_date: Date.UTC(2021, 3, 8, 18, 0),
    end_date: Date.UTC(2021, 3, 20, 18, 0),
  },
  {
    id: 3,
    description: '[Auction of] Chemex Coffeemaker 3 Cu',
    source_product_id: 88,
    source_variant_id: 67,
    initial_price: 70,
    actual_price: 200,
    price_step: 10,
    status: 1,
    start_date: Date.UTC(2021, 3, 15, 12, 45),
    end_date: Date.UTC(2021, 3, 21, 12, 45),
  },
]

const getMockedAuctions = () => auctions

async function getActiveAuctions(
  config: BigcommerceConfig
): Promise<Auction[]> {
  return getMockedAuctions()

  // TODO: use when ready
  const url = '/v3/catalog/auctions?status=1'
  const { data } = await config.storeApiFetch<any>(url)
  return data
}

export default getActiveAuctions
