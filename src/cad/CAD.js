import React, { useEffect } from 'react';
import { Stage } from 'react-konva';
import ToolsPanel from './ToolsPanel';
import DrawLayer from './DrawLayer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

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
    }
}));

function CAD() {
    const classes = useStyles();
    const theme = useTheme();
    
    const [stageWidth, setStateWidth] = React.useState(0);
    const [stageHeight, setStateHeight] = React.useState(0);
    
    let stageContainerRef = React.createRef();
    
    useEffect(() => {
        if (stageContainerRef.current) {
            setStateWidth(stageContainerRef.current.offsetWidth - theme.spacing(2));
            setStateHeight(stageContainerRef.current.offsetHeight - theme.spacing(1));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stageContainerRef.current]);
    
    return (
            <Card className={classes.root}>
                <CardHeader title="Калькулятор тротуарной плитки">
    
                </CardHeader>
                <CardContent className={classes.content}>
                    <ToolsPanel />
                    <div className={classes.stageContainer} ref={stageContainerRef}>
                        <Stage width={stageWidth} height={stageHeight}>
                            <DrawLayer/>
                        </Stage>
                    </div>
                </CardContent>
            </Card>
            
    );
}

export default CAD;
