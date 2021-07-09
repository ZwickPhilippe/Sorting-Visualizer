import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [array, changeArray] = useState([]);
  const [colorArray, setColorArray]=useState([{value: 10, color:'black'}]);
  const [tickSpeed, setTickIntervall]=useState(20);
  const [arraySize, setArraySize]=useState(100);

  const print = () => {
    console.log(array);
    array[0]=10;
    changeArray([...array]);
  };

  const timer = ms => new Promise(res => setTimeout(res, ms))

  const selectionSort=async()=>{


    
    for (let i = 0; i < array.length-1; i++) {
      //let minimumIndex=i;
      let minColorIndex=i;
      for (let j = minColorIndex+1; j < array.length; j++) {

        // if(array[j]<array[minimumIndex]){
        //   minimumIndex=j;
        // }

        if(colorArray[j].value<colorArray[minColorIndex].value){
          minColorIndex=j;
        }
        
      }


        swapColor(i,minColorIndex);

      
      //swap(i,minimumIndex)
      await timer(tickSpeed)


      
    }

  }

  const bubbleSort = async()=>{
    for (let i = 0; i < colorArray.length-1; i++) {
      
      for (let j = 0; j < colorArray.length-i-1; j++) {

        if(colorArray[j].value>colorArray[j+1].value){
          //swapColor(j,j+1);

          
    let temp=colorArray[j].value;
    let old=colorArray[j+1].value;
          colorArray[j].value=old;
    colorArray[j].color='red'
    colorArray[j+1].value=temp;
    colorArray[j+1].color='blue'
        }
        
      }
      setColorArray([...colorArray])

      await timer(tickSpeed);

    }


  }


  const insertionSort=async()=>{

    for (let i = 0; i < colorArray.length; i++) {
      const currentElement = colorArray[i].value;
      let j=i-1;

      while(j>=0 && colorArray[j].value>currentElement){
        colorArray[j+1].value=colorArray[j].value;
      
        j=j-1;
        
      }

      colorArray[j+1].value=currentElement;
      colorArray[i].color='blue';

      setColorArray([...colorArray]);
      await timer(tickSpeed);
      
    }

  }



  const swap=(i,j)=>{


    let temp=array[i];
    let old=array[j];
    array[i]=old;
    array[j]=temp;
      changeArray([...array])

  }

  const swapColor=(i,j)=>{
    let temp=colorArray[i].value;
    let old=colorArray[j].value;

    colorArray[i].value=old;
    //colorArray[i].color='red'
    colorArray[j].value=temp;
    colorArray[i+1].color='blue'
    changeArray([...colorArray])

  }


  const generateArray = () => {
    let newArray = [];
    let newColorArray=[];
    for (let index = 0; index < arraySize; index++) {
      newArray.push(Math.random() * 10);
      newColorArray.push({value:Math.random()*10, color: 'red'})
    }

    console.log(colorArray)

    setColorArray(newColorArray);
    changeArray(newArray);
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor:"black"
        }}
      >
        {colorArray.map((barHeight) => {
          return (
            <div
              style={{
                width: windowWidth / colorArray.length,
                height: barHeight.value * 60,
                backgroundColor: barHeight.color,
              }}
            ></div>
          );
        })}
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={6}  >
        <TextField id="standard-basic" label="Array Size" placeholder="Enter size" style={{marginLeft: '2%'}} value={arraySize} onChange={(e)=>setArraySize(e.target.value)}/>
        <TextField id="standard-basic" label="Intervall Speed" placeholder="milliseconds" style={{marginLeft: '2%'}} value={tickSpeed} onChange={(e)=>setTickIntervall(e.target.value)}/>
        <Button onClick={generateArray} variant="contained" color="secondary" style={{marginLeft: '2%'}}>Generate</Button>
        </Grid>
        <Grid item xs={6} style={{textAlign: "left"}}>

        <Button onClick={selectionSort} variant="contained" color="primary" style={{marginRight: '2%'}}>Selection Sort</Button>
        <Button onClick={bubbleSort} variant="contained" color="primary" style={{marginRight: '2%'}}>Bubble Sort</Button>
        <Button onClick={insertionSort} variant="contained" color="primary" style={{marginRight: '2%'}}>Insertion Sort</Button>
        {/* <Button onClick={print} variant="contained" color="primary" >Print</Button>
        <Button >Pause</Button> */}
        </Grid>

      </Grid>

    </div>
  );
}

export default App;
