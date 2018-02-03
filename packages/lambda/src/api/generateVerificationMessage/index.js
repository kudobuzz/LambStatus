import CloudFormation from 'aws/cloudFormation'
import querystring from 'querystring'
import { SettingsProxy } from 'api/utils'
import { stackName } from 'utils/const'

export async function handle (event, context, callback) {
  try {
    const settings = new SettingsProxy()
    const serviceName = await settings.getServiceName()
    const statusPageURL = await settings.getStatusPageURL()
    const clientID = await new CloudFormation(stackName).getSubscribersPoolClientID()
    const code = event.request.codeParameter
    const username = event.userName

    const confirmationURL = buildConfirmURL(statusPageURL, clientID, code, username)

    const smsMessage = `Confirmation by SMS is not supported yet (${code})`
    const emailMessage = generateEmailMessage(serviceName, confirmationURL)
    const emailSubject = generateEmailSubject(serviceName)

    callback(null, {
      ...event,
      response: {smsMessage, emailMessage, emailSubject}
    })
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
    callback('Error: failed to generate message')
  }
}

export const generateEmailMessage = (serviceName, confirmationURL) => {
  return `Thank you for subscribing to ${serviceName} status updates. Click the following link to start your subscription: ${confirmationURL}`
}

export const generateEmailSubject = (serviceName) => {
  return `${serviceName} status - confirm your subscription`
}

export const buildConfirmURL = (statusPageURL, clientID, code, username) => {
  // do not encode code value since cognito will replace it later.
  const query = `clientID=${querystring.escape(clientID)}&username=${querystring.escape(username)}&code=${code}`
  return `${statusPageURL}/api/subscribers/confirm?${query}`
}
