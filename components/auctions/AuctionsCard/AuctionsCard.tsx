import Image from 'next/image'
import Link from 'next/link'
import { Interval } from 'luxon'

import { Auction, Bid, Product } from '@commerce/types'

const getTimeLeft = (auction: Auction) => {
  const date = Interval.fromDateTimes(new Date(), new Date(auction.end_date))
    .toDuration(['days', 'hours', 'minutes'])
    .toObject()
  return Object.keys(date)
    .map((duration) => `${date[duration].toFixed(0)}${duration.slice(0, 1)}`)
    .join(' ')
}

const AuctionsCard = ({
  auction,
  product,
  bids,
}: {
  auction: Auction
  product: Product | undefined
  bids: Bid[] | undefined
}) => {
  const bidsNumber = bids ? bids.length : 0
  return (
    <div className="">
      <Link href={`/auctions/${auction.id}`}>
        <Image
          className="cursor-pointer"
          width={320}
          height={320}
          src={
            product?.defaultImage?.url320wide || '/product-img-placeholder.svg'
          }
          unoptimized
        />
      </Link>
      {product?.brand && <div>{product?.brand}</div>}
      <div>{product?.name}</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="font-bold text-base">
            ${auction.actual_price.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">{bidsNumber} bids</div>
        </div>
        <div className="text-sm">{getTimeLeft(auction)}</div>
      </div>
    </div>
  )
}

export default AuctionsCard
