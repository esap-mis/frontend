import { DataGrid, GridColDef, ruRU } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { MedicalCard } from "@/model/MedicalCard";
import { MedicalRecord } from "@/model/MedicalRecord";
import HttpService from "@/service/HttpService";
import MedicalRecordModal from "@/components/medicalCardModal/MedicalRecordModal";
import {useRouter} from "next/router";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import PatientDetails from "@/components/details/PatientDetails";
import {Patient} from "@/model/Patient";

interface MedicalCardProps {
  isEdit: boolean;
}

const MedicalCard: React.FC<MedicalCardProps> = ({isEdit}) => {
  const router = useRouter();
  const patientId = parseInt(router.query.id as string);
  const [data, setData] = useState<MedicalCard>();
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState<MedicalRecord>();
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    HttpService.getPatient(patientId)
      .then((response) => setPatient(response))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    HttpService.getMedicalCard(patientId)
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, []);

  const handleOpen = (medicalCard: MedicalRecord) => {
    setSelectedMedicalRecord(medicalCard);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "fioAndSpecializationDoctor",
      headerName: "Врач",
      width: 400,
    },
    {
      field: "date",
      headerName: "Дата",
      width: 140,
    },
    {
      field: "action",
      headerName: "Действие",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <button
              className={"editButton"}
              onClick={() => handleOpen(params.row)}
            >
              Подробнее
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className={"patienPage"}>
      {!isEdit &&
        <div className={"titleContainer"}>
          <h1>Карта пациента</h1>
          <Link href={`/cards/edit/${patientId}`}>
            <IconButton color="primary" aria-label="edit patient" component="label">
              <EditIcon />
            </IconButton>
          </Link>
        </div>
      }
      <div className={"patientContainer"}>
        {patient && !isEdit && <PatientDetails patient={patient} />}
        <div className={"medicalCard"}>
          <DataGrid
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={data?.medicalRecord || []}
            disableRowSelectionOnClick={true}
            columns={columns}
            pageSize={13}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
      {selectedMedicalRecord && (
        <MedicalRecordModal
          open={open}
          onClose={handleClose}
          medicalRecord={selectedMedicalRecord}
        />
      )}
    </div>
  );
};

export default MedicalCard;
