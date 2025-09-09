3D-Secure Specification Field Differences: v2.2.0 to v2.3.1
=============================================================

This document outlines the differences in message fields between 3D-Secure specification versions 2.2.0 and 2.3.1 for the core message types: AReq, ARes, and RReq.

Summary of Changes
------------------

+==============+==============+================+========================+
| Message Type | Fields Added | Fields Removed | Fields Renamed/Changed |
+==============+==============+================+========================+
| AReq         | 25           | 3              | 3                      |
+--------------+--------------+----------------+------------------------+
| ARes         | 11           | 1              | 2                      |
+--------------+--------------+----------------+------------------------+
| RReq         | 4            | 1              | 2                      |
+--------------+--------------+----------------+------------------------+

----

AReq (Authentication Request) Changes
-------------------------------------

New Fields Added in v2.3.1 (25 fields)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **acceptLanguage** - Value representing the Browser language preference present in the HTTP header
2. **appIp** - External IP address used by the 3DS Requestor App
3. **acquirerCountryCode** - The code of the country where the acquiring institution is located
4. **acquirerCountryCodeSource** - System setting the Acquirer Country Code
5. **broadInfo** - Unstructured information sent between 3DS Server, DS and ACS
6. **cardSecurityCode** - Three- or four-digit security code printed on the card
7. **deviceBindingStatus** - Communication of Device Binding Status between ACS, DS and 3DS Requestor
8. **deviceBindingStatusSource** - System setting Device Binding Status
9. **deviceId** - Unique and immutable identifier linked to a device
10. **defaultSdkType** - Characteristics of a Default-SDK
11. **multiTransaction** - Additional transaction information for multiple transactions or Merchants
12. **payeeOriginAReq** - Origin of the payee for SPC Transaction Data
13. **payTokenInfo** - Information about detokenised Payment Token
14. **recurringAmount** - Recurring amount in minor units of currency
15. **recurringCurrency** - Currency in which the Recurring Amount is expressed
16. **recurringDate** - Effective date of the new authorised amount
17. **recurringExponent** - Minor units of currency for recurring amount
18. **recurringInd** - Indicates whether recurring/instalment payment has fixed or variable amount and frequency
19. **sdkServerSignedContent** - JWS object created by the Split-SDK Server for AReq message
20. **sdkSignatureTimestamp** - Date and time when 3DS SDK generated the Split-SDK Server Signed Content
21. **sdkType** - Indicates the type of 3DS SDK
22. **sellerInfo** - Additional transaction information for marketplace transactions
23. **spcIncompInd** - Reason that SPC authentication was not completed
24. **splitSdkType** - Characteristics of a Split-SDK
25. **taxId** - Cardholder's tax identification
26. **threeDSMethodId** - 3DS Server Transaction ID used during previous 3DS Method execution
27. **threeDSRequestorSpcSupport** - Indicates if 3DS Requestor supports SPC authentication
28. **userId** - Identifier of the transacting user's Browser Account ID

Fields Removed in v2.3.1 (3 fields)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **threeDSReqAuthMethodInd** - Signature verification performed by DS on cardholder authentication mechanism
2. **whiteListStatus** - Renamed to ``trustListStatus``
3. **whiteListStatusSource** - Renamed to ``trustListStatusSource``

Fields Renamed/Changed in v2.3.1 (3 fields)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **whiteListStatus** → **trustListStatus** - Communication of trusted beneficiary status
2. **whiteListStatusSource** → **trustListStatusSource** - System setting Trust List Status

----

ARes (Authentication Response) Changes
--------------------------------------

New Fields Added in v2.3.1 (11 fields)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **broadInfo** - Unstructured information sent between 3DS Server, DS and ACS
2. **cardSecurityCodeStatus** - Communication of Card Security Code Status
3. **cardSecurityCodeStatusSource** - System setting Card Security Code Status
4. **deviceBindingStatus** - Communication of Device Binding Status
5. **deviceBindingStatusSource** - System setting Device Binding Status
6. **deviceInfoRecognisedVersion** - Highest Data Version of Device Information supported by ACS
7. **spcTransData** - Information for SPC API display in Smart Modal Window
8. **threeDSRequestorAppURLInd** - Whether OOB Authentication App supports 3DS Requestor App URL
9. **transChallengeExemption** - Exemption applied by ACS to authenticate without challenge
10. **transStatusReasonInfo** - Additional information on Transaction Status Reason
11. **webAuthnCredList** - List of credential IDs registered for Cardholder Account Number

Fields Removed in v2.3.1 (1 field)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **whiteListStatus** - Renamed to ``trustListStatus``
2. **whiteListStatusSource** - Renamed to ``trustListStatusSource``

Fields Renamed/Changed in v2.3.1 (2 fields)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **authenticationType** → **authenticationMethod** - Authentication approach used by ACS (expanded enum values)
2. **whiteListStatus** → **trustListStatus** - Communication of trusted beneficiary status
3. **whiteListStatusSource** → **trustListStatusSource** - System setting Trust List Status

----

RReq (Results Request) Changes
------------------------------

New Fields Added in v2.3.1 (4 fields)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **cardholderInfo** - Text provided by ACS/Issuer to Cardholder during transaction
2. **challengeErrorReporting** - Error reporting for challenge cancellation
3. **deviceBindingStatus** - Communication of Device Binding Status
4. **deviceBindingStatusSource** - System setting Device Binding Status
5. **transStatusReasonInfo** - Additional information on Transaction Status Reason

Fields Removed in v2.3.1 (1 field)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **whiteListStatus** - Renamed to ``trustListStatus``
2. **whiteListStatusSource** - Renamed to ``trustListStatusSource``

Fields Renamed/Changed in v2.3.1 (2 fields)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **authenticationType** → **authenticationMethod** - Authentication approach used by ACS
2. **whiteListStatus** → **trustListStatus** - Communication of trusted beneficiary status
3. **whiteListStatusSource** → **trustListStatusSource** - System setting Trust List Status

----

*This document reflects the field-level differences between 3D-Secure specification versions 2.2.0 and 2.3.1. For complete implementation details, refer to the official EMVCo 3D-Secure specification documents.*
