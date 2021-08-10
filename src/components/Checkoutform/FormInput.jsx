import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useFormContext, Controller} from 'react-hook-form'

const FormInput = ({ name, label }) => {
    const { control } = useFormContext()
    return (
            <Grid item xm={12} sm={6}>
                <Controller
                    render={({ field }) => ( 
                    <TextField {...field} defaultValue="" label={label}/>)}
                    control={control}
                    name={name}
                />
            </Grid>
    )
}

export default FormInput
