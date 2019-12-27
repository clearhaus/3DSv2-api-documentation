############
Introduction
############

.. toctree::
   :maxdepth: 2
   :caption: Contents:
   :hidden:
   :numbered: 2

   self
   getting-started
   server-information
   usage
   guides
   reference
   sandbox

.. note::
  This documentation is a work in progress. (Updated December 22nd 2019)

  Currently this documentation only contains information about v2.1.0.

This is the documentation for the 3-D Secure Server provided by `3dsecure.io`_.
It is a Software as a Service (SaaS) implementation, offering a language-agnostic
HTTP API integration. This service supports all active versions of 3-D Secure version 2
(``2.1.0``, ``2.2.0``) and our goal was to make the documentation work on it’s own.
Nevertheless, you may need to refer to the specifications during the implementation.

A 3-D Secure Server is used for *cardholder authentication*. An authentication in 3-D Secure
is the process of verifying cardholder involvement in e.g. a purchase. An authentication
results from an *authentication flow* and proof of authentication is an *authentication value*.
Get an overview of a 3-D Secure Server in :ref:`what-is-a-3-d-secure-server`

Who should integrate with this service
=======================================

Candidates for integrating with this service:

- Acquirers
- Gateways
- Merchants

Why choose this service by **3dsecure.io**?
===========================================

We believe our service is a great product! Let us list a few reasons why.

Developed to have no downtime
  Updates and deployments have been engineered to have no downtime
  for integrators.

No performance limit
  The service is highly scalable and has been engineered to be redundant.

Sandbox service
  We provide access to a sandbox service that allows for continuous testing
  against a “live” system.

Competitive pricing
  We offer plans you can grow with. Our pricing is aimed at both low scale
  users as well as high scale enterprise users.

Dedicated dashboard (under development)
  Use our dedicated dashboard to gain insight into
  your 3-D Secure usage.

Devoted team
  We take pride in our job and are dedicated to provide a great service.


.. _what-is-a-3-d-secure-server:

What is a 3-D Secure Server?
===========================================

A 3-D Secure Server is used in the financial industry, to facilitate cardholder
authentication in preparation for e.g. making a purchase. The specification is
developed by EMVCo, who by `their own
words <https://www.emvco.com/about/overview/>`_:

    EMVCo exists to facilitate worldwide interoperability and acceptance of
    secure payment transactions

The specification is public and can be found at `EMVCos document page
<https://www.emvco.com/emv-technologies/3d-secure/>`_.  The specifications are
included here for ease of access. This guide intends to be self-contained, such
that you do not need to refer to the specification.

.. note::
  The following documents are all produced and copyrighted by `EMVCo <https://www.emvco.com/>`_.

.. list-table::
  :header-rows: 1

  * - File
    - Description

  * - :download:`EMVCo_3DS_spec_v210.pdf <specifications/EMVCo_3DS_spec_v210.pdf>`
    - Specification 2.1.0

  * - :download:`EMVCo_3DS_SDKSpec_v210.pdf <specifications/EMVCo_3DS_SDKSpec_v210.pdf>`
    - SDK Specification 2.1.0

  * - :download:`EMVCo_3DS_SB204v5.pdf <specifications/EMVCo_3DS_SB204v5.pdf>`
    - Specification Bulletin No. 204 v5 (Cumulative updates to 2.1.0)

  * - :download:`EMVCo_3DS_SB207v1.pdf <specifications/EMVCo_3DS_SB207v1.pdf>`
    - Update document describing changes between 2.1.0 and 2.2.0.

  * - :download:`EMVCo_3DS_Spec_v220.pdf <specifications/EMVCo_3DS_Spec_v220.pdf>`
    - Specification 2.2.0

  * - :download:`EMVCo_3DS_SDKSpec_v220.pdf <specifications/EMVCo_3DS_SDKSpec_v220.pdf>`
    - SDK Specification 2.2.0

  * - :download:`EMVCo_3DS_SB214v1.pdf <specifications/EMVCo_3DS_SB214v1.pdf>`
    - Specification Bulletin No. 214 v1 (Cumulative updates to 2.2.0)

Where to go from here
=====================

1. Sign up at `3dsecure.io <https://www.3dsecure.io>`_ (not covered by this documentation)
2. Read the :ref:`getting-started` guide for getting an
   understanding of the authentication flow.
3. Read the :ref:`requests` section to learn the prerequisites for requests.
4. Look at the :ref:`usage` in this documentation.
5. Consult the  :ref:`reference` to get details about the individual API endpoints.