
export class CustomerService {

    async getCustomersSmall() {
        const res = await fetch('data/customers-small.json');
        const d = await res.json();
        return d.data;
    }

    async getCustomersMedium() {
        const res = await fetch('data/customers-medium.json');
        const d = await res.json();
        return d.data;
    }

    async getCustomersLarge() {
        const res = await fetch('data/customers-large.json');
        const d = await res.json();
        return d.data;
    }

    async getCustomersXLarge() {
        const res = await fetch('data/customers-xlarge.json');
        const d = await res.json();
        return d.data;
    }

    async getCustomers(params) {
        const queryParams = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
        const res = await fetch('https://www.primefaces.org/data/customers?' + queryParams);
        return await res.json();
    }
}
    