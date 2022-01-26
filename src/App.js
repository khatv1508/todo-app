import './App.css';
import React from 'react';
import {
  Stack,
  Paper,
  IconButton,
  Button,
  TextField,
  Container,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { v4 as uuidv4 } from 'uuid';
import { ReactSortable } from "react-sortablejs";

// line item 
function LineItem ({item, state, setState}) {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState(item.name);

  // close dialog 
  const handleClose = () => {
    setEdit(false);
  };

  return(
    <Paper style={{width: "100%", marginTop: 20, padding: 10}}>
       <Dialog onClose={handleClose} open={edit} style={{width: "100%", padding: "10px"}}>
        <DialogTitle>Edit item</DialogTitle>
        <DialogContent>
          <Stack 
            spacing={2} direction="column" 
            style={{width: "100%"}}
            alignItems="flex-end"
          >
            <TextField id="text-input"
              variant="outlined" 
              style={{background: "white", borderRadius: "10px"}} 
              fullWidth 
              value={value}
              onChange={(event)=>{setValue(event.target.value)}}
            />
            <div>
              <Button style={{fontSize: "20px"}} color="success" 
                onClick={(event) => {
                  event.stopPropagation();
                  let tmp = state;
                  let objIndex = tmp.findIndex((obj => obj.id === item.id));
                  tmp[objIndex].name = value;
                  setState(tmp);
                  setEdit(false);
                }}
                >
                  Ok
              </Button>
              <Button style={{fontSize: "20px"}} color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  setEdit(false);
                }}
                >
                  Cancel
              </Button>
            </div>
          </Stack>
        </DialogContent>
      </Dialog>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <span>{item.name}</span>
        <div>
          <IconButton onClick={(event)=>{
            event.stopPropagation();
            setEdit(true);
          }}>
            <EditIcon /></IconButton>
          <IconButton onClick={()=>{
            const result = state.filter(state => state.id !== item.id);
            setState(result);
          }}><ClearIcon /></IconButton>
        </div>
      </Stack>
    </Paper>
  );
}

const App = () => {
  const [state, setState] = React.useState([]);
  const [value, setValue] = React.useState("");

  const addItem = () => {
    setState([
      ...state, 
      { id: uuidv4(), name: value }
    ]);
    setValue("");
  }

  // check key press = enter => add item
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      addItem();
    }
  }

  return (
    <div className="App">
      <Container>
        <div className="App-header">
          <h1>WORK TO-DOS</h1>
          <span style={{color: "#D6BD67", marginBottom: "20px"}}>Enter text into the input field to add items to your list.</span>
          <span style={{color: "#A5C9B9", marginBottom: "20px"}}>Drag item to sort.</span>
          <span style={{color: "#FF917D", marginBottom: "20px"}}>Click the "X" to remove the item from your list.</span>
          <Stack 
            spacing={2} direction="row" 
            style={{width: "70%", marginTop: "30px"}}
            alignItems="center"
          >
            <TextField id="text-input"
              variant="outlined" 
              style={{background: "white", borderRadius: "10px"}} 
              fullWidth 
              placeholder="New item ..."
              value={value}
              onChange={(event)=>{setValue(event.target.value)}}
              onKeyPress={handleKeyPress}
            />
            <IconButton style={{background: "white", width: "50px", height: "50px"}} onClick={addItem}>
              <AddIcon />
            </IconButton>
          </Stack>
          <div style={{width: "60%"}}>
            <ReactSortable 
              animation={200}
              delay={2}
              list={state} 
              setList={setState}
            >
              {state.map((item) => (
                <LineItem key={item.id} item={item} state={state} setState={setState} />
              ))}
            </ReactSortable>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
