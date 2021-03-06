import React, { useEffect } from 'react';
import clsx from 'clsx';
import ToolsPanel from './ToolsPanel';
import DrawStage from './stages/DrawStage';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Backdrop from '@material-ui/core/Backdrop';
import Chip from '@material-ui/core/Chip';

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

function CAD() {
    const classes = useStyles();
    
    const [stageWidth, setStateWidth] = React.useState(0);
    const [stageHeight, setStateHeight] = React.useState(0);
    const [tool, setTool] = React.useState(null);
    const [info, setInfo] = React.useState('');
    
    let stageContainerRef = React.createRef();
    
    const onToolSelected = (t) => {
        setTool(t);
    };
    
    useEffect(() => {
        if (stageContainerRef.current) {
            setStateWidth(stageContainerRef.current.offsetWidth);
            setStateHeight(stageContainerRef.current.offsetHeight);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stageContainerRef.current]);
    
    const stageContainerStyleStyle = clsx({
        [classes.stageContainer]: true,
        [classes.toolMode]: tool
    });
    return (
            <React.Fragment>
                <Card className={classes.root}>
                    <CardHeader title="?????????????????????? ???????????????????? ????????????"/>
                    <CardContent className={classes.content}>
                        <ToolsPanel onToolSelected={onToolSelected} tool={tool}/>
                        <div className={stageContainerStyleStyle} ref={stageContainerRef}>
                            <DrawStage stageWidth={stageWidth} stageHeight={stageHeight} tool={tool} setInfo={setInfo}/>
                        </div>
                        {tool && info ? <Chip label={info} className={classes.infoChip}/> : null}
                    </CardContent>
                </Card>
                <Backdrop className={classes.backdrop} open={tool ? true : false} onClick={() => setTool(null)}>
                </Backdrop>
            </React.Fragment>
    );
}

export default CAD;
