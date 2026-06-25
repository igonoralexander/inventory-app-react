import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Inbox } from 'lucide-react';

const EmptyState = ({ title, message, buttonText, onButtonClick }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(100vh - 200px)', // Adjust height as needed
                textAlign: 'center',
                p: 3,
            }}
        >
            <Inbox size={64} style={{ marginBottom: 16, color: '#9e9e9e' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
                {message}
            </Typography>
            {buttonText && onButtonClick && (
                <Button variant="contained" onClick={onButtonClick}>
                    {buttonText}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState;
