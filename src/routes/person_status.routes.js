import { Router } from "express";
import {showPerson_status, showPerson_statusId, createPerson_status, updatePerson_status, deletePerson_status} from '../controllers/person_status.controller.js';


const router =Router();

router.post('/person_status', createPerson_status);
router.get('/person_status', showPerson_status);
router.get('/person_status/:id', showPerson_statusId);
router.put('/person_status/:id', updatePerson_status);
router.delete('/person_status/:id', deletePerson_status);

export default router;