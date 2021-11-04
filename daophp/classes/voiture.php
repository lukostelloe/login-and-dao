<?php
require_once 'voitureDAO.php';

class Voiture extends VoitureDAO
{
    public function findALL()
    {
        $request = "SELECT * FROM cartable";
        $sth = $this->db->prepare($request);
        // return $sth->execute();
        return $this->getSelfObjectsPreparedStatement($sth);
    }
    public function addNew()
    {
        $registration = $_POST["registration"];
        $colour = $_POST["colour"];
        $make = $_POST["make"];
        $model = $_POST["model"];
        $request = "INSERT INTO cartable (registration, colour, make, model) VALUES ('$registration', '$colour', '$make', '$model')";
        $sth = $this->db->prepare($request);
        return $this->getSelfObjectsPreparedStatement($sth);
    }

    public function deleteRow($id)
    {
        $request = "DELETE FROM cartable WHERE registration= :id";
        $sth = $this->db->prepare($request);
        $sth->bindParam(':id', $id);
        return $sth->execute();
    }

    public function modifyRow($dico)
    {
        $dico = json_decode($dico);
        $request = "UPDATE cartable SET registration = :registration, colour = :colour, make = :make, model = :model WHERE id = :id";
        $sth = $this->db->prepare($request);
        $id = $dico->id;
        $registration = $dico->registration;
        $colour = $dico->colour;
        $make = $dico->make;
        $model = $dico->model;
        $sth->bindParam(':id', $id);
        $sth->bindParam(':registration',  $registration);
        $sth->bindParam(':colour', $colour);
        $sth->bindParam(':make',  $make);
        $sth->bindParam(':model', $model);
        return $sth->execute();
    }

    public function getlastID()
    {
        $request = "SELECT MAX(id) FROM cartable;";
        $sth = $this->db->prepare($request);
        return $this->getSelfObjectsPreparedStatement($sth);
    }
    
    public function verifExist($registration)
    {
        $request = "SELECT * FROM cartable WHERE registration = :registration";
        $sth = $this->db->prepare($request);
        $sth->bindParam(':registration',  $registration);
        // $sth->execute();
        return $this->getSelfObjectsPreparedStatement($sth);
    }
}
