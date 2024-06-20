// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import toast from 'react-hot-toast';
// import 
// import { VscArrowSmallDown } from 'react-icons/vsc';
 
function App() {
  const initial=[
    [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [9, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1]
  ]
  function checkSudokuHelper(){
    const grid = getDeepCopy(sudoArr);
    return isSolvable(grid);
    // for(let i = 0; i < 9; i++){
    //   for(let j = 0; j < 9; j++){
    //     if(grid[i][j] != -1){
    //       const temp = grid[i][j];
    //       grid[i][j] = -1;
    //       for(let k = 0; k < 9; k++){
    //         // console.log("asdf");
    //         if(grid[i][k] === temp){ return false;}
    //         if(grid[k][j] === temp) {return false;}
    //         if(grid[3 * Math.floor(i / 3) + Math.floor(k / 3)][3 * Math.floor(j / 3) + k % 3] === temp) {
    //           console.log(grid[3 * Math.floor(i / 3) + Math.floor(k / 3)][3 * Math.floor(j / 3) + k % 3] ," ",i," ",j);
    //           return false;}
    //       }
    //       grid[i][j] = temp;
    //     }
    //   }
    // }
    // return true;
  }
  
  function checkSudoku(){
    if(checkSudokuHelper()){
      // alert("Is Solvable");
      toast.success("Is Solvable");
    }
    else{
      toast.error("Not Solvable!");
    }
  }
  function resetSudoku(){
    setSudoArr(initial);
    toast.success("Reset Complete!")
  }
  function canPlace(i,j,c,grid){
    for(let k=0;k<9;k++){
      if(grid[i][k]===c ){
        return false;
      }
      if(grid[k][j]===c){
        return false;
      }
      if(grid[3 * (Math.floor(i / 3)) + Math.floor(k / 3)][3 *( Math.floor(j / 3)) + k % 3] === c
    ){
        return false;
      }
    }
    return true;
  }
  function isSolvable(grid){
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if(grid[i][j]===-1){
          for(let c=1;c<=9;c++){
            if(canPlace(i,j,c,grid)){
              grid[i][j]=c;
              if(isSolvable(grid)){
                return true;
              }
              grid[i][j]=-1;
            }
          }
          return false;

        }
        else{
          const temp = grid[i][j];
          grid[i][j] = -1;
          for(let k = 0; k < 9; k++){
            // console.log("asdf");
            if(grid[i][k] === temp){ return false;}
            if(grid[k][j] === temp) {return false;}
            if(grid[3 * Math.floor(i / 3) + Math.floor(k / 3)][3 * Math.floor(j / 3) + k % 3] === temp) {
              console.log(grid[3 * Math.floor(i / 3) + Math.floor(k / 3)][3 * Math.floor(j / 3) + k % 3] ," ",i," ",j);
              return false;}
          }
          grid[i][j] = temp;

        }
      }
    }
    return true;
  }
  function solveSudoku(){
    const grid=getDeepCopy(sudoArr);
    if(isSolvable(grid)){
      setSudoArr(grid);
      toast.success("Solved!")
    }
    else{
      toast.error("Cannot be Solved! ")
    }
  }
  function getDeepCopy(arr){
    return JSON.parse(JSON.stringify(arr));
    // return arr;
  }
  const[sudoArr,setSudoArr]=useState(initial);
  function onInputChange(e,row,col){
  var val=parseInt(e.target.value)||-1, grid=getDeepCopy(sudoArr);
  console.log(initial);
  if(val===-1||(val>=1&&val<=9))
    {
    grid[row][col]=val;
    }
  setSudoArr(grid);
}


  return (
    <div className="App">
      <div className='App-header'>
        <h3>Sudoku Solver</h3>
        <table>
          <tbody>
            {
              [0,1,2,3,4,5,6,7,8].map((row,rIndex)=>{
                return <tr key={rIndex} className={(row+1)%3==0?'rborder':''}>
                  {/* {console.log(row);} */}
                  {
                    // console.log(row);
                    [0,1,2,3,4,5,6,7,8].map((col,cIndex)=>{
                      return <td key={rIndex+cIndex} className={(col+1)%3==0?'cborder':''}>
                        {/* {console.log(col," ",cIndex," ",row)} */}
                        <input onChange={(e)=>onInputChange(e,row,col)} value={sudoArr[row][col]=== -1?'':sudoArr[row][col]}className='cellInput'
                        disabled={initial[row][col]!==-1}></input>
                      </td>
                    })
                  }
                </tr>
              })
            }

          </tbody>
        </table>
        <div className='buttonContainer'>
          <button className='checkButton' onClick={()=>checkSudoku()}>Check</button>
          <button className='solveButton' onClick={()=>solveSudoku()}>Solve</button>
          <button className='resetButton' onClick={()=>resetSudoku()}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
