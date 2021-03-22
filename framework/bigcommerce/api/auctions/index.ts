import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  BigcommerceApiHandler,
} from '../utils/create-api-handler'
import { BigcommerceApiError } from '../utils/errors'
import addItem from './handlers/add-item'

const METHODS = ['GET', 'POST', 'PUT', 'DELETE']

const auctionsApi: BigcommerceApiHandler<any, any> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  try {
    // Create a new bid
    if (req.method === 'POST') {
      const body = req.body
      return await handlers['addItem']({ req, res, config, body })
    }
  } catch (error) {
    console.error(error)

    const message =
      error instanceof BigcommerceApiError
        ? 'An unexpected error ocurred with the Bigcommerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export const handlers = { addItem }

export default createApiHandler(auctionsApi, handlers, {})
