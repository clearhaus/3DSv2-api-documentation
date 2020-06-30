.. _new220:

############
New in 2.2.0
############

.. note::

  We are working on a better vizualization of the differences between 2.1.0 and
  2.2.0.

  We are aware that this is not optimal.

Decoupled Authentication
   Decoupled authentication is used to authenticate cardholder outside the EMV
   3DS protocol. For example the cardholder could be asked to phone her bank.

Whitelisting
   Used for letting ACS whitelist e.g. a specific 3DS Requestor. Support is
   indicated in card range data ``acsInfoInd`` containing ``"04"``.

3RI
   Better 3RI usage is now supported.

New data elements
"""""""""""""""""

``CReq``
   - ``threeDSRequestorAppURL``
   - ``whitelistingDataEntry``

``CRes``
   - ``whitelistingInfoText``

``AReq``
   - ``threeDSRequestorDecMaxTime``
   - ``threeDSRequestorDecReqInd``
   - ``browserJavascriptEnabled``
   - ``whiteListStatus``
   - ``whiteListStatusSource``

``ARes``
   - ``acsDecConInd``
   - ``whiteListStatus``
   - ``whiteListStatusSource``

``RReq``
   - ``whiteListStatus``
   - ``whiteListStatusSource``
   - ``sdkTransID``

Modified data elements
""""""""""""""""""""""

``AReq``
   - ``threeDSRequestorChallengeInd``
   - ``threeRIInd``
   - ``browserJavaEnabled``
   - ``browserScreenHeight``
   - ``browserScreenWidth``
   - ``browserTZ``
   - ``browserColorDepth``
   - ``purchaseInstalData``

``ARes``
   - ``acsChallengeMandated``
   - ``acsRenderingType``
   - ``authenticationType``
   - ``authenticationValue``
   - ``cardholderInfo``
   - ``transStatus``
   - ``transStatusReason``

``RReq``
   - ``authenticationType``
   - ``authenticationValue``
   - ``challengeCancel``
   - ``transStatus``
   - ``transStatusReason``

``CReq``
   - ``threeDSReqAuthMethodInd``
