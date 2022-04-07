import React, { useEffect, useState } from 'react'
import { PeopleOutlined } from '@mui/icons-material'
import { DashboardLayout } from 'components'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Grid, MenuItem, Select } from '@mui/material'
import useSWR from 'swr'
import { IUser } from 'interfaces'
import { foodApi } from 'api'

const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [ users, setUsers ] = useState<IUser[]>([]);

    useEffect(() => {
        if(data){
            setUsers(data);
        }
    }, [data])


    if(!error && !data){
        return <></>
    }

    const onRoleUpdate = async (id: string, role: string) => {
        const prev = users.map(user => ({...user}))
        const updateUsers = users.map(user => ({
            ...user,
            role: id === user._id ? role : user.role
        }))

        setUsers(updateUsers);
        try {
            await foodApi.put(`/admin/users`, { id, role })
        } catch (error) {
            setUsers(prev);
            alert('Error al actualizar el rol');
        }
    }

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'CORREO',          width: 250 },
        { field: 'name',  headerName: 'NOMBRE COMPLETO', width: 300 },
        {
            field: 'role',
            headerName: 'Role',
            width: 300,
            renderCell: (params: GridValueGetterParams) => {
                return (
                    <Select
                        value={params.row.role}
                        onChange={(e) => onRoleUpdate(params.row.id, e.target.value)}
                        label="Role"
                        sx={{ width: '300px' }}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                        <MenuItem value='super-user'>Super User</MenuItem>
                        <MenuItem value='SEO'>SEO</MenuItem>
                    </Select>
                )
            }
        },
    ]

    const rows = users.map(user => ({
        id   : user._id,
        email: user.email,
        name : user.name,
        role : user.role
    }))


    return (
        <DashboardLayout title={'Orders'} pageDescripcion={'Lista de ordenes'}>

                <Grid container>

                    <Grid item xs={12} sx={{height: 650, width: '100%'}} >
                        <DataGrid
                            rows={ rows }
                            columns={ columns }
                            pageSize={ 10 }
                            rowsPerPageOptions={ [10] }
                        />
                    </Grid>

                </Grid>

        </DashboardLayout>
    )
}

export default UsersPage