import { BigcommerceConfig } from '@framework/api'

async function addBid(
  config: BigcommerceConfig,
  auctionId: number,
  newBid: number,
  customerId: string
): Promise<unknown> {
  return await config.storeApiFetch(`/v3/catalog/auctions/${auctionId}`, {
    method: 'POST',
    body: JSON.stringify({
      customer_id: customerId,
      actual_price: newBid,
    }),
  })
}

export default addBid
