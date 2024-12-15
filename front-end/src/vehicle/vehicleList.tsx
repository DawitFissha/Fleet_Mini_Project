import { Box, Button, Chip, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getAllVehicles from "../api/getVehicles";
import AddIcon from '@mui/icons-material/Add'
import { useState } from "react";
import VehicleForm from "./vehicleForm";
import EditIcon from '@mui/icons-material/Edit'
export default function VehicleList(){
    const {data:vehicles,isLoading} = useQuery({
        queryKey:['fetch_vehicles'],
        queryFn:getAllVehicles
    })
    const [openVehicleForm,setOpenVehicleForm] = useState(false)
    const [vehicleToUpdate,setVehicleToUpdate] = useState({
        id:'',
        status:'',
    })
    const handleClose = ()=>{
        setOpenVehicleForm(false)
        setVehicleToUpdate({
            id:'',
            status:''
        })
    }
    return (
      <>
        <Stack
         spacing={1}
        >
            <Button
              sx={{
                alignSelf:'flex-end'
              }}
              endIcon={<AddIcon fontSize="small"/>}
              variant="contained"
              onClick={()=>setOpenVehicleForm(true)}
            >
                New Vehicle
            </Button>
            <Divider/>
            {
                isLoading ? (
                    <Box
                     sx={{
                        alignSelf:'center'
                     }}
                    >
                    <CircularProgress/>
                    </Box>
                ):
                (
                    <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                Vehicle Name
                                </TableCell>
                                <TableCell>
                                Status
                                </TableCell>
                                <TableCell>
                                Last Updated
                                </TableCell>
                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                                    vehicles?.map((v:any)=>(
                                        <TableRow>
                                        <TableCell>
                                            {
                                                v?.name
                                            }
                                        </TableCell>
                                        <TableCell>
                                           <Chip 
                                           label={v?.status}
                                           color={v?.status === 'AVAILABLE' ? 'success' : v?.status === 'IN_USE' ? 'warning' : 'error'}
                                           size="small"
                                           />
                                        </TableCell>
                                        <TableCell>
                                            {
                                                new Date(v?.updatedAt)?.toLocaleDateString()
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="update status">
                                                <IconButton 
                                                size="small"
                                                onClick={()=>{
                                                    setVehicleToUpdate({
                                                        id:v?._id,
                                                        status:v?.status
                                                    })
                                                    setOpenVehicleForm(true)
                                                }}
                                                >
                                                    <EditIcon fontSize="small"/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                 }
                        </TableBody>
                    </Table>
                </TableContainer>
                )
            }
        </Stack>
        <Dialog
            open={openVehicleForm}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
             {
                vehicleToUpdate?.id ? 'Update Status' : 'New Vehicle'
             }
        </DialogTitle>     
        <DialogContent>
            <VehicleForm
              onClose={handleClose}
              statusToUpdate={{id:vehicleToUpdate?.id,currentStatus:vehicleToUpdate?.status as "AVAILABLE" | "IN_USE" | "MAINTENANCE"}}
            />
        </DialogContent>
        </Dialog>
      </>
    )
}