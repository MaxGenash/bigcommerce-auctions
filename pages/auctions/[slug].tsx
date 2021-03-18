import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { AuctionView } from '@components/auctions'

import { getConfig } from '@framework/api'
import getProduct from '@framework/product/get-product'
import getAllPages from '@framework/common/get-all-pages'
import getAllProductPaths from '@framework/product/get-all-product-paths'

export async function getStaticProps({
 params,
 preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig()
  const { pages } = await getAllPages({ config, preview })
  const { product } = await getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      product,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  const { products } = await getAllProductPaths()

  return {
    paths: products.map((product) => `/auctions${product.node.path}`),
    fallback: 'blocking',
  }
}

export default function AuctionPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter()

  return router.isFallback ?
    <h1>Loading...</h1> :
    <AuctionView product={product as any} />
}

AuctionPage.Layout = Layout
