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
   examples
   reference

If this is your first time here, please read this page.

This is the documentation for `3dsecure.io`_, a 3-D Secure Server.
The implementation is a SAAS implementation, offering a language-agnostic HTTP
API integration.


3-D Secure -- briefly
=====================

Briefly, a 3-D Secure Server is used in the financial industry, to:

    Facilitate cardholder *authentication* in preparation for e.g. making a
    purchase.

The specification is developed by EMVCo, who by `their own
words <https://www.emvco.com/about/overview/>`_

    EMVCo exists to facilitate worldwide interoperability and acceptance of
    secure payment transactions

The specification is public and can be found at `EMVCos document page
<https://www.emvco.com/emv-technologies/3d-secure/>`_.

This service supports all active versions of 3-D Secure version 2, ``2.1.0``
and ``2.2.0``. During integration, you will need to refer to the specification
for *both* versions.

Where to go from here
=====================

1. Sign up at `3dsecure.io <https://www.3dsecure.io>`_, this is out of scope of
   this documentation.
2. Read the :ref:`getting-started` guide for getting an
   understanding of the authentication flow.
3. Look at the :ref:`examples` in this documentation.
4. Consult the  :ref:`reference` to get details about the individual API endpoints.
