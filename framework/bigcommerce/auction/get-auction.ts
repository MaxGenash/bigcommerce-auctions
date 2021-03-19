import { BigcommerceConfig } from '@framework/api'
import { Auction } from '@commerce/types'
import { normalizeAuctionData } from '@framework/lib/normalize'

async function getAuction (config: BigcommerceConfig, auctionId: number): Promise<Auction> {
  const url = `/v3/catalog/auctions/${auctionId}`;
  const result = await config.storeApiFetch<any>(url)
  return normalizeAuctionData(result?.data);
}

export default getAuction
