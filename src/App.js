import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";

import "../src/index.css";
import "../src/assets/TabViewDemo.css";
import { TabView, TabPanel } from "primereact/tabview";

import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { CountryService } from "../src/services/CountryService";

import { MultiSelect } from "primereact/multiselect";
import { ProgressBar } from "primereact/progressbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CustomerService } from "./services/CustomerServiceLager";

import "../src/assets/FormDemo.css";

function App() {
  // const [activeIndex1, setActiveIndex1] = useState(1);
  // const [activeIndex2, setActiveIndex2] = useState(0);
  const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const countryservice = new CountryService();
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    date: null,
    country: "",
    accept: false,
  };
  useEffect(() => {
    countryservice.getCountries().then((data) => setCountries(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });
  const onSubmit = (data) => {
    setFormData(data);
    setShowMessage(true);
    reset();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dialogFooter = (
    <div className="p-d-flex p-jc-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );
  const [customers, setCustomers] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedRepresentatives, setSelectedRepresentatives] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const dt = useRef(null);
  const representatives = [
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ];

  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal",
  ];

  const customerService = new CustomerService();

  useEffect(() => {
    customerService.getCustomersLarge().then((data) => setCustomers(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderHeader = () => {
    return (
      <div className="table-header">
        List of Customers
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Global Search"
          />
        </span>
      </div>
    );
  };

  const activityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <ProgressBar value={rowData.activity} showValue={false} />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = () => {
    return (
      <Button
        type="button"
        icon="pi pi-cog"
        className="p-button-secondary"
      ></Button>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span
          className={classNames("customer-badge", "status-" + rowData.status)}
        >
          {rowData.status}
        </span>
      </React.Fragment>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.name}
      </React.Fragment>
    );
  };

  const countryBodyTemplate = (rowData) => {
    let { name, code } = rowData.country;

    return (
      <React.Fragment>
        <img
          src="showcase/demo/images/flag_placeholder.png"
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          alt={name}
          className={classNames("flag", "flag-" + code)}
        />
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {name}
        </span>
      </React.Fragment>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    const src = "showcase/demo/images/avatar/" + rowData.representative.image;

    return (
      <React.Fragment>
        <img
          alt={rowData.representative.name}
          src={src}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width="32"
          style={{ verticalAlign: "middle" }}
        />
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {rowData.representative.name}
        </span>
      </React.Fragment>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.date}</span>
      </React.Fragment>
    );
  };

  const renderRepresentativeFilter = () => {
    return (
      <MultiSelect
        className="p-column-filter"
        value={selectedRepresentatives}
        options={representatives}
        onChange={onRepresentativeFilterChange}
        itemTemplate={representativeItemTemplate}
        placeholder="All"
        optionLabel="name"
        optionValue="name"
      />
    );
  };

  const representativeItemTemplate = (option) => {
    const src = "showcase/demo/images/avatar/" + option.image;

    return (
      <div className="p-multiselect-representative-option">
        <img
          alt={option.name}
          src={src}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width="32"
          style={{ verticalAlign: "middle" }}
        />
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {option.name}
        </span>
      </div>
    );
  };

  const onRepresentativeFilterChange = (event) => {
    dt.current.filter(event.value, "representative.name", "in");
    setSelectedRepresentatives(event.value);
  };

  const renderDateFilter = () => {
    return (
      <Calendar
        value={dateFilter}
        onChange={onDateFilterChange}
        placeholder="Registration Date"
        dateFormat="yy-mm-dd"
        className="p-column-filter"
      />
    );
  };

  const onDateFilterChange = (event) => {
    if (event.value !== null)
      dt.current.filter(formatDate(event.value), "date", "equals");
    else dt.current.filter(null, "date", "equals");

    setDateFilter(event.value);
  };

  const filterDate = (value, filter) => {
    if (
      filter === undefined ||
      filter === null ||
      (typeof filter === "string" && filter.trim() === "")
    ) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === formatDate(filter);
  };

  const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return date.getFullYear() + "-" + month + "-" + day;
  };

  const renderStatusFilter = () => {
    return (
      <Dropdown
        value={selectedStatus}
        options={statuses}
        onChange={onStatusFilterChange}
        itemTemplate={statusItemTemplate}
        showClear
        placeholder="Select a Status"
        className="p-column-filter"
      />
    );
  };

  const statusItemTemplate = (option) => {
    return (
      <span className={classNames("customer-badge", "status-" + option)}>
        {option}
      </span>
    );
  };

  const onStatusFilterChange = (event) => {
    dt.current.filter(event.value, "status", "equals");
    setSelectedStatus(event.value);
  };

  const header = renderHeader();
  const representativeFilterElement = renderRepresentativeFilter();
  const dateFilterElement = renderDateFilter();
  const statusFilterElement = renderStatusFilter();
  return (
    <div className="form-demo">
      <TabView>
        <TabPanel header="Header I">
          <Dialog
            visible={showMessage}
            onHide={() => setShowMessage(false)}
            position="top"
            footer={dialogFooter}
            showHeader={false}
            breakpoints={{ "960px": "80vw" }}
            style={{ width: "30vw" }}
          >
            <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
              <i
                className="pi pi-check-circle"
                style={{ fontSize: "5rem", color: "var(--green-500)" }}
              ></i>
              <h5>Registration Successful!</h5>
              <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                Your account is registered under name
                <b>{formData.name}</b> ; it'll be valid next 30 days without
                activation. Please check
                <b>{formData.email}</b> for activation instructions.
              </p>
            </div>
          </Dialog>

          <div className="p-d-flex p-jc-center">
            <div className="card">
              <h5 className="p-text-center">Register</h5>
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "Name is required." }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          autoFocus
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="name"
                      className={classNames({ "p-error": errors.name })}
                    >
                      Name*
                    </label>
                  </span>
                  {getFormErrorMessage("name")}
                </div>
                <div className="p-field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required.",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message:
                            "Invalid email address. E.g. example@email.com",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="email"
                      className={classNames({ "p-error": !!errors.email })}
                    >
                      Email*
                    </label>
                  </span>
                  {getFormErrorMessage("email")}
                </div>
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="password"
                      control={control}
                      rules={{ required: "Password is required." }}
                      render={({ field, fieldState }) => (
                        <Password
                          id={field.name}
                          {...field}
                          toggleMask
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                      )}
                    />
                    <label
                      htmlFor="password"
                      className={classNames({ "p-error": errors.password })}
                    >
                      Password*
                    </label>
                  </span>
                  {getFormErrorMessage("password")}
                </div>
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <Calendar
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          dateFormat="dd/mm/yy"
                          mask="99/99/9999"
                          showIcon
                        />
                      )}
                    />
                    <label htmlFor="date">Birthday</label>
                  </span>
                </div>
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="country">Country</label>
                  </span>
                </div>
                <div className="p-field-checkbox">
                  <Controller
                    name="accept"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Checkbox
                        inputId={field.name}
                        onChange={(e) => field.onChange(e.checked)}
                        checked={field.value}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="accept"
                    className={classNames({ "p-error": errors.accept })}
                  >
                    I agree to the terms and conditions*
                  </label>
                </div>

                <Button type="submit" label="Submit" className="p-mt-2" />
              </form>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Header II">
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable ref={dt} value={customers}
                    header={header} className="p-datatable-customers" dataKey="id" rowHover globalFilter={globalFilter}
                    selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)}
                    paginator rows={10} emptyMessage="No customers found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                    <Column selectionMode="multiple" style={{width:'3em'}}/>
                    <Column field="name" header="Name" body={nameBodyTemplate} sortable filter filterPlaceholder="Search by name" />
                    <Column sortField="country.name" filterField="country.name" header="Country" body={countryBodyTemplate} sortable filter filterMatchMode="contains" filterPlaceholder="Search by country"/>
                    <Column sortField="representative.name" filterField="representative.name" header="Representative" body={representativeBodyTemplate} sortable filter filterElement={representativeFilterElement} />
                    <Column field="date" header="Date" body={dateBodyTemplate} sortable filter filterMatchMode="custom" filterFunction={filterDate} filterElement={dateFilterElement} />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable filter filterElement={statusFilterElement} />
                    <Column field="activity" header="Activity" body={activityBodyTemplate} sortable filter filterMatchMode="gte" filterPlaceholder="Minimum" />
                    <Column body={actionBodyTemplate} headerStyle={{width: '8em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
                </DataTable>
            </div>
        </div>
        </TabPanel>
        <TabPanel header="Header III">
          <b>alo1234</b>
        </TabPanel>
      </TabView>
    </div>
  );
}

export default App;
