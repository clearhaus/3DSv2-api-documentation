.. _decoupled_authentication:

Decoupled Authentication
=========================

The decoupled authentication is a feature that allows you to authenticate
the cardholder during the payment process. This is a different approach to
challenge flow where the authentication is done in one simultaneous flow.
The decoupled authentication is a two-step process where the authentication
is done in a separate flow from the payment process.

The ACS can determine decoupled authentication fallback for a authentication transaction.
If a fallback is determined, `threeDSRequestorPriorAuthenticationInfo`is required.

The requestor can set the TTL for the transaction by setting the `threeDSRequestorDecMaxTime`.
The threeDSRequestorDecMaxTime accepts numeric values between `00001` and `10080`which
determines the TTL in minutes.

Once the cardholder has authenticated the transaction and the 3-D secure server has
received the `RReq`, the 3-D secure server will notify the requestor by utilizing the
`notificationURL` which will contain the `threeDSServerTransID` and `messageVersion`.
If no RReq is received within the TTL, the transaction will be considered as failed.
The 3-D secure server will only try to notify the requestor once.

The requestor shall use the `threeDSServerTransID` to retrieve the authentication value
by making a request towards the `/postauth` endpoint.
