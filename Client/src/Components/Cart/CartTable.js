import React, {useEffect, useState, useMemo, useRef} from 'react';
import { UpdateCart } from '../Utility/CallCart';
import Cookies from 'js-cookie';

//table logic
import { useTable, useSortBy } from 'react-table';
// import { usePagination, useRowSelect } from 'react-table';
//for table styling
import {CssBaseline, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {Typography, Button, TextField, List} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const removeFromCart = (cart, index, supplier, updateCartURL, setData) => {
  const newCart = cart.slice()
  newCart.forEach(element => {
    if(element => element.supplier === supplier){
      element.reserves.splice(index, 1)
    }
  });
  UpdateCart(updateCartURL, JSON.parse(Cookies.get('credentials')).username, newCart)
  setData(newCart)
  return newCart
}

const CreateTable = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  )

  // Render the UI for table
  return (
    <>
      <List style={{ maxHeight: 600, overflowY:'auto', overflowX:'hidden'}}>
        <Table sx={{ m: 3, mt: 2 }} style={{width: '94%'}} {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  //hide id column with styles
                  if(column.Header === 'ID') return <TableCell {...column.getHeaderProps()} style={{display: 'none'}}>{column.render('Header')}</TableCell>
                  return (<TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ▽'
                          : ' △'
                        : ''}
                    </span>
                  </TableCell>
                )})}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row, i) => { //change rows to page if need
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()} style={{ cursor: 'pointer' }}>
                  {row.cells.map(cell => {
                    if(cell.column.Header === 'ID') return <TableCell {...cell.getCellProps()} style={{display: 'none'}}>{cell.render('Cell')}</TableCell>
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
       </List>
    </>
  )
}

const handleBuy = (cart, comment) => {
  console.log({cart: cart, comment: comment})
}

const CartTable = ({cart, setCart}) => {

  const [data, setData] = useState([]);
  const tradeicsComment = useRef(null)
  const supplier = 'tradeicsbel'
  const updateCartURL = `https://${process.env.REACT_APP_SERVER_ADDR}/update_cart`

  const columns = useMemo(
    () => [
      {
        Header: 'Поставщик',
        accessor: 'supplier',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Название',
        accessor: 'name',
      },
      {
        Header: 'Артикул',
        accessor: 'article',
      },
      {
        Header: 'Цена',
        accessor: 'price',
      },
      {
        Header: 'Количество',
        accessor: 'quantity',
      },
      {
        Header: 'Розница',
        accessor: 'price_retail',
      },
      {
        Header: 'Резерв',
        id: 'reserve',
        accessor: 'reserve',
      },
      {
        Header: '',
        id: 'delete',
        Cell: ({ row }) => {
            return(
              <Button   onClick={() => setCart((prev) => {
                return removeFromCart(prev, row.id, supplier, updateCartURL, setData)
              })} 
                        style={{ fontSize: 10 }} 
                        variant="contained"
                        color="error"><DeleteForeverRoundedIcon/>
              </Button>
            )
          }
      },
    ],
    []
  )
  
  useEffect(() => {
    // console.log(cart)
    // if(typeof cart.tradeicsbel !== 'undefined'){
    //     setData(cart.tradeicsbel)
    // }
    if(cart.some(element => element.supplier === 'tradeicsbel')){
      setData(cart.filter(element => element.supplier === 'tradeicsbel')[0].reserves)
    }
  }, [cart]);

  return (
    <>
      <CssBaseline />
      <Grid item xs={8}>
        <CreateTable columns={columns} data={data} />
      </Grid>
      <Grid item xs={4}>
        <Stack direction='column' spacing={2}>
            <Typography variant='subtitle1'>
                {'Комментарий'}
            </Typography>
            <TextField
                inputRef={tradeicsComment}
                id="outlined-multiline-flexible"
                label="Текст"
                multiline
                // value={value}
            />
            <Button onClick={() => handleBuy(cart, tradeicsComment.current.value)} 
                    variant="contained" 
                    style={{ fontSize: 10 }}>{"Заказать"}</Button>
        </Stack>
      </Grid>
    </>
 )
}

export default CartTable;
