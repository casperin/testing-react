/**
 *
 * Small helpers class to handle the slightly obscure time format that I
 * invented. (No, I would not do that in code intended for production).
 *
 * All functions are pure.
 *
 */
import _ from 'lodash';

const pruneTime = (str, factor = 1) => {
        const n = parseFloat(str, 10);

        return isNaN(n) ? false : n * factor;
    },

    minToTime = min => {
        const hours = Math.max(0, parseInt(min / 60, 10)),
              minutes = Math.max(0, min % 60);

        return {hours, minutes};
    };


const Time = {
    parse: time => {
        var strTime = time.slice(0, time.length-1);

        switch (_.last(time)) {
        case 'm': // minutes
            return pruneTime(strTime);

        case 'h': // hours
            return pruneTime(strTime, 60);

        case 'd': // days (unlikely, but you never know)
            return pruneTime(strTime, 60 * 24);

        default:
            return pruneTime(time);
        }
    },

    pretty: min => {
        const {hours, minutes} = minToTime(min);

        return `${hours}h, ${minutes}m`;
    },

    prettyFull: min => {
        const {hours, minutes} = minToTime(min),
            hoursLabel = hours === 1 ? 'hour' : 'hours',
            minutesLabel = minutes === 1 ? 'minute' : 'minutes';

        return `${hours} ${hoursLabel} and ${minutes} ${minutesLabel}`;
    }
};

export default Time;

