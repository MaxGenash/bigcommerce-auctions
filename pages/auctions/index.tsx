import type { GetStaticPropsContext } from 'next'

import { Layout } from '@components/common'
import { Auction } from '@commerce/types'
import { getConfig } from '@framework/api'
import getActiveAuctions from '@framework/auction/get-active-auctions'
import getProductByid from '@framework/product/get-product-by-id'
import useCustomer from '@framework/customer/use-customer'

import { AuctionsList as List } from '@components/auctions'

export async function getStaticProps({
  locale,
}: GetStaticPropsContext<{ slug: string }>) {
  const { data: customer } = useCustomer()
  const config = getConfig({ locale })
  const auctions = await getActiveAuctions(config)
  const promises = auctions.map((auction: Auction) =>
    getProductByid(config, auction.source_product_id)
  )
  const products = await Promise.all(promises)

  if (!customer) {
    throw new Error(`You should be logined to be able to see auctions`)
  }

  return {
    props: {
      auctions,
      products,
    },
    revalidate: 200,
  }
}

export default function AuctionsList({
  auctions,
  products,
}: {
  auctions: Auction[]
  products: []
}) {
  if (!auctions.length) {
    return <div>No auctions are available now</div>
  }
  return <List auctions={auctions} products={products} />
}

AuctionsList.Layout = Layout
