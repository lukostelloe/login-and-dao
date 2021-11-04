<?php
require_once 'DAO.php';

abstract class VoitureDAO extends EntityBase
{
    public function setId($id)
    {
        $this->id = $id;
    }
    public function getId()
    {
        return $this->id;
    }
    public function getRegistration()
    {
        return $this->registration;
    }

    public function setRegistration($registration)
    {
        $this->registration = $registration;
    }
    ////
    public function getColour()
    {
        return $this->colour;
    }

    public function setColour($colour)
    {
        $this->colour = $colour;
    }
    ////
    public function getMake()
    {
        return $this->make;
    }

    public function setMake($make)
    {
        $this->make = $make;
    }
    ////
    public function getModel()
    {
        return $this->model;
    }

    public function setModel($model)
    {
        $this->model = $model;
    }

    public function __construct()
    {
        parent::__construct();
        $this->table = 'cartable';
        $this->primkeys = ['id'];
        $this->fields = ['registration', 'colour', 'make', 'model'];
        $this->sql = "SELECT * FROM {$this->table}";
        // if ($immatriculation) $this->read($immatriculation);
    }

    public function __get($id)
    {
        if (property_exists($this, $id)) {
            return $this->$id;
        }
    }
}
