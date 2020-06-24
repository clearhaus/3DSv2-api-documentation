.. _3ds_versioning:

3-D Secure version determination
================================

There are currently three 3-D Secure versions, ``1.0.2``, ``2.1.0`` and ``2.2.0``.

1. If the :ref:`preauth call <preauth-usage>` returns a :ref:`not_enrolled`, continue with 3DSv1.
2. If ``acsInfoInd`` (`2.1.0
   <specification_210.html#attr-cardRangeData-acsInfoInd>`_, `2.2.0
   <specification_220.html#attr-cardRangeData-acsInfoInd>`_) is included, this
   indicates if ACS supports challenges or only attempts.

   To select between ``2.1.0`` and ``2.2.0``, use the highest supported version
   between ``dsEndProtocolVersion`` and ``acsEndProtocolVersion``, and the
   versions your implementation supports.
