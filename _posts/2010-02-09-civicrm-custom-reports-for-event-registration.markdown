---
comments: true
date: 2010-02-09 16:56:25
layout: post
slug: civicrm-custom-reports-for-event-registration
title: CiviCRM Custom Reports for Event Registration
wordpress_id: 335
categories:
- Code
- tech
tags:
- civicrm
- civievent
- Code
- drupal
- linkedin
- tips
---

Some notes I am still compiling. Source for information on [custom reports](http://wiki.civicrm.org/confluence/display/CRMDOC/CiviReport+structure+and+customization).

Version 2010-02-10

<!-- more -->

---------------------

Two steps: Create the form template and form functions

This first example, which I've called ParticipantsDupName, identifies registered participants based on their names.

Template

1) site/all/modules/civicrm/templates.CRM/Report/Form/Event/ParticipantsDupName.tpl

[sourcecode language='php']

{include file="CRM/Report/Form.tpl"}
[/sourcecode]

---------------------------

--------------------------
Form
2) site/all/modules/civicrm/CRM/Report/Form/Event/ParticipantsDupName.php
[sourcecode language='php']
< ?php

/*
+--------------------------------------------------------------------+
| CiviCRM version 3.0                                                |
+--------------------------------------------------------------------+
| Copyright CiviCRM LLC (c) 2004-2009                                |
+--------------------------------------------------------------------+
| This file is a part of CiviCRM.                                    |
|                                                                    |
| CiviCRM is free software; you can copy, modify, and distribute it  |
| under the terms of the GNU Affero General Public License           |
| Version 3, 19 November 2007.                                       |
|                                                                    |
| CiviCRM is distributed in the hope that it will be useful, but     |
| WITHOUT ANY WARRANTY; without even the implied warranty of         |
| MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.               |
| See the GNU Affero General Public License for more details.        |
|                                                                    |
| You should have received a copy of the GNU Affero General Public   |
| License along with this program; if not, contact CiviCRM LLC       |
| at info[AT]civicrm[DOT]org. If you have questions about the        |
| GNU Affero General Public License or the licensing of CiviCRM,     |
| see the CiviCRM license FAQ at http://civicrm.org/licensing        |
+--------------------------------------------------------------------+
*/

/**
*
* @package CRM
* @copyright CiviCRM LLC (c) 2004-2009
* $Id$
*
*/
*
*/

require_once 'CRM/Report/Form.php';
require_once 'CRM/Event/PseudoConstant.php';
require_once 'CRM/Core/OptionGroup.php';

class CRM_Report_Form_Event_ParticipantsDupName extends CRM_Report_Form
{

protected $_summary = null;

function __construct( ) {
$this->_columns = array( );
parent::__construct( );
}

function postProcess( ) {
$this->beginPostProcess( );

// note1: your query
$myQuery = "SELECT C1.id AS 'contact_id', C1.display_name AS 'participant_name', P1.fee_level AS
'participant_fee', P1.status_id AS 'participant_status', P1.registered_by_id, P1.id AS 'participant_id',
C2.display_name AS 'duplicate_name', D1.id AS
'duplicate_id',
D1.fee_level AS 'duplicate_fee', D1.status_id AS 'duplicate_status', D1.registered_by_id AS
'duplicate_registered_by_id'
FROM `civicrm_participant` AS P1
LEFT OUTER JOIN `civicrm_contact` AS C1 ON C1.id = P1.contact_id
LEFT OUTER JOIN `civicrm_email` AS E1 ON C1.id = E1.contact_id
LEFT OUTER JOIN `civicrm_contact` AS C2 ON C2.id = E1.contact_id
LEFT OUTER JOIN `civicrm_participant` AS D1 ON C2.id = D1.contact_id
WHERE P1.event_id =1  AND P1.status_id IN (1,5) AND ((D1.id <> P1.id) OR (C1.first_name =
C1.last_name)) AND (C1.display_name = C2.display_name) AND D1.status_id IN (1,5)
";

// note2: register columns you want displayed-
$this->_columnHeaders =
array( 'contact_id' => array( 'title' => 'Contact ID' ),
#'' => array( 'title' => '' ),
'participant_name' => array( 'title' => 'Name' ),
'participant_fee' => array( 'title' => 'Participant Fee' ),
'participant_status' => array( 'title' => 'Participant Status' ),
'participant_id' => array( 'title' => 'Participant ID' ),
'registered_by_id' => array( 'title' => 'Reg By Participant ID' ),
'duplicate_name' => array( 'title' => 'Duplicate Name' ),
'duplicate_id' => array( 'title' => 'Duplicate ID' ),
'duplicate_fee' => array( 'title' => 'Duplicate Fee' ),
'duplicate_status' => array( 'title' => 'Duplicate Status' ),
'duplicate_registered_by_id' => array( 'title' => 'Duplicate Registered By ID' )
);
// note3: let report do the fetching of records for you
$this->buildRows ( $myQuery, $rows );

$this->doTemplateAssignment( $rows );
$this->endPostProcess( $rows );
}

}
[/sourcecode]

The key line in the WHERE clause which identifies the duplicate records is

[sourcecode language='php']

AND P1.status_id IN (1,5) AND ((D1.id <> P1.id) OR (C1.first_name =
C1.last_name)) AND (C1.display_name = C2.display_name) AND D1.status_id IN (1,5)

[/sourcecode]

which says:


> the first participant is either registered (1) or will pay later (5) AND

either they have different participant IDs (i.e. unique participants) OR the contact's first name and last name are the same (i.e. name entered incorrectly) AND

both participants have the same name (where C2, the duplicate participant, shares an email address with the first participant) AND

the duplicate participant is either registered (1) or will pay later (5)


------------------

2b) Other queries we've created
Incomplete Registrations (status_id = 6)that have a duplicate participant ID
[sourcecode language='php']
$myQuery = "SELECT C1.id AS 'contact_id', C1.display_name AS 'participant_name', P1.fee_level AS
'participant_fee', P1.status_id AS 'participant_status', P1.registered_by_id, P1.id AS 'participant_id',
C2.display_name AS 'duplicate_name', D1.id AS
'duplicate_id',
D1.fee_level AS 'duplicate_fee', D1.status_id AS 'duplicate_status', D1.registered_by_id AS
'duplicate_registered_by_id'
FROM `civicrm_participant` AS P1
LEFT OUTER JOIN `civicrm_contact` AS C1 ON C1.id = P1.contact_id
LEFT OUTER JOIN `civicrm_email` AS E1 ON C1.id = E1.contact_id
LEFT OUTER JOIN `civicrm_contact` AS C2 ON C2.id = E1.contact_id
LEFT OUTER JOIN `civicrm_participant` AS D1 ON C2.id = D1.contact_id
WHERE P1.event_id =1  AND P1.status_id IN (6) AND (D1.id <> P1.id)
ORDER BY P1.status_id, P1.register_date;
";

// note2: register columns you want displayed-
$this->_columnHeaders =
array( 'contact_id' => array( 'title' => 'Contact ID' ),
#'' => array( 'title' => '' ),
'participant_name' => array( 'title' => 'Name' ),
'participant_fee' => array( 'title' => 'Participant Fee' ),
'participant_status' => array( 'title' => 'Participant Status' ),
'participant_id' => array( 'title' => 'Participant ID' ),
'registered_by_id' => array( 'title' => 'Reg By Participant ID' ),
'duplicate_name' => array( 'title' => 'Duplicate Name' ),
'duplicate_id' => array( 'title' => 'Duplicate ID' ),
'duplicate_fee' => array( 'title' => 'Duplicate Fee' ),
'duplicate_status' => array( 'title' => 'Duplicate Status' ),
'duplicate_registered_by_id' => array( 'title' => 'Duplicate Registered By ID' )
);
[/sourcecode]
-------------------------
Unique Incomplete Registrants (status_id =6) that either have the same participant ID or no email entered (often for additional participants)
[sourcecode language='php']
$myQuery = "SELECT C1.id AS 'contact_id', C1.display_name AS 'participant_name', P1.fee_level AS
'participant_fee', P1.status_id AS 'participant_status', P1.registered_by_id, P1.id AS 'participant_id',
C2.display_name AS 'duplicate_name', D1.id AS
'duplicate_id', E1.email, D1.fee_level AS 'duplicate_fee', D1.status_id AS 'duplicate_status', D1.registered_by_id AS
'duplicate_registered_by_id', P1.fee_amount
FROM `civicrm_participant` AS P1
LEFT OUTER JOIN `civicrm_contact` AS C1 ON C1.id = P1.contact_id
LEFT OUTER JOIN `civicrm_email` AS E1 ON C1.id = E1.contact_id
LEFT OUTER JOIN `civicrm_contact` AS C2 ON C2.id = E1.contact_id
LEFT OUTER JOIN `civicrm_participant` AS D1 ON C2.id = D1.contact_id
WHERE P1.event_id =1  AND P1.status_id IN (6) AND (D1.id = P1.id OR E1.email IS NULL)
ORDER BY P1.status_id, P1.register_date;
";

// note2: register columns you want displayed-
$this->_columnHeaders =
array( 'contact_id' => array( 'title' => 'Contact ID' ),
#'' => array( 'title' => '' ),
'participant_name' => array( 'title' => 'Name' ),
'participant_fee' => array( 'title' => 'Participant Fee' ),
'participant_status' => array( 'title' => 'Participant Status' ),
'participant_id' => array( 'title' => 'Participant ID' ),
'registered_by_id' => array( 'title' => 'Reg By Participant ID' ),
'email' => array( 'title' => 'Email' ),
'fee_amount' => array( 'title' => 'Fee' )

);
[/sourcecode]
-----------------------
Participants Listing: good for exporting and mail merging. I've removed our custom data group joins from this, sorted by registration date to make it easy to see new records.
[sourcecode language='php']
$myQuery = "SELECT C1.first_name, C1.last_name, C2.display_name AS 'registered_by', E1.email, F1.phone, A1.name, A1$
S2.abbreviation, A1.postal_code, A1.postal_code_suffix, P1.register_date, P1.source, P1.fee_level, P1.is_pay_later, S1.name$
'status_id',
P1.fee_amount,
C1.sort_name, C1.display_name, C1.nick_name
FROM `civicrm_participant` AS P1
LEFT JOIN `civicrm_contact` AS C1 ON C1.id = P1.contact_id
LEFT OUTER JOIN `civicrm_email` AS E1 ON C1.id = E1.contact_id
LEFT OUTER JOIN `civicrm_participant_status_type` AS S1 ON P1.status_id = S1.id
LEFT OUTER JOIN `civicrm_participant` AS P2 ON P1.registered_by_id = P2.id
LEFT OUTER JOIN `civicrm_contact` AS C2 ON P2.contact_id = C2.id
LEFT OUTER JOIN `civicrm_phone` AS F1 ON C1.id = F1.contact_id
LEFT OUTER JOIN `civicrm_address` AS A1 ON C1.id = A1.contact_id
LEFT OUTER JOIN `civicrm_state_province` AS S2 ON A1.state_province_id = S2.id
WHERE P1.event_id =1 AND P1.status_id IN (1,5,6)
GROUP BY P1.id
ORDER BY P1.status_id, P1.register_date;
";

// note2: register columns you want displayed-
$this->_columnHeaders =
array( 'first_name' => array( 'title' => 'First Name' ),
'last_name'  => array( 'title' => 'Last Name' ),
'registered_by' => array( 'title' => 'Registered By' ),
'email'  => array( 'title' => 'Email' ),
'phone'  => array( 'title' => 'Phone' ),
'name'  => array( 'title' => 'Address' ),
'city'  => array( 'title' => 'City' ),
'abbreviation'  => array( 'title' => 'State' ),
'postal_code'  => array( 'title' => 'Zip' ),
'postal_code_suffix'  => array( 'title' => 'Zip Suffix' ),
'register_date' => array( 'title' => 'Registration Date' ),
'source' => array( 'title' => 'Registration Source' ),
'fee_level' => array( 'title' => 'Fee Level' ),
'is_pay_later' => array( 'title' => 'Is Pay Later' ),
'status_id' => array( 'title' => 'Registration Status' ),
'fee_amount' => array( 'title' => 'Fee Amount' ),
'sort_name' => array( 'title' => 'Sort Name' ),
'display_name' => array( 'title' => 'Display Name' ),
'nick_name' => array( 'title' => 'Badge Name' )
);
[/sourcecode]
----------------------------
Summary of the number of each type of registration and income associated with it
[sourcecode language='php']
$myQuery = "SELECT S1.name AS 'status_id', COUNT('status_id') AS 'Registered', SUM(P1.fee_amount) AS 'Revenue',  P1$
FROM `civicrm_participant` AS P1
LEFT JOIN `civicrm_contact` AS C1 ON C1.id = P1.contact_id
LEFT OUTER JOIN `civicrm_participant_status_type` AS S1 ON P1.status_id = S1.id
LEFT OUTER JOIN `civicrm_participant` AS P2 ON P1.registered_by_id = P2.id
LEFT JOIN `civicrm_contact` AS C2 ON P2.contact_id = C2.id
WHERE P1.event_id =1
GROUP BY P1.status_id, P1.fee_level
ORDER BY P1.status_id;";

// note2: register columns you want displayed-
$this->_columnHeaders =
array(
'status_id' => array( 'title' => 'Registration Status' ),
'Registered' => array( 'title' => 'Number Registered' ),
'Revenue' => array( 'title' => 'Revenue' ),
'fee_level' => array( 'title' => 'Registration Type' )
);
[/sourcecode]
-----------------------------------
Registrations by date and type
[sourcecode language='php']
$myQuery = "SELECT S1.name AS 'status_id', COUNT('P1.register_date') AS 'Registered', SUM(P1.fee_amount) AS
'Revenue',  P1.fee_level, DATE(P1.register_date) AS 'date'
FROM `civicrm_participant` AS P1
LEFT JOIN `civicrm_contact` AS C1 ON C1.id = P1.contact_id
LEFT OUTER JOIN `civicrm_participant_status_type` AS S1 ON P1.status_id = S1.id
LEFT OUTER JOIN `civicrm_participant` AS P2 ON P1.registered_by_id = P2.id
LEFT JOIN `civicrm_contact` AS C2 ON P2.contact_id = C2.id
WHERE P1.event_id =1 AND P1.status_id IN (1,5)
GROUP BY P1.fee_level, date
ORDER BY P1.fee_level, date;";
// note2: register columns you want displayed-
$this->_columnHeaders =
array(
#'status_id' => array( 'title' => 'Registration Status' ),
'date' => array( 'title' => 'Date' ),
'Registered' => array( 'title' => 'Number Registered' ),
'fee_level' => array( 'title' => 'Registration Type' ),
'Revenue' => array( 'title' => 'Revenue' )
);
[/sourcecode]
-----------------------

Then register the template
Then create report from template, and add to menu
----------
You'll probably also want to set the individual deduping threshold to require matching contact ID

Regarding deduping and registering additional participants:

In brief, civicrm, by default, uses emails as the key in registrations by default.  If, when you say allow people to register others, you say let them use the same email address or not require it, then people can, with the default settings, overwrite other registrations.  this can be fixed by editing the fuzzy and strict dedupe settings for the individual so include deduplicating on participant id with a heavy weight that hits the threshold.  We did not link our registrations to drupal registration, so this may have been part of the problem, but in any case, that is how we solved it.

-----
Also, for mailing people, you can do you a search, e.g. find participants, and save it as a smart group, then go to contacts, manage groups, and make this smart group a 'mailing list' then you can mail people in your search with link clicking etc.

----

I'll add one more thing:  when you add custom data groups, each group is a new table in your database and it appears in the contact listing as grouped data.  However, you can (and should) create profiles that only display part of the custom group, thus, for our registration, for the first registrant we use a profile that combines standard reg fields and custom data, and then for additional registrants, a different profile on the data, but from the same standard fields and the custom group.
