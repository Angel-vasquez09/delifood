import { ListItemIcon, SxProps, Theme, ListItem, Typography } from '@mui/material';
import React, { FC } from 'react'

interface Props {
    title: string;
    icon : JSX.Element;
    sx?  : SxProps<Theme>;
    className?: string;
    open?: boolean;
    [key : string]: any;
}

export const MyListItem: FC<Props> = ({ title, icon, className = '', sx, open = true, ...resto }) => {
    return (
        <>
            <ListItem button className={`listSide ${className}`} sx={sx} { ...resto }>
                <ListItemIcon>
                    { icon }
                </ListItemIcon>
                <Typography
                    sx={{ opacity: open ? 1 : 0 }}
                    variant='subtitle2'>{ title }</Typography>
            </ListItem>
        </>
    )
}
