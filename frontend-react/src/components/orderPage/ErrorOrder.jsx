import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ErrorOrder = ({
    open,
    handleClose,
    httpStatus,
    errorData,
    handleLogout,
}) => 
{
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Błąd</DialogTitle>
            <DialogContent>
                {httpStatus && (
                    <Typography variant='body1' color='error'>
                        Kod błędu: {httpStatus}
                    </Typography>
                )}

                {errorData && (
                    <Typography variant="body2">
                        Szczegóły: {errorData}
                    </Typography>
                )}
                {httpStatus === 404 && (
                    <Typography variant="body2">
                        Podałeś niepoprawne parametry zamówienia.
                    </Typography>
                )}
                {httpStatus === 401 && (
                    <Typography variant="body2">
                        Nie jesteś zalogowany lub twoja sesja utraciła ważność! Zaloguj się ponownie.
                    </Typography>
                )}
                {httpStatus === 403 && (
                    <Typography variant="body2">
                        Nie wypełniłeś wszystkich pól. Zapytanie jest niedozwolone w takim formacie.
                    </Typography>
                )}
                {httpStatus === 500 && (
                    <Typography variant="body2">
                        Serwer nie odpowiada. Spróbuj ponownie później
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
            {httpStatus !== 401 ? (
                <Button onClick={handleClose} color="primary">
                    OK
                </Button>
            ) : (
                <Button onClick={handleLogout} color="secondary">
                    Zaloguj ponownie
                </Button>
            )}
            </DialogActions>
        </Dialog>
    )
}
export default ErrorOrder;