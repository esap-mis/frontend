import React, {useEffect, useState} from "react";
import HttpService from "../../service/HttpService";
import {DataGrid, GridColDef, ruRU} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {DeleteOutline} from "@mui/icons-material";
import { Doctor } from "../../model/Doctor";
import ScheduleModal from "../../components/scheduleModal/ScheduleModal";
import "./doctorList.scss";
import {IconButton} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";

const DoctorList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<Doctor[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();

  useEffect(() => {
    HttpService.getDoctorList(page)
      .then(response => {
        setData(response.content);
        setTotalPages(response.totalPages);
      })
      .catch(error => console.error(error));
  }, [page]);

  const handleOpen = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
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
          <div className='doctorListField'>{params.row.firstName}</div>
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
      field: 'gender',
      headerName: 'Пол',
      width: 80,
      renderCell: (params) => {
        return (
          <div className='doctorListField'>
            {params.row.gender === 1 ? 'мужской' : 'женский'}
          </div>
        );
      },
    },
    {
      field: 'specialization',
      headerName: 'Специализация',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Действие',
      width: 270,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/doctor/${params.row.id}`}>
              <IconButton color="primary" aria-label="edit doctor" component="label">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton color="primary" aria-label="doctor schedule" component="label" onClick={() => handleOpen(params.row)}>
              <CalendarMonthIcon />
            </IconButton>
            <IconButton color="primary" aria-label="delete doctor" component="label"
                        onClick={() => handleDelete(params.row.id)}>
              <DeleteOutline className='deleteButton' />
            </IconButton>
          </>
        );
      }
    }
  ];

  return (
    <div className='doctorListPage'>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pagination
        page={page}
        pageSize={10}
        rowCount={totalPages * 10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        sx={{border: "none"}}
        onPageChange={(newPage) => setPage(newPage)}
        paginationMode="server"
      />
      {selectedDoctor && (
        <ScheduleModal
          doctor={selectedDoctor}
          schedules={selectedDoctor.schedules}
          open={open}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default DoctorList;
