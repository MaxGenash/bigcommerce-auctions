import { BigcommerceConfig } from '../api'
import type { Auction } from '@commerce/types'
import { normalizeAuctionData } from '@framework/lib/normalize'

async function getActiveAuctions(
  config: BigcommerceConfig
): Promise<Auction[]> {
  const url = '/v3/catalog/auctions?status=1&limit=100'
  const result = await config.storeApiFetch<any>(url)
  return result?.data?.map((item: any) => normalizeAuctionData(item));
}

export default getActiveAuctions
