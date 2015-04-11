const Validate = {
    title: title => title.length > 0,

    time: time => !!time,

    newRegistration: registration => {
        if (!Validate.title(registration.title)) {
            return false;
        }

        if (!Validate.time(registration.time)) {
            return false;
        }

        return true;
    }
};

export default Validate;
