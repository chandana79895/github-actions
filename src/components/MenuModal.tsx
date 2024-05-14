import close from '../assets/icons/close.svg'
import { Card, List, ListItem, ListItemText, Modal } from '@mui/material';
import { useNavigate } from 'react-router';
import { MenuModalStyle } from './styles/MenuModalStyles';

const hamburgArr = [
    {
        label: "Member Lookup",
        routePath: "member-search",
    },
    {
        label: "Select Location",
        routePath: "location-search",
    },
    {
        label: "Language Preference",
        routePath: "",
    },
    { label: "Logout", routePath: "login" },
];



function MenuModal({ open, handleClose }) {
    const navigate = useNavigate();
    const handleMenuItemCLick = (item) => {
        if(item.routePath.length){navigate(item.routePath)}
        handleClose();
    }

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="menu-modal"
            aria-describedby="menu-modal"
        >
            <Card sx={MenuModalStyle}>
                
                <img onClick={handleClose} className='close-icon' src={close} alt="" />
                <List className='menu-list'> {/* Corrected class name */}
                    {hamburgArr.map((item, idx) => (
                        <ListItem key={item.label} divider={idx < hamburgArr.length - 1}> {/* Add a unique key prop */}
                            <ListItemText onClick={() => handleMenuItemCLick(item)} primary={item.label} /> {/* Use the label from the item */}
                        </ListItem>
                    ))}
                </List>
            </Card>
        </Modal>
    )

}

export default MenuModal



