<?php
require 'classes/voiture.php';
$r = new Voiture();
// $r->setId("62");
// $r->setRegistration("test");
// $r->setMake("test");
// $r->setModel("test");
// $r->setColour("test");
// echo $r->modifyRow($r);
$a = "a";
$a = $r->verifExist($a);
echo count($a);
