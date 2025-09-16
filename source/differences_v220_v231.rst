Differences: v2.2.0 to v2.3.1
=============================================================

This document outlines the differences in message fields between 3D-Secure specification versions 2.2.0 and 2.3.1 for the core message types: AReq, ARes, and RReq.


Summary of Changes
------------------

+--------------+--------------+----------------+------------------------+
| Message Type | Fields Added | Fields Removed | Fields Renamed/Changed |
+==============+==============+================+========================+
| AReq         | 25           | 1              | 2                      |
+--------------+--------------+----------------+------------------------+
| ARes         | 11           | 0              | 3                      |
+--------------+--------------+----------------+------------------------+
| RReq         | 5            | 0              | 3                      |
+--------------+--------------+----------------+------------------------+

AReq Changes
-------------------------------------

New Fields Added in v2.3.1
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field Name
     - Description
   * - **acceptLanguage**
     - Value representing the Browser language preference present in the HTTP header
   * - **appIp**
     - External IP address used by the 3DS Requestor App
   * - **acquirerCountryCode**
     - The code of the country where the acquiring institution is located
   * - **acquirerCountryCodeSource**
     - System setting the Acquirer Country Code
   * - **broadInfo**
     - Unstructured information sent between 3DS Server, DS and ACS
   * - **cardSecurityCode**
     - Three- or four-digit security code printed on the card
   * - **deviceBindingStatus**
     - Communication of Device Binding Status between ACS, DS and 3DS Requestor
   * - **deviceBindingStatusSource**
     - System setting Device Binding Status
   * - **deviceId**
     - Unique and immutable identifier linked to a device
   * - **defaultSdkType**
     - Characteristics of a Default-SDK
   * - **multiTransaction**
     - Additional transaction information for multiple transactions or Merchants
   * - **payeeOriginAReq**
     - Origin of the payee for SPC Transaction Data
   * - **payTokenInfo**
     - Information about detokenised Payment Token
   * - **recurringAmount**
     - Recurring amount in minor units of currency
   * - **recurringCurrency**
     - Currency in which the Recurring Amount is expressed
   * - **recurringDate**
     - Effective date of the new authorised amount
   * - **recurringExponent**
     - Minor units of currency for recurring amount
   * - **recurringInd**
     - Indicates whether recurring/instalment payment has fixed or variable amount and frequency
   * - **sdkServerSignedContent**
     - JWS object created by the Split-SDK Server for AReq message
   * - **sdkSignatureTimestamp**
     - Date and time when 3DS SDK generated the Split-SDK Server Signed Content
   * - **sdkType**
     - Indicates the type of 3DS SDK
   * - **sellerInfo**
     - Additional transaction information for marketplace transactions
   * - **spcIncompInd**
     - Reason that SPC authentication was not completed
   * - **splitSdkType**
     - Characteristics of a Split-SDK
   * - **taxId**
     - Cardholder's tax identification
   * - **threeDSMethodId**
     - 3DS Server Transaction ID used during previous 3DS Method execution
   * - **threeDSRequestorSpcSupport**
     - Indicates if 3DS Requestor supports SPC authentication
   * - **userId**
     - Identifier of the transacting user's Browser Account ID

Fields Removed in v2.3.1
~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field Name
     - Description
   * - **threeDSReqAuthMethodInd**
     - Signature verification performed by DS on cardholder authentication mechanism

Fields Renamed/Changed in v2.3.1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Old Field Name → New Field Name
     - Description
   * - **whiteListStatus** → **trustListStatus**
     - Communication of trusted beneficiary status
   * - **whiteListStatusSource** → **trustListStatusSource**
     - System setting Trust List Status

----

ARes Changes
--------------------------------------

New Fields Added in v2.3.1
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field Name
     - Description
   * - **broadInfo**
     - Unstructured information sent between 3DS Server, DS and ACS
   * - **cardSecurityCodeStatus**
     - Communication of Card Security Code Status
   * - **cardSecurityCodeStatusSource**
     - System setting Card Security Code Status
   * - **deviceBindingStatus**
     - Communication of Device Binding Status
   * - **deviceBindingStatusSource**
     - System setting Device Binding Status
   * - **deviceInfoRecognisedVersion**
     - Highest Data Version of Device Information supported by ACS
   * - **spcTransData**
     - Information for SPC API display in Smart Modal Window
   * - **threeDSRequestorAppURLInd**
     - Whether OOB Authentication App supports 3DS Requestor App URL
   * - **transChallengeExemption**
     - Exemption applied by ACS to authenticate without challenge
   * - **transStatusReasonInfo**
     - Additional information on Transaction Status Reason
   * - **webAuthnCredList**
     - List of credential IDs registered for Cardholder Account Number


Fields Renamed/Changed in v2.3.1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Old Field Name → New Field Name
     - Description
   * - **authenticationType** → **authenticationMethod**
     - Authentication approach used by ACS (expanded enum values)
   * - **whiteListStatus** → **trustListStatus**
     - Communication of trusted beneficiary status
   * - **whiteListStatusSource** → **trustListStatusSource**
     - System setting Trust List Status

----

RReq Changes
------------------------------

New Fields Added in v2.3.1
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field Name
     - Description
   * - **cardholderInfo**
     - Text provided by ACS/Issuer to Cardholder during transaction
   * - **challengeErrorReporting**
     - Error reporting for challenge cancellation
   * - **deviceBindingStatus**
     - Communication of Device Binding Status
   * - **deviceBindingStatusSource**
     - System setting Device Binding Status
   * - **transStatusReasonInfo**
     - Additional information on Transaction Status Reason

Fields Renamed/Changed in v2.3.1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Old Field Name → New Field Name
     - Description
   * - **authenticationType** → **authenticationMethod**
     - Authentication approach used by ACS
   * - **whiteListStatus** → **trustListStatus**
     - Communication of trusted beneficiary status
   * - **whiteListStatusSource** → **trustListStatusSource**
     - System setting Trust List Status

----

*This document reflects the field-level differences between 3D-Secure specification versions 2.2.0 and 2.3.1. For complete implementation details, refer to the official EMVCo 3D-Secure specification documents.*
