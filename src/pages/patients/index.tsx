import {DataGrid, GridColDef, ruRU} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import {Clear, DeleteOutline, Search} from '@mui/icons-material';
import {Patient} from "@/model/Patient";
import {Box, Button, IconButton, InputAdornment, TextField} from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import HttpService from "@/service/HttpService";
import Link from "next/link";

const Patients: React.FC = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    HttpService.getPatientList(page)
      .then(response => {
        setData(response.content);
        setTotalPages(response.totalPages);
      })
      .catch(error => console.error(error));
  }, [page]);

  const handleSearch = () => {
    const [name, lastName, patronymic] = searchTerm.trim().split(/\s+/);
    HttpService.searchPatientList(name, lastName, patronymic)
      .then(response => {
        setData(response.content);
        setTotalPages(response.totalPages);
        setPage(0);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
    // TODO: Логика удаления пациента
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'firstName',
      headerName: 'Имя',
      width: 100,
      renderCell: (params) => {
        return (
          <div className={"patientListField"}>{params.row.firstName}</div>
        );
      },
    },
    {
      field: 'patronymic',
      headerName: 'Отчество',
      width: 140,
    },
    {
      field: 'lastName',
      headerName: 'Фамилия',
      width: 120,
    },
    {
      field: 'birthDate',
      headerName: 'Дата рождения',
      width: 120,
    },
    {
      field: 'gender',
      headerName: 'Пол',
      width: 80,
      renderCell: (params) => {
        return (
          <div className={"patientListField"}>
            {params.row.gender === 1 ? 'мужской' : 'женский'}
          </div>
        );
      },
    },
    {
      field: 'phoneNumber',
      headerName: 'Телефон',
      width: 130,
    },
    {
      field: 'action',
      headerName: 'Действие',
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/patients/${params.row.id}`}>
              <IconButton color="primary" aria-label="edit patient" component="label">
                <EditIcon />
              </IconButton>
            </Link>
            <Link href={`/cards/${params.row.id}`}>
              <IconButton color="primary" aria-label="patient card" component="label">
                <MedicalInformationIcon />
              </IconButton>
            </Link>
            <IconButton color="primary" aria-label="delete patient" component="label"
                        onClick={() => handleDelete(params.row.id)}>
              <DeleteOutline className={"deleteButton"} />
            </IconButton>
          </>
        );
      }
    }
  ];

  return (
    <div className={"patientListPage"}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: '9px'}}>
        <TextField
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          variant='outlined'
          fullWidth
          size='small'
          placeholder='Поиск пациента'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search onClick={handleSearch} />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton onClick={() => setSearchTerm('')}>
                <Clear />
              </IconButton>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          sx={{ width: '800px' }}
        />
        <Link href={"/patients/register"}>
          <Button variant="contained" color="primary" aria-label="add patient" component="label" sx={{ marginRight: '10px' }}>
            <AddIcon />
          </Button>
        </Link>
      </Box>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        disableRowSelectionOnClick={true}
        columns={columns}
        pagination
        page={page}
        pageSize={10}
        rowCount={totalPages * 10}
        rowsPerPageOptions={[13]}
        checkboxSelection
        sx={{border: "none"}}
        onPageChange={(newPage) => setPage(newPage)}
        paginationMode="server"
      />
    </div>
  );
};

export default Patients;
