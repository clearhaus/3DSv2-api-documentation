.. _reference:

#########
Reference
#########

.. _preauth-endpoint:

``/preauth`` endpoint
=====================

Input
-----

.. list-table::
  :widths: 1 1 1 30
  :header-rows: 1

  * - Key
    - Format
    - Required
    - Comments
  * - acctNumber
    - ``^[1-9]\d{12,18}$``
    - Yes
    - The cardholders account number or e.g. a tokenized PAN.

.. _preauth-response:

Output
------

.. list-table::
  :widths: 1 1 1 30
  :header-rows: 1

  * - Key
    - Format
    - Required
    - Comments
  * - acsStartProtocolVersion
    - messageVersion
    - Yes
    - 
  * - acsEndProtocolVersion
    - messageVersion
    - Yes
    - 
  * - threeDSServerTransID
    - UUID
    - Yes
    - 
  * - dsStartProtocolVersion
    - messageVersion
    - No
    - 
  * - acsInfoInd
    - ACSInfo
    - No
    - 
  * - threeDSMethodURL
    - URL
    - No
    - 

3DS Method Invocation
=====================

If the `/preauth` call includes a `threeDSMethodURL`, the 3DS Method _must_ be
invoked.

1. Create JSON object containing `threeDSServerTransID` from the `/preauth`
   call:

   .. code-block:: json

     {
       "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
       "threeDSMethodNotificationURL": "<Requestor callback URL>"
     }

1. _(Requirement 261)_
   Render a hidden HTML iframe in the Cardholder browser and send a form
   with a field name `threeDSMethodData` containing the above JSON to the
   `threeDSMethodURL`.

.. _auth-endpoint:

``/auth`` endpoint
==================

Input
-----

.. list-table::
  :widths: 1 1 1 30
  :header-rows: 1

  * - Key
    - Format
    - Required
    - Comments
  * - threeDSCompInd
    -
    -
    -
  * - threeDSRequestorAuthenticationInfo
    -
    -
    -
  * - threeDSReqAuthMethodInd
    -
    -
    -
  * - threeDSRequestorChallengeInd
    -
    -
    -
  * - threeDSRequestorAuthenticationInd
    -
    -
    -
  * - threeDSRequestorDecMaxTime
    -
    -
    -
  * - threeDSRequestorDecReqInd
    -
    -
    -
  * - threeDSRequestorID
    -
    -
    -
  * - threeDSRequestorName
    -
    -
    -
  * - threeDSRequestorPriorAuthenticationInfo
    -
    -
    -
  * - threeDSRequestorURL
    -
    -
    -
  * - threeDSServerTransID
    -
    -
    -
  * - threeRIInd
    -
    -
    -
  * - acctType
    -
    -
    -
  * - acctID
    -
    -
    -
  * - acctInfo
    -
    -
    -
  * - acctNumber
    -
    -
    -
  * - acquirerBIN
    -
    -
    -
  * - acquirerMerchantID
    -
    -
    -
  * - addrMatch
    -
    -
    -
  * - billAddrCity
    -
    -
    -
  * - billAddrCountry
    -
    -
    -
  * - billAddrLine1
    -
    -
    -
  * - billAddrLine2
    -
    -
    -
  * - billAddrLine3
    -
    -
    -
  * - billAddrPostCode
    -
    -
    -
  * - billAddrState
    -
    -
    -
  * - browserAcceptHeader
    -
    -
    -
  * - browserColorDepth
    -
    -
    -
  * - browserIP
    -
    -
    -
  * - browserJavaEnabled
    -
    -
    -
  * - browserJavascriptEnabled
    -
    -
    -
  * - browserLanguage
    -
    -
    -
  * - browserScreenHeight
    -
    -
    -
  * - browserScreenWidth
    -
    -
    -
  * - browserTZ
    -
    -
    -
  * - browserUserAgent
    -
    -
    -
  * - cardExpiryDate
    -
    -
    -
  * - cardholderName
    -
    -
    -
  * - homePhone
    -
    -
    -
  * - mobilePhone
    -
    -
    -
  * - workPhone
    -
    -
    -
  * - email
    -
    -
    -
  * - shipAddrCity
    -
    -
    -
  * - shipAddrCountry
    -
    -
    -
  * - shipAddrLine1
    -
    -
    -
  * - shipAddrLine2
    -
    -
    -
  * - shipAddrLine3
    -
    -
    -
  * - shipAddrPostCode
    -
    -
    -
  * - shipAddrState
    -
    -
    -
  * - deviceChannel
    -
    -
    -
  * - deviceRenderOptions
    -
    -
    -
  * - purchaseInstalData
    -
    -
    -
  * - merchantCountryCode
    -
    -
    -
  * - merchantName
    -
    -
    -
  * - merchantRiskIndicator
    -
    -
    -
  * - messageCategory
    -
    -
    -
  * - messageExtension
    -
    -
    -
  * - messageType
    -
    -
    -
  * - messageVersion
    -
    -
    -
  * - mcc
    -
    -
    -
  * - notificationURL
    -
    -
    -
  * - purchaseAmount
    -
    -
    -
  * - purchaseCurrency
    -
    -
    -
  * - purchaseExponent
    -
    -
    -
  * - purchaseDate
    -
    -
    -
  * - recurringExpiry
    -
    -
    -
  * - recurringFrequency
    -
    -
    -
  * - sdkAppID
    -
    -
    -
  * - sdkEncData
    -
    -
    -
  * - sdkEphemPubKey
    -
    -
    -
  * - sdkMaxTimeout
    -
    -
    -
  * - sdkReferenceNumber
    -
    -
    -
  * - sdkTransID
    -
    -
    -
  * - transType
    -
    -
    -
  * - whiteListStatus
    -
    -
    -
  * - whiteListStatusSource
    -
    -
    -
  * - payTokenInd
    -
    -
    -
  * - payTokenSource
    -
    -
    -

Output
------

.. list-table::
  :widths: 1 1 1 30
  :header-rows: 1

  * - Key
    - Format
    - Required
    - Comments
  * - acsChallengeMandated
    -
    -
    -
  * - acsDecConInd
    -
    -
    -
  * - acsOperatorID
    -
    -
    -
  * - acsReferenceNumber
    -
    -
    -
  * - acsRenderingType
    -
    -
    -
  * - acsSignedContent
    -
    -
    -
  * - acsTransID
    -
    -
    -
  * - acsURL
    -
    -
    -
  * - authenticationType
    -
    -
    -
  * - authenticationValue
    -
    -
    -
  * - cardholderInfo
    -
    -
    -
  * - dsReferenceNumber
    -
    -
    -
  * - dsTransID
    -
    -
    -
  * - eci
    -
    -
    -
  * - messageExtension
    -
    -
    -
  * - messageType
    -
    -
    -
  * - messageVersion
    -
    -
    -
  * - sdkTransID
    -
    -
    -
  * - threeDSServerTransID
    -
    -
    -
  * - transStatus
    -
    -
    -
  * - transStatusReason
    -
    -
    -
  * - whiteListStatus
    -
    -
    -
  * - whiteListStatusSource
    -
    -
    -

.. _challenge-flow:

Challenge Flow
==============

TODO: Add information about how requestor should perform the challenge.

.. _postauth-endpoint:

``/postauth`` endpoint
======================

Input
-----

.. list-table::
  :widths: 1 1 1
  :header-rows: 1

  * - Key
    - Format
    - Required
  * - threeDSServerTransID
    - UUID
    - Yes

Output
------

.. list-table::
  :widths: 1 1 1 30
  :header-rows: 1

  * - Key
    - Format
    - Required
    - Comments
  * - authenticationValue
    -
    -
    -
  * - threeDSServerTransID
    -
    -
    -
  * - authenticationType
    -
    -
    -
  * - acsTransID
    -
    -
    -
  * - acsRenderingType
    -
    -
    -
  * - challengeCancel
    -
    -
    -
  * - dsTransID
    -
    -
    -
  * - eci
    -
    -
    -
  * - interactionCounter
    -
    -
    -
  * - messageExtension
    -
    -
    -
  * - messageCategory
    -
    -
    -
  * - messageType
    -
    -
    -
  * - messageVersion
    -
    -
    -
  * - sdkTransID
    -
    -
    -
  * - transStatus
    -
    -
    -
  * - transStatusReason
    -
    -
    -
  * - whiteListStatus
    -
    -
    -
  * - whiteListStatusSource
    -
    -
    -
