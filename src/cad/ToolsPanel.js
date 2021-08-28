/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { LINE } from './constants/Tools';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingRight: theme.spacing(2)
    }
}));

function ToolsPanel(props) {
    const classes = useStyles();
    const { onToolSelected } = props;
    return (
            <div className={classes.root}>
                <Tooltip title={'Линия'}>
                    <IconButton color="secondary" onClick={() => {
                        onToolSelected(LINE);
                    }}>
                        <Icon>timeline</Icon>
                    </IconButton>
                </Tooltip>
            </div>
    );
}


export default ToolsPanel;
