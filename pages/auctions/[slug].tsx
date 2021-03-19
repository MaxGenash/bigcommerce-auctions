import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { AuctionView } from '@components/auctions'

import { getConfig } from '@framework/api'
import getAuction from '@framework/auction/get-auction'
import getProductById from '@framework/product/get-product-by-id'
import { getActiveAuctions } from '@framework/auction'
import getBidsByAuctionId from '@framework/auction/get-bids-by-auction-id'

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig()
  const auctionId = Number.parseInt(params!.slug);

  if (Number.isNaN(auctionId)) {
    return {
      notFound: true,
    }
  }

  const auction = await getAuction(config, auctionId);
  const product = await getProductById(config, auction.source_product_id);
  const bids = await getBidsByAuctionId(config, auctionId);

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      auction,
      product,
      bids,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  const auctions = await getActiveAuctions(getConfig());

  return {
    paths: auctions.map(auction => `/auctions/${auction.id}`),
    fallback: 'blocking',
  }
}

export default function AuctionPage({ product, auction, bids }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ?
    <h1>Loading...</h1> :
    <AuctionView product={product} auction={auction} bids={bids} />
}

AuctionPage.Layout = Layout
