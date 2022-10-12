
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button, Stack, TextField } from '@mui/material';
import { MenuItem, Menu } from '@mui/material'
import { InputText } from 'primereact/inputtext';
import { generateBrandData } from '../../CreateData/createDataCarModels';
import DeleteIcon from '@mui/icons-material/Delete';

const ITEM_HEIGHT = 48
const isPositiveInteger = (val) => {
  let str = String(val);
  str = str.trim();
  if (!str) {
    return false;
  }
  str = str.replace(/^0+/, "") || "0";
  let n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
}
const getAllFromBrand = (selectedBrand, setProducts) => {
  axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-all/${selectedBrand.toLowerCase().replace(/ /g, '-')}`)
  .then(response => {
    setProducts(response.data)
  })
  .catch(err => console.log(err))
}
const deleteBrandColl = (selectedBrand) => {
  axios.delete(`http://${process.env.REACT_APP_SERVER_ADDR}/delete-all/${selectedBrand.toLowerCase().replace(/ /g, '-')}`)
  .then(response => {
    Notification.requestPermission().then(_ => {
      const notification = new Notification('Данные удалены', {
        tag: 'deleteData'
      })
    })
  })
  .catch(err => console.log(err))
}
const generateRandomData = async (selectedBrand, amount, setProducts) => {
  if (amount === '') {
    alert('empty input')
    return
  }
  let data = await generateBrandData(selectedBrand, parseInt(amount))
  axios.put(`http://${process.env.REACT_APP_SERVER_ADDR}/insert-many/${selectedBrand.toLowerCase().replace(/ /g, '-')}`, JSON.stringify(data))
  .then(response => {
    getAllFromBrand(selectedBrand, setProducts)
    Notification.requestPermission().then(_ => {
      const notification = new Notification(`Данные ${amount} добавлены`, {
        tag: 'putData'
      })
    })
  })
  .catch(err => console.log(err))
}
const deleteSelected = (selectedBrand, selectedProducts, setProducts) => {
  console.log(selectedProducts)
  axios.delete(`http://${process.env.REACT_APP_SERVER_ADDR}/delete-selected/${selectedBrand.toLowerCase().replace(/ /g, '-')}`, {data: JSON.stringify(selectedProducts)})
  .then(response => {
    getAllFromBrand(selectedBrand, setProducts)
    Notification.requestPermission().then(_ => {
      const notification = new Notification('Данные удалены', {
        tag: 'deleteData'
      })
    })
  })
  .catch(err => console.log(err))
}
const addBrand = (newBrand) => {
  if(newBrand.length === 0) return
  axios.post(`http://${process.env.REACT_APP_SERVER_ADDR}/add-brand`, newBrand)
  .then(response => {
    Notification.requestPermission().then(_ => {
      const notification = new Notification('Бренд добавлен', {
        tag: 'addBrand'
      })
    })
  })
  .catch(err => console.log(err))
}

const CarsComponent = ({ brands }) => {
  const [products, setProducts] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('Select Brand')
  const [selectedProducts, setSelectedProducts] = useState(null); 
  const [expandedRows, setExpandedRows] = useState(null)
  const generateNumRef = useRef(null)
  const newBrandRef = useRef(null)
  const isMounted = useRef(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickBrandMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseBrandMenu = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (selectedBrand === 'Select Brand') return
    getAllFromBrand(selectedBrand, setProducts)
  }, [selectedBrand])

  useEffect(() => {
    isMounted.current = true
    setProducts([])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    switch (field) {
      case 'price':
        if (isPositiveInteger(newValue))
          rowData[field] = newValue;
        else
          event.preventDefault();
        break;
      default:
        if (newValue.trim().length > 0)
          rowData[field] = newValue;
        else
          event.preventDefault();
        break;
    }
  }
  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }
  const rowExpansionTemplate = (row) => {
    delete row._id
    let data = Object.entries(row).map(el => {
      if (el[0] === 'images') return { rowName: el[0], rowValue: el[1].join(',') }
      if (el[0] === 'color') return { rowName: el[0], rowValue: el[1].hex}
      return { rowName: el[0], rowValue: el[1] }
    })
    return (
      <DataTable value={data} editMode="cell" dataKey="VIN" responsiveLayout="scroll">
        <Column field="rowName" header="field" />
        <Column field="rowValue"

          header="value"
          editor={(options) => textEditor(options)}
          onCellEditComplete={onCellEditComplete} />
      </DataTable>
    )
  }

  return (
    <>
      <Stack direction='row' spacing={2} sx={{ m: 1 }}>
        <Button
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickBrandMenu}
        >
          {`${selectedBrand} (${products.length})`}
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
            <MenuItem key={brand.brand} onClick={() => {
              handleCloseBrandMenu()
              setSelectedBrand(brand.brand)
            }}
            >
              {brand.brand}
            </MenuItem>
          ))}
        </Menu>
        <Button
          disabled={selectedBrand==='Select Brand'}
          color='error'
          onClick={() => deleteBrandColl(selectedBrand)}
        >
          {`delete all`}
        </Button>
        <TextField
          type="number"
          style={{width: 100}}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={generateNumRef}
        />
        <Button
          disabled={selectedBrand==='Select Brand'}
          color='error'
          onClick={() => generateRandomData(selectedBrand, generateNumRef.current.value, setProducts)}
        >
          {`<- generate random`}
        </Button>
        <Button
          disabled={selectedBrand==='Select Brand'}
          color='error'
          onClick={() => deleteSelected(selectedBrand, selectedProducts, setProducts)}
        >
          {`delete selected`}
        </Button>
        <TextField
          type="text"
          style={{width: 100}}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={newBrandRef}
        />
        <Button
          color='primary'
          onClick={() => addBrand(newBrandRef.current.value)}
        >
          {`add brand`}
        </Button>
      </Stack>
      <DataTable
        selection={selectedProducts}
        onSelectionChange={e => setSelectedProducts(e.value)}
        value={products}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        responsiveLayout="scroll"
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="VIN"
      >
        <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
        <Column expander style={{ width: '3em' }} />
        <Column field="model" header="model" filter sortable />
        <Column field="VIN" header="VIN" filter />
      </DataTable>
    </>
  )
}
export default CarsComponent