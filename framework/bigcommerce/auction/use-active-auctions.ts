import useSWR from 'swr'
import { getConfig } from '@framework/api'
import getActiveAuctions from './get-active-auctions'
import getProductById from '@framework/product/get-product-by-id'
import { Auction } from '@commerce/types'

const fetcher = async () => {
  const config = getConfig()
  const auctions = await getActiveAuctions(config)
  const promises = auctions.map((auction: Auction) =>
    getProductById(config, auction.source_product_id)
  )
  const products = await Promise.all(promises)

  return {
    data: {
      auctions,
      products,
    },
  }
}

function useActiveAuctions() {
  const result = useSWR(`/active-auctions`, fetcher)
  return result
}

export default useActiveAuctions
