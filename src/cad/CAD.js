import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Stage } from 'react-konva';
import ToolsPanel from './ToolsPanel';
import DrawLayer from './DrawLayer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { LINE, LineState } from './constants/Tools';

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
        borderRadius: `${theme.spacing(1)}px`,
        border: '1px solid #e2e2e2',
        padding: theme.spacing(1)
    },
    toolMode: {
        boxShadow: theme.shadows[2],
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

function CAD() {
    const classes = useStyles();
    const theme = useTheme();
    
    const [stageWidth, setStateWidth] = React.useState(0);
    const [stageHeight, setStateHeight] = React.useState(0);
    const [tool, setTool] = React.useState(null);
    const [toolState, setToolState] = React.useState(null);
    
    let stageContainerRef = React.createRef();
    
    const onToolSelected = (t) => {
        setTool(t);
        if (t === LINE) {
            setToolState(new LineState());
        }
    };
    
    const onStageMouseUp = (e) => {
        console.log(e);
        if (tool && e.target && e.target.getPointerPosition) {
            if (tool === LINE) {
                const coords = e.target.getPointerPosition();
                toolState.points.push(coords);
                setToolState(toolState.clone());
            }
        }
    };
    
    const onStageMouseMove = (e) => {
        if (tool && e.target && e.target.getPointerPosition) {
            const coords = e.target.getPointerPosition();
            if (tool === LINE) {
                toolState.tempCoord = coords;
                setToolState(toolState.clone());
            }
        }
    };
    
    useEffect(() => {
        if (stageContainerRef.current) {
            setStateWidth(stageContainerRef.current.offsetWidth - theme.spacing(2));
            setStateHeight(stageContainerRef.current.offsetHeight - theme.spacing(1));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stageContainerRef.current]);
    
    const stageContainerStyleStyle = clsx({
        [classes.stageContainer]: true,
        [classes.toolMode]: tool
    });
    return (
            <Card className={classes.root}>
                <CardHeader title="Калькулятор тротуарной плитки"/>
                <CardContent className={classes.content}>
                    <ToolsPanel onToolSelected={onToolSelected} tool={tool} toolState={toolState}/>
                    <div className={stageContainerStyleStyle} ref={stageContainerRef}>
                        <Stage width={stageWidth} height={stageHeight} onMouseUp={onStageMouseUp} onMouseMove={onStageMouseMove}>
                            <DrawLayer toolState={toolState}/>
                        </Stage>
                    </div>
                </CardContent>
            </Card>
            
    );
}

export default CAD;
