import { BigcommerceConfig } from '../api'
import type { Bid } from '@commerce/types'

const bids: Bid[] = [
  {
    id: 1,
    auction_id: 1,
    customer_id: 1,
    bid_date: 1616164399,
    bid_price: 5,
  },
  {
    id: 2,
    auction_id: 1,
    customer_id: 1,
    bid_date: 1616165123,
    bid_price: 6,
  },
  {
    id: 3,
    auction_id: 1,
    customer_id: 1,
    bid_date: 1616165123,
    bid_price: 7,
  },
]

const bids2: Bid[] = [
  {
    id: 4,
    auction_id: 2,
    customer_id: 1,
    bid_date: 1616164399,
    bid_price: 5,
  },
  {
    id: 5,
    auction_id: 2,
    customer_id: 1,
    bid_date: 1616165123,
    bid_price: 6,
  },
  {
    id: 6,
    auction_id: 2,
    customer_id: 1,
    bid_date: 1616165123,
    bid_price: 7,
  },
  {
    id: 7,
    auction_id: 2,
    customer_id: 1,
    bid_date: 1616165123,
    bid_price: 7,
  },
  {
    id: 8,
    auction_id: 2,
    customer_id: 1,
    bid_date: 1616165123,
    bid_price: 7,
  },
]

const getMockedBids = (id: number) => {
  if (id === 1) {
    return bids
  } else if (id === 2) {
    return bids2
  }

  return []
}

async function getBidsByAuctionId(
  config: BigcommerceConfig,
  id: number
): Promise<Bid[]> {
  return getMockedBids(id)

  // TODO: use when ready
  const url = `v3/auctions/${id}/bids1`
  const { data } = await config.storeApiFetch<any>(url)
  return data
}

export default getBidsByAuctionId
