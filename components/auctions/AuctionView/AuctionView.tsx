import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, FormEvent, useState } from 'react'
import { ProductSlider } from '@components/product'
import { Button, Container, Text } from '@components/ui'
import type { Auction, Product, Bid } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import useCustomer from '@framework/customer/use-customer'
import { DateTime, Duration } from 'luxon'
import { useTimer } from 'use-timer'

import s from './AuctionView.module.css'
import { useRouter } from 'next/router'

interface Props {
  className?: string
  children?: any
  product: Product
  auction: Auction
  bids: Bid[]
}

const AuctionView: FC<Props> = ({ product, auction, bids }) => {
  const minNextBidValue = auction.actual_price + auction.price_step
  const currencyCode = product?.price?.currencyCode
  const { price: currentBidPrice } = usePrice({
    amount: auction.actual_price,
    currencyCode: currencyCode,
  })
  const { price: nextBidPrice } = usePrice({
    amount: minNextBidValue,
    currencyCode: currencyCode,
  })

  const [isLoading, setLoading] = useState(false)

  const router = useRouter()

  const { data: customer } = useCustomer()

  const submitBid = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log('customer data = ', customer)

      await fetch('/api/bigcommerce/auctions', {
        method: 'POST',
        body: JSON.stringify({
          auctionId: auction.id,
          newBid: nextBidPrice,
          customerId: customer?.entityId,
        }),
      })

      alert('Your bid was saved successfully!')
      router.reload()
      setLoading(false)
    } catch (err) {
      console.error(err)
      alert("Couldn't save your bid")
      setLoading(false)
    }
  }
  const bidsOverall = bids?.length || 0

  const { time: currentSecondsLeft } = useTimer({
    initialTime: Math.floor((auction.end_date - Date.now()) / 1000),
    timerType: 'DECREMENTAL',
    autostart: true,
  })
  const timeLeftInfo = Duration.fromMillis(currentSecondsLeft * 1000)
    .shiftTo('days', 'hours', 'minutes', 'seconds')
    .toObject()
  const endDateStr = DateTime.fromMillis(auction.end_date).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  )

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo title={product.name} description={product.description} />
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.sliderContainer}>
            <ProductSlider key={product.id}>
              {product?.images?.map((image, i) => (
                <div key={image.url} className={s.imageContainer}>
                  <Image
                    className={s.img}
                    src={image.url!}
                    alt={image.alt || 'Product Image'}
                    width={1050}
                    height={1050}
                    priority={i === 0}
                    quality="85"
                  />
                </div>
              ))}
            </ProductSlider>
          </div>
        </div>
        <div className={s.sidebar}>
          <form onSubmit={submitBid}>
            <div className={s.nameBox}>
              <h1 className={s.name}>{product.name}</h1>
            </div>
            <div className="pb-6 break-words w-full max-w-xl">
              <Text html={auction.description} />
            </div>
            <div className="pb-6 break-words w-full max-w-xl">
              <Text html={product.description} />
            </div>
            <div className="pb-6">
              <h4 className="font-bold text-base"> Time left </h4>
              <p>
                <span>
                  {' '}
                  {timeLeftInfo.days}d {timeLeftInfo.hours}h{' '}
                  {timeLeftInfo.minutes}m {timeLeftInfo.seconds}s{' '}
                </span>
                <span> ({endDateStr}) </span>
              </p>
            </div>
            <div className="pb-6">
              <h4 className="font-bold text-base"> Current price </h4>
              <p>
                <span className={s.price}> {currentBidPrice} </span>
                <span> ({bidsOverall} bids) </span>
              </p>
            </div>
            <div className="pb-6">
              <h4 className="font-bold text-base"> Your bid </h4>
              <p>
                <span> {nextBidPrice} </span>
              </p>
            </div>
            <Button
              aria-label="Place bid"
              type="submit"
              className={s.btnSubmit}
              loading={isLoading}
              title={
                customer?.entityId
                  ? ''
                  : 'Please log in to be able to place bids'
              }
              disabled={isLoading || !customer?.entityId}
            >
              Place bid
            </Button>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default AuctionView
