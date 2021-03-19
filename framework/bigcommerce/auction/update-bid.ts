import { BigcommerceConfig } from '@framework/api'

// Return current cart info
async function updateBid (config: BigcommerceConfig, auctionId: number, newBid: number): Promise<unknown> {
  return await config.storeApiFetch(
    `/v3/catalog/auctions/${auctionId}`,
    {
      method: 'POST',
      body: JSON.stringify({ bid: newBid }),
    }
  )
}

export default updateBid
