.. _3ds_versioning:

3-D Secure version determination
================================

There are currently three 3-D Secure versions, ``1.0.2``, ``2.1.0`` and ``2.2.0``.
This is meant to be a guide to selecting between different 3-D Secure versions.

1. If the :ref:`preauth <preauth-usage>` returns a :ref:`not_enrolled`, continue with 3DSv1.
2. When card scheme is Visa, ``acsInfoInd`` is included. This can be used to
   determine if ACS supports challenges or only attempts.

   For Mastercard, ``acsInfoInd`` is not available. Mastercard has
   automatically enrolled all card ranges, without indicating if they were automatically
   enrolled in ``acsInfoInd``.

   You should note that if issuers do not support 3DSv2 (EMV 3DS) and their
   card range has been automatically enrolled, they may reject authorizations
   made with EMV 3DS values against you Gateway.

   It is recommended that a fully authenticated or attempt 3DSv2 authorization
   that is rejected by the issuer, is retried with either 3DSv1 values or
   without 3-D Secure.

   A commonality between automatically enrolled Mastercard card ranges is:

   1. The enrolled bins are 19 digits.
   2. No ``ds{Start,End}ProtocolVersion`` is present.
   3. No ``threeDSMethodURL`` is present.
   4. ``acsStartProtocolVersion`` is ``2.1.0`` and ``acsEndProtocolVersion`` is ``2.2.0``.

3. To select between ``2.1.0`` and ``2.2.0``, use the highest supported version
   between in ``dsEndProtocolVersion`` and ``acsEndProtocolVersion``, and the
   versions your implementation supports.
