import React, { useEffect } from 'react';
import { Stage } from 'react-konva';
import ToolsPanel from './ToolsPanel';
import DrawLayer from './DrawLayer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

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
        flex: 1
    }
}));

function CAD() {
    const classes = useStyles();
    
    const [stageWidth, setStateWidth] = React.useState(0);
    const [stageHeight, setStateHeight] = React.useState(0);
    
    return (
            <Card className={classes.root}>
                <CardHeader title="Калькулятор тротуарной плитки">
    
                </CardHeader>
                <CardContent className={classes.content}>
                    <ToolsPanel />
                    <div className={classes.stageContainer}>
                        <Stage width={stageWidth} height={stageHeight}>
                            <DrawLayer/>
                        </Stage>
                    </div>
                </CardContent>
            </Card>
            
    );
}

export default CAD;
