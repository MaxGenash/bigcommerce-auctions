import Image from 'next/image'
import Link from 'next/link'

import { Auction, Product } from '@commerce/types'

import s from './AuctionsList.module.css'

const getProduct = (
  auction: Auction,
  products: Product[]
): Product | undefined => {
  return products.find((product) => product.id === auction.source_product_id)
}

const AuctionsList = ({
  auctions,
  products,
}: {
  auctions: Auction[]
  products: Product[]
}) => {
  return (
    <div>
      <h1>Auctions List</h1>
      <table>
        <tr>
          <th>Auction id</th>
          <th>Description</th>
          <th>Product Name</th>
          <th>Product Image</th>
          <th></th>
        </tr>
        {auctions?.map((auction: Auction) => (
          <tr>
            <td>{auction.id}</td>
            <td>{auction.description}</td>
            <td>{getProduct(auction, products)!.name}</td>
            <td>
              <Image
                // className={s.productImage}
                width={150}
                height={150}
                src={getProduct(auction, products)!.images[0]!.url}
                alt={getProduct(auction, products)!.images[0]!.alt}
                unoptimized
              />
            </td>
            <td>
              <Link href="/auctions/{auction.id}">
                <a className={s.link}>Auctions</a>
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default AuctionsList
