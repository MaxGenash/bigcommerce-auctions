import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, useState } from 'react'
import { ProductSlider } from '@components/product'
import { Button, Container, Input, Text, useUI } from '@components/ui'
import type { Product } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'

import s from './AuctionView.module.css'

interface Props {
  className?: string
  children?: any
  product: Product
}

const AuctionView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  const { openSidebar } = useUI()
  const [isLoading, setLoading] = useState(false)
  const [placedBid, setPlacedBid] = useState()

  // TODO: disable bid button if not logged in
  // const { data: customer } = useCustomer()
  // if (!customer) {
  //   throw new Error(`You should be logged in to be able to see auctions`)
  // }

  const minBidStep = 10;

  const submitBid = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(product.variants[0].id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo
        title={product.name}
        description={product.description}
      />
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.sliderContainer}>
            <ProductSlider key={product.id}>
              {product.images.map((image, i) => (
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
              <Text html={product.description} />
            </div>
            <div className="pb-6">
              <h4 className="font-bold text-base"> Time left </h4>
              <p>
                <span> 1d 12h 30s </span>
                <span> (Sep 24, 9:25 AM) </span>
              </p>
            </div>
            <div className="pb-6">
              <h4 className="font-bold text-base"> Current bid </h4>
              <p>
              <span className={s.price}>
                {price}
                {` `}
                {product.price?.currencyCode}
              </span>
                <span> (12 bids) </span>
              </p>
            </div>
            <div className="pb-6">
              <h4 className="font-bold text-base"> Your bid </h4>
              <p>
                <span> Enter {price + ' + ' + minBidStep} {` `} {product.price?.currencyCode} or more </span>
              </p>
              <Input
                className={s.inputBid}
                type="number"
                value={placedBid}
                onChange={setPlacedBid}
                step={minBidStep}
              />
            </div>
            <Button
              aria-label="Place bid"
              type="submit"
              className={s.btnSubmit}
              loading={isLoading}
              disabled={false /*TODO !variant && product.options.length > 0*/}
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
