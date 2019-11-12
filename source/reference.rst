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
  * - acctID
    - 
    - No
    - 
  * - acctInfo
    - 
    - No
    - 
  * - acctNumber
    - 
    - Yes
    - 
  * - acctType
    - 
    - No
    - 
  * - acquirerBIN
    - 
    - Conditional
    - 
  * - acquirerMerchantID
    - 
    - Conditional
    - 
  * - addrMatch
    - 
    - No
    - 
  * - billAddrCity
    - 
    - No
    - 
  * - billAddrCountry
    - 
    - No
    - 
  * - billAddrLine1
    - 
    - No
    - 
  * - billAddrLine2
    - 
    - No
    - 
  * - billAddrLine3
    - 
    - No
    - 
  * - billAddrPostCode
    - 
    - No
    - 
  * - billAddrState
    - 
    - No
    - 
  * - browserAcceptHeader
    - 
    - Yes
    - 
  * - browserColorDepth
    - 
    - Conditional
    - 
  * - browserIP
    - 
    - No
    - 
  * - browserJavaEnabled
    - 
    - Conditional
    - 
  * - browserJavascriptEnabled
    - 
    - Yes
    - 
  * - browserLanguage
    - 
    - Yes
    - 
  * - browserScreenHeight
    - 
    - Conditional
    - 
  * - browserScreenWidth
    - 
    - Conditional
    - 
  * - browserTZ
    - 
    - Conditional
    - 
  * - browserUserAgent
    - 
    - Yes
    - 
  * - cardExpiryDate
    - 
    - No
    - 
  * - cardholderName
    - 
    - No
    - 
  * - deviceChannel
    - 
    - Yes
    - 
  * - deviceRenderOptions
    - 
    - Yes
    - 
  * - email
    - 
    - No
    - 
  * - homePhone
    - 
    - No
    - 
  * - mcc
    - 
    - Conditional
    - 
  * - merchantCountryCode
    - 
    - Conditional
    - 
  * - merchantName
    - 
    - Conditional
    - 
  * - merchantRiskIndicator
    - 
    - No
    - 
  * - messageCategory
    - 
    - Yes
    - 
  * - messageExtension
    - 
    - No
    - 
  * - messageType
    - 
    - Yes
    - 
  * - messageVersion
    - 
    - Yes
    - 
  * - mobilePhone
    - 
    - No
    - 
  * - notificationURL
    - 
    - Yes
    - 
  * - purchaseAmount
    - 
    - Conditional
    - 
  * - purchaseCurrency
    - 
    - Conditional
    - 
  * - purchaseDate
    - 
    - Conditional
    - 
  * - purchaseExponent
    - 
    - Conditional
    - 
  * - purchaseInstalData
    - 
    - Conditional
    - 
  * - payTokenInd
    - 
    - No
    - 
  * - payTokenSource
    - 
    - Conditional
    - 
  * - recurringExpiry
    - 
    - Conditional
    - 
  * - recurringFrequency
    - 
    - Conditional
    - 
  * - sdkAppID
    - 
    - Yes
    - 
  * - sdkEncData
    - 
    - Yes
    - 
  * - sdkEphemPubKey
    - 
    - Yes
    - 
  * - sdkMaxTimeout
    - 
    - Yes
    - 
  * - sdkReferenceNumber
    - 
    - Yes
    - 
  * - sdkTransID
    - 
    - Conditional
    - 
  * - shipAddrCity
    - 
    - No
    - 
  * - shipAddrCountry
    - 
    - Conditional
    - 
  * - shipAddrLine1
    - 
    - No
    - 
  * - shipAddrLine2
    - 
    - No
    - 
  * - shipAddrLine3
    - 
    - No
    - 
  * - shipAddrPostCode
    - 
    - No
    - 
  * - shipAddrState
    - 
    - No
    - 
  * - threeDSCompInd
    - 
    - Yes
    - 
  * - threeDSReqAuthMethodInd
    - 
    - No
    - 
  * - threeDSRequestorAuthenticationInd
    - 
    - Yes
    - 
  * - threeDSRequestorAuthenticationInfo
    - 
    - No
    - 
  * - threeDSRequestorChallengeInd
    - 
    - No
    - 
  * - threeDSRequestorDecMaxTime
    - 
    - Conditional
    - 
  * - threeDSRequestorDecReqInd
    - 
    - No
    - 
  * - threeDSRequestorID
    - 
    - Yes
    - 
  * - threeDSRequestorName
    - 
    - Yes
    - 
  * - threeDSRequestorPriorAuthenticationInfo
    - 
    - No
    - 
  * - threeDSRequestorURL
    - 
    - Yes
    - 
  * - threeDSServerOperatorID
    - 
    - No
    - 
  * - threeDSServerRefNumber
    - 
    - No
    - 
  * - threeDSServerTransID
    - 
    - Yes
    - 
  * - threeDSServerURL
    - 
    - No
    - 
  * - threeRIInd
    - 
    - Yes
    - 
  * - transType
    - 
    - No
    - 
  * - whiteListStatus
    - 
    - No
    - 
  * - whiteListStatusSource
    - 
    - Conditional
    - 
  * - workPhone
    - 
    - No
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
