import React from 'react';
import './App.css';
import cv from 'opencv-ts';

const App = () => {
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = new Image()
      img.onload = () => {
        const mat = cv.imread(img)
        cv.imshow('output', mat)
        mat.delete()
      }
      img.src = URL.createObjectURL(e.target.files[0])
    }
  }

  const canvas = document.getElementById("output")

  const onMouseMoveInImg = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getClientRects().item(0)
    const x = e.clientX - rect!.left
    const y = e.clientY - rect!.top
    // console.log(`${x}:${y}`)
    // console.log('hello')
  }

  return (
    <div className="App">
      <div>
        <input type="file" onChange={onChangeFile} />
      </div>
      <canvas id="output" onMouseMove={onMouseMoveInImg} />
    </div>
  )
}

export default App