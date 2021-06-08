import React, { Fragment, useState } from 'react';
import { CardHeader, Grid, TextField, Checkbox, FormControlLabel, 
    FormLabel, TextareaAutosize, Button, makeStyles } from '@material-ui/core';
import PatientHistory from './PatientHistory';

const useStyle =  makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '60%',
            margin: theme.spacing(1),
        }
    },
    subroot:{
       display:'flex',
       width:'20%'
    }
}))

const initialPValues = {
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    pcp: false,
    fullName: '',
}
const PatientForm = props => {
    const [values, setValues] = useState(initialPValues);
    const [pHistory, setPHistory] = useState([]);
    const [showHistoryFlag, setShowHistoryFlag] = useState(false);
    const classes = useStyle();

    const handleInputChange = e => {
        const {name,value, checked} = e.target;
        if (name === 'pcp'){
            setValues({
                ...values,
                   [name]: checked
                }
            )
        } else {
            setValues({
                ...values,
                   [name]: value
                }
            )
        }
    }
    const storePatientHistory = e => {
        e.preventDefault();
        setPHistory([
            ...pHistory,
            values,
        ])
    }

    const showPatientHistory = e => {
        setShowHistoryFlag(true);
    }
return(
    <Fragment>
    <h1>Assessment Form</h1>
    <h2>Patient Information</h2>
   <form className={classes.root} onSubmit={storePatientHistory}>
    <Grid container>
    <Grid item xs={6}>
       <TextField
        variant="outlined"
        required
        //helperText="Please enter First Name"
        label="First Name"
        name='firstName'
        value={values.firstName} 
        onChange={handleInputChange} />
        <TextField
        variant="outlined"
        required
        label="DOB"
        name='dob'
        value={values.dob}
        onChange={handleInputChange} />
    </Grid>
    <Grid item xs={6}>
    <TextField
        variant="outlined"
        label="Last Name"
        required
        name='lastName'
        value={values.lastName}
        onChange={handleInputChange} />

         <TextField
        variant="outlined"
        label="Phone"
        name='phone'
        value={values.phone}
        onChange={handleInputChange} />
    </Grid>
    <Grid item xs={6}>
        <FormControlLabel control={<Checkbox
         checked={values.pcp}
         onChange={handleInputChange}
         name='pcp'/>} label='Are you Currently Under PCP &nbsp;' />
    </Grid>
    </Grid>
    <Grid container>
    {values.pcp && <Grid item xs={6}>
    <h2>PCP Name:</h2>
    <TextField
        variant="outlined"
        label="Name"
        name='fullName'
        required
        value={values.fullName} 
        onChange={handleInputChange} />
    <FormLabel component="legend">Health Concerns and symptoms</FormLabel>
    <TextareaAutosize aria-label="empty textarea" 
    placeholder="Write Concerns and Symptoms Here"
    style={{ width: "60%", height: "80px" }}
    required
    />
    <FormLabel component="legend">What are your current Health Concerns ?</FormLabel>
    <TextareaAutosize aria-label="empty textarea" 
    placeholder="Write Current Health Concerns here"
    style={{ width: "60%", height: "80px" }}
    required />
    </Grid>
    }
    </Grid>
    <Button type="submit" variant="outlined">
          Submit
        </Button>
    <Button type="button" variant="outlined" onClick={showPatientHistory}>
          Show History
    </Button>
    { showHistoryFlag && <PatientHistory pHistory={pHistory}/>}
   </form>
   </Fragment>
)
}

export default PatientForm;