import { BigcommerceHandler } from '@framework/api/utils/create-api-handler'
import addBid from '@framework/auction/add-bid'

const addItem: BigcommerceHandler<any, any> = async ({
  req,
  res,
  body,
  config,
}) => {
  const parsed = JSON.parse(body)
  const result = await addBid(
    config,
    parsed.auctionId,
    parsed.newBid,
    parsed.customerId
  )

  res.status(200).json({ data: result })
}

export default addItem
