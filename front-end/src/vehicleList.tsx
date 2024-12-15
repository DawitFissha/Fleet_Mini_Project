import { Box, Chip, CircularProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getAllVehicles from "./api/getVehicles";

export default function VehicleList(){
    const {data:vehicles,isLoading} = useQuery({
        queryKey:['fetch_vehicles'],
        queryFn:getAllVehicles
    })
    console.log(vehicles)
    return (
        <Stack>
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
                                    </TableRow>
                                    ))
                                 }
                        </TableBody>
                    </Table>
                </TableContainer>
                )
            }
        </Stack>
    )
}