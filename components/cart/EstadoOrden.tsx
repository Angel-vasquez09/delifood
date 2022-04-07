import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Preparando orden',
    'En camino',
    'Entregado',
];

interface Props {
    activeStep: number;
}

export const EstadoOrden: React.FC<Props> = ({ activeStep = 0 }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper
                activeStep={ activeStep }
                alternativeLabel
            >
                {
                    steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </Box>
    );
}

/*  sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row'}}} */