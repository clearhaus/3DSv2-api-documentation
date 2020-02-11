.. _3ds_versioning:

3-D Secure version determination
================================

There are currently three 3-D Secure versions, ``1.0.2``, ``2.1.0`` and ``2.2.0``.
This is meant to be a guide to selecting between different 3-D Secure versions.

1. If the :ref:`preauth call <preauth-usage>` returns a :ref:`not_enrolled`, continue with 3DSv1.
2. If ``acsInfoInd`` is included, this informs if ACS supports challenges or
   only attempts.

   To select between ``2.1.0`` and ``2.2.0``, use the highest supported version
   between in ``dsEndProtocolVersion`` and ``acsEndProtocolVersion``, and the
   versions your implementation supports.

3. For Mastercard, ``acsInfoInd`` is often not available. Mastercard has
   automatically enrolled all card ranges, without indicating if they were
   automatically enrolled in ``acsInfoInd``.

   You should note that if issuers do not support 3DSv2 (EMV 3DS) and their
   card range has been automatically enrolled, they may reject authorizations
   made with EMV 3DS values against your Gateway.

   It is recommended that a fully authenticated or attempt 3DSv2 authorization
   that is rejected by the issuer, is retried with either 3DSv1 values or
   without 3-D Secure.

   A commonality between automatically enrolled Mastercard card ranges is:

   1. The enrolled bins are 19 digits.
   2. No ``dsStartProtocolVersion`` or ``dsEndProtocolVersion`` is present.
   3. No ``threeDSMethodURL`` is present.
   4. ``acsStartProtocolVersion`` is ``2.1.0`` and ``acsEndProtocolVersion`` is ``2.2.0``.
