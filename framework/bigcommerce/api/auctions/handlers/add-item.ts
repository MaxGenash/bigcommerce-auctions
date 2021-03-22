import { BigcommerceHandler } from '@framework/api/utils/create-api-handler'
import addBid from '@framework/auction/add-bid'

const addItem: BigcommerceHandler<any, any> = async ({
  req,
  res,
  body,
  config,
}) => {
  const result = await addBid(
    config,
    body.auctionId,
    body.newBid,
    body.customerId
  )

  res.status(200).json({ data: result })
}

export default addItem
