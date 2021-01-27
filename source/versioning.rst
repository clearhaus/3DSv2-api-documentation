.. _3ds_versioning:

3-D Secure version determination
================================

There are currently three 3-D Secure versions, ``1.0.2``, ``2.1.0`` and ``2.2.0``.

1. If the :ref:`preauth call <preauth-usage>` returns a :ref:`not_enrolled`, continue with 3DSv1.
2. If ``acsInfoInd`` (`2.1.0
   <specification_210.html#attr-cardRangeData-acsInfoInd>`_, `2.2.0
   <specification_220.html#attr-cardRangeData-acsInfoInd>`_) is included, this
   indicates if ACS supports challenges or only attempts.

   To select between ``2.1.0`` and ``2.2.0``, we suggest using the highest version
   that all parties support, including your implementation. Exemplified:

   - If ``dsEndProtocolVersion: 2.2.0`` and ``acsEndProtocolVersion: 2.1.0``, then the ACS
     does not support ``2.2.0`` and you must use ``2.1.0``

   - It would be safe to use ``2.2.0`` if ``dsEndProtocolVersion: 2.2.0`` and
     ``acsEndProtocolVersion: 2.2.0``

   - If ``acsStartProtocolVersion: 2.2.0`` and ``acsEndProtocolVersion: 2.2.0``, then the ACS
     is not able to receive messages with protocol version ``2.1.0``
