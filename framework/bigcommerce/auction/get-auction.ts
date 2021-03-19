import { BigcommerceConfig } from '@framework/api'
import { Auction } from '@commerce/types'

const mockResponse: Auction = {
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
  };

async function getAuction (config: BigcommerceConfig, auctionId: number): Promise<Auction> {
  return mockResponse;

  // TODO: use when ready
  const result: Auction = await config.storeApiFetch(`/v3/catalog/auctions/${auctionId}`)
  return result;
}

export default getAuction
