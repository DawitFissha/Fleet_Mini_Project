import { Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import addVehicle from "../api/addVehicle";
import updateVehicleStatus from "../api/updateStatus";
const vehicleStatuses = [
    'AVAILABLE',
    'IN_USE',
    'MAINTENANCE',
]
interface IVehicleFormProps {
    onClose:()=>void,
    statusToUpdate:{id:string,currentStatus:'AVAILABLE'|'IN_USE'|'MAINTENANCE'}
    //  statusOnlyUpdate:boolean,
    //  currentStatus?:'AVAILABLE'|'IN_USE'|'MAINTENANCE'
}
export default function VehicleForm(props:IVehicleFormProps){
    const {onClose,statusToUpdate} = props
    const [name,setName] = useState('')
    const [status,setStatus] = useState<'AVAILABLE'|'IN_USE'|'MAINTENANCE'>('AVAILABLE')
    const queryClient = useQueryClient()
    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as 'AVAILABLE'|'IN_USE'|'MAINTENANCE',);
      };
    const vehicleMutaion = useMutation({
        mutationKey:['add_vehicle'],
        mutationFn:addVehicle,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['fetch_vehicles']})
        }
    })
    const statusMutaion = useMutation({
        mutationKey:['update_status'],
        mutationFn:updateVehicleStatus,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['fetch_vehicles']})
        }
    })
    const handleSubmit = ()=>{
        const addPayload = {
            name,
            status,
        }
        const updatePayload = {
            id:statusToUpdate?.id,
            status
        }
        if(statusToUpdate?.id){
            statusMutaion.mutate(updatePayload)
            return;
        }
        vehicleMutaion.mutate(addPayload)
    }
    useEffect(()=>{
        if(statusToUpdate?.id){
            setStatus(statusToUpdate?.currentStatus)
        }
    },[statusToUpdate])
    return (
        <Stack
          spacing={1}
          sx={{
            width:400,
            p:1,
          }}
          component={'form'}
          onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit();
            onClose();
          }}
        >
           {
            !statusToUpdate?.id && (
                <TextField
           placeholder="Vehicle Name"
           value={name}
           onChange={(e)=>setName(e.target.value)}
           required = {!statusToUpdate?.id}
         />
            )
           }
            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="Status"
    onChange={handleChange}
  >
     {
        vehicleStatuses?.map((s)=>(
            <MenuItem key={s} value={s}>{s}</MenuItem>
        ))
     }
  </Select>
    </FormControl>
    <Divider/>
    <Stack
      direction={'row'}
      alignItems={'center'}
      alignSelf={'flex-end'}
      spacing={1}
    >
        <Button
          variant="contained"
          size="small"
          type="submit"
          disabled = {vehicleMutaion.isPending || statusMutaion.isPending}
        >
            Save
        </Button>
        <Button
         color="error"
         onClick={onClose}
        >
            Cancel
        </Button>
    </Stack>
        </Stack>
    )
}