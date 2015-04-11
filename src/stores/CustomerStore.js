// Data
import customers from '../data/customers';

// Since this demo has no way of adding or removing customers, we need not
// worry about event dispatchers or notifying anyone of changes.

const CustomerStore = {
    getAll: () => customers
};

export default CustomerStore;

