
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Rating } from 'primereact/rating'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { MenuItem, Menu } from '@mui/material'

const ITEM_HEIGHT = 48
const CarsComponent = ({ brands }) => {
    const [products, setProducts] = useState([])
    const [selectedBrand, setSelectedBrand] = useState('Select Brand')
    const [expandedRows, setExpandedRows] = useState(null)
    const toast = useRef(null)
    const isMounted = useRef(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickBrandMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseBrandMenu = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        if(selectedBrand === 'Select Brand') return
        axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-all/${selectedBrand.toLowerCase().replace(/ /g,'-')}`)
            .then(response => {
                console.log(response.data)
                setProducts(response.data)
            })
            .catch(err => console.log(err))
    }, [selectedBrand])
    useEffect(() => {
        if (isMounted.current) {
            const summary = expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed'
            toast.current.show({ severity: 'success', summary: `${summary}`, life: 3000 })
        }
    }, [expandedRows])

    useEffect(() => {
        isMounted.current = true
        setProducts([])
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 })
    }

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 })
    }

    const expandAll = () => {
        let _expandedRows = {}
        products.forEach(p => _expandedRows[`${p.id}`] = true)

        setExpandedRows(_expandedRows)
    }

    const collapseAll = () => {
        setExpandedRows(null)
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount)
    }

    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`order-badge order-${rowData.status.toLowerCase()}`}>{rowData.status}</span>
    }

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price)
    }

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
    }

    const rowExpansionTemplate = (data) => {
        console.log(data)
        return (
            <DataTable value={[data]} responsiveLayout="scroll">
                    <Column field='VIN' header="VIN" sortable></Column>
                    <Column field="price" header="price" sortable></Column>
                    <Column field="fuelType" header="fuelType" sortable></Column>
                    {/* <Column field="amount" header="Amount" body={amountBodyTemplate} sortable></Column> */}
                    {/* <Column field="status" header="Status" body={statusOrderBodyTemplate} sortable></Column> */}
                    {/* <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column> */}
                </DataTable>
        )
    }

    const header = (
        <div className="table-header-container">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} className="mr-2" />
            <Button icon="pi pi-plus" label="Collapse All" onClick={collapseAll} className="mr-2" />
            <Button
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClickBrandMenu}
            >
                {selectedBrand}
            </Button>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseBrandMenu}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {brands.map((brand) => (
                    <MenuItem key={brand.brand} onClick={() => setSelectedBrand(brand.brand)}>
                        {brand.brand}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )

    return (
        <div className="datatable-rowexpansion-demo">
            <Toast ref={toast} />

            <div className="card">
                <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                    rowExpansionTemplate={rowExpansionTemplate} dataKey="VIN" header={header}>
                    <Column expander style={{ width: '3em' }} />
                    <Column field="model" header="model" sortable />
                    {/* <Column header="Image" body={imageBodyTemplate} /> */}
                    {/* <Column field="price" header="Price" sortable body={priceBodyTemplate} /> */}
                    <Column field="bodyType" header="body" sortable />
                    {/* <Column field="rating" header="Reviews" sortable body={ratingBodyTemplate} /> */}
                    {/* <Column field="inventoryStatus" header="Status" sortable body={statusBodyTemplate} /> */}
                </DataTable>
            </div>
        </div>
    )
}
export default CarsComponent