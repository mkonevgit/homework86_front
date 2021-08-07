import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
   return (
      <Box display="flex" alignItems="center">
         <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" {...props} />
         </Box>
         <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(
               props.value,
            )}%`}</Typography>
         </Box>
      </Box>
   );
}

LinearProgressWithLabel.propTypes = {
   value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
   root: {
      width: '100%',
   },
});

export const Progress = ({timeout, setShowProgress, addTrackHistoryHandler}) => {
   const classes = useStyles();
   const [progress, setProgress] = useState(25);

   React.useEffect(() => {
      const timer = setInterval(() => {
         setProgress((prevProgress) => (prevProgress >= 100 ? 25 : prevProgress + 25));
      }, 1000);

      setTimeout(() => {
         setShowProgress(false);
         addTrackHistoryHandler();
      }, timeout);
      return () => {
         clearInterval(timer);
      };
   }, []);

   return (
      <div className={classes.root}>
         <LinearProgressWithLabel value={progress} />
      </div>
   );
};
