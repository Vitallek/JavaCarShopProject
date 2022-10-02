import React, { useState } from "react"
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material"
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { useNavigate } from "react-router-dom"

import { menu } from "./Menu"

const hasChildren = (item) => {
    const { items: children } = item

    if (children === undefined) {
        return false
    }

    if (children.constructor !== Array) {
        return false
    }

    if (children.length === 0) {
        return false
    }

    return true
}

const NavComponent = () => {
    return menu.map((item, key) => <MenuItem key={key} item={item} />)
}

const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel
    return <Component item={item} />
}

const SingleLevel = ({ item }) => {
    const navigate = useNavigate()
    const handleClick = (path) => {
        navigate(path)
    }

    return (
        <ListItemButton onClick={() => handleClick(item.to)}>
            <ListItemIcon style={{minWidth: 26}}>{item.icon}</ListItemIcon>
            <ListItemText style={{minWidth: 26}} primary={item.title} />
        </ListItemButton>
    )
}

const MultiLevel = ({ item }) => {
    const { items: children } = item
    const [open, setOpen] = useState(false)
    const handleClick = (path) => {
        setOpen((prev) => !prev)
    }
    
    return (
        <React.Fragment>
            <ListItemButton component='button' onClick={() => handleClick(item.to)}>
                <ListItemIcon style={{minWidth: 26}}>{item.icon}</ListItemIcon>
                <ListItemText style={{minWidth: 26}} primary={item.title} />
                {open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children.map((child, key) => (
                        <MenuItem key={key} item={child} />
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export default NavComponent