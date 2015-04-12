/**
 *
 * A way to organize strings to avoid typos and such. Also works a lot better
 * when using an IDE of sorts, that actually understand importing of objects to
 * get auto completion.
 *
 */
const Constants = {
    Actions: {
        CREATE: 'create',
        TOGGLE_STATE: 'toggle-state',
        DELETE: 'delete',
        FILTER_BY: 'filter-by',
        ADD_CUSTOMER: 'add-customer'
    },

    Pages: {
        LIST: 'list-page',
        NEW: 'new-page',
        DETAILS: 'details-page'
    },

    Tabs: {
        NEW: 'new',
        BILLED: 'billed'
    },

    Keys: {
        RETURN: 13,
        ESC: 27,
        UP: 38,
        DOWN: 40,
        B: 66,
        F: 70,
        H: 72,
        J: 74,
        K: 75,
        N: 78,
        O: 79,
        R: 82,
        // Probably won't work on a non-english keyboard.
        QUESTION_MARK: 191
    }
};

export default Constants;
