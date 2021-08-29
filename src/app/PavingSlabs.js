import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { CAD } from '../lib/cad/index';

const CAD_CONTAINER_ID = 'cad-container';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        height: `calc(100vh - ${theme.spacing(4)}px)`,
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        display: 'flex',
        height: '100%',
        flex: 1
    },
    stageContainer: {
        flex: 1,
        border: '1px solid #e2e2e2',
        zIndex: 2000,
        backgroundColor: 'white'
    },
    toolMode: {
        boxShadow: theme.shadows[2],
        '&:hover': {
            cursor: 'pointer'
        }
    },
    backdrop: {
        zIndex: 1000
    },
    infoChip: {
        zIndex: 2001,
        position: 'absolute',
        bottom: theme.spacing(6),
        right: theme.spacing(5)
    }
}));

function PavingSlabs() {
    const classes = useStyles();
    const [cad, setCad] = React.useState(null);
    
    let stageContainerRef = React.createRef();
    
    useEffect(() => {
        if (stageContainerRef.current) {
            const instance = new CAD(
                stageContainerRef.current.offsetWidth,
                stageContainerRef.current.offsetHeight,
                CAD_CONTAINER_ID
            );
            setCad(instance);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stageContainerRef.current]);
    
    const stageContainerStyleStyle = clsx({
        [classes.stageContainer]: true
    });
    return (
            <Card className={classes.root}>
                <CardHeader title="Калькулятор тротуарной плитки"/>
                <CardContent className={classes.content}>
                    <div className={stageContainerStyleStyle} ref={stageContainerRef} id={CAD_CONTAINER_ID}>
                        
                    </div>
                </CardContent>
            </Card>
    );
}

export default PavingSlabs;
