import { Alert, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Analysis } from "@/model/Analysis";
import { MedicalRecord } from "@/model/MedicalRecord";
import { Patient } from "@/model/Patient";
import { TokenStorageService } from "@/service/auth/TokenStorageService";
import HttpService from "@/service/HttpService";
import AddIcon from "@mui/icons-material/Add";
import MedicalCard from "@/pages/cards/[id]";
import {useRouter} from "next/router";

const EditMedicalCard: React.FC = () => {
  const router = useRouter();
  const patientId = parseInt(router.query.id as string);
  const tokenStorageService = new TokenStorageService();
  const [success, setSuccess] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    HttpService.getPatient(patientId)
      .then((response) => setPatient(response))
      .catch((error) => console.error(error));
  }, []);

  const [medicalRecord, setMedicalRecord] = useState<string>("");
  const [analysisFields, setAnalysisFields] = useState<string[]>([""]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!medicalRecord && analysisFields.length === 0) {
      return;
    }
    const analysis: Analysis[] = analysisFields
      .filter((nameAnalysis) => nameAnalysis.trim() !== "")
      .map((nameAnalysis) => ({ name: nameAnalysis } as Analysis));

    const record: MedicalRecord = {
      record: medicalRecord || "",
      fioAndSpecializationDoctor: tokenStorageService.getLogin(),
      date: new Date().toISOString(),
      analyzes: analysis,
    } as MedicalRecord;

    HttpService.saveMedicalRecord(patientId, record)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {});
  };

  const handleAddAnalysisField = () => {
    setAnalysisFields([...analysisFields, ""]);
  };

  const handleAnalysisFieldChange = (index: number, value: string) => {
    const newAnalysisFields = [...analysisFields];
    newAnalysisFields[index] = value;
    setAnalysisFields(newAnalysisFields);
  };

  const renderAnalysisFields = () => {
    return analysisFields.map((field, index) => (
      <div key={index}>
        <input
          type="text"
          value={field}
          onChange={(e) => handleAnalysisFieldChange(index, e.target.value)}
        />
      </div>
    ));
  };

  return (
    <div className={"patientPage"}>
      <div className={"titleContainer"}>
        <h1>Добавление записи в карту пациента</h1>
      </div>
      {success && <Alert severity="success">Данные сохранены</Alert>}
      <div className={"patientContainer"}>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{marginTop: '20px'}}>
            <label htmlFor="complaints">Запись:</label>
            <textarea
              onChange={(e) => setMedicalRecord(e.target.value)}
              id="complaints"
              name="complaints"
            ></textarea>
          </div>
          <div>
            <h2>Анализы</h2>
            <div className={"analysis"}>{renderAnalysisFields()}</div>
            <Button
              variant="contained"
              type="button"
              onClick={handleAddAnalysisField}
            >
              <AddIcon />
            </Button>
          </div>
          <Button color="success" variant="contained" type="submit">
            Сохранить
          </Button>
        </form>
        {patient && <MedicalCard isEdit={true} />}
      </div>
    </div>
  );
};

export default EditMedicalCard;
