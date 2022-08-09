import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { Detail } from './routes/Detail'
import { Cart } from './routes/Cart'
import axios from 'axios';
export let Context1 = createContext()


function App() {

  let [shoes, setShoes] = useState(data)
  let [abc] = useState([10, 11, 12])

  var navigator = useNavigate();

  let [count, setCount] = useState(1)
  let [moreBtn, setMoreBtn] = useState(true)
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])


  return (

    <div className='App'>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">DoroC</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigator('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigator('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg' />
            <div className="container">
              <div className="row">
                {
                  shoes.map(data => {
                    var num = data.id + 1;
                    return (
                      <Product id={data.id} num={num} title={data.title} content={data.content} />
                    )
                  })
                }
              </div>
            </div>

            {
              moreBtn == true ?
                <button onClick={() => {
                  setCount(count + 1)
                  console.log(count)
                  switch (count) {
                    case 1:
                      setLoading(true)
                      axios.get('https://codingapple1.github.io/shop/data2.json')
                        .then((result) => {
                          var shoesCopy = [...shoes, ...result.data]
                          setShoes(shoesCopy)
                          setLoading(false)
                        })
                        .catch(() => {
                          console.log('OMG')
                          setLoading(false)
                        })
                      break;
                    case 2:
                      setLoading(true)
                      axios.get('https://codingapple1.github.io/shop/data3.json')
                        .then((result) => {
                          var shoesCopy = [...shoes, ...result.data]
                          setShoes(shoesCopy)
                          setLoading(false)
                        })
                        .catch(() => {
                          console.log('OMG')
                          setLoading(false)
                        })
                      setMoreBtn(false)
                      break;
                    default:
                      break;
                  }
                }}>BTN</button>
                : null
            }
            {
              loading == true ? <Loading /> : null
            }



          </>} ></Route>

        <Route path='/detail/:id' element={
          <Context1.Provider value={{ abc }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        <Route path='/event' element={<Event />} >
          <Route path='one' element={<div>初めての注文し、10％割りクーポン</div>} />
          <Route path='two' element={<div>お誕生日クーポン</div>} />
        </Route>

        <Route path='/cart' element={<Cart />} ></Route>

        <Route path='/*' element={<div>ない</div>} />


      </Routes>

      {/* <div className='main-bg' /> */}
      {/* <div className="container">
        <div className="row">
          {
            // shoes.map(data => {
            //   var id = data.id + 1;
            //   var url = `https://codingapple1.github.io/shop/shoes${id}.jpg`;
            //   return (
            //     <div className="col-md-4">
            //       <img src={url} width="80%" />
            //       <h4>{data.title}</h4>
            //       <p>{data.content}</p>
            //     </div>
            //   )
            // })
          }
          {/* <Product id={1} title={shoes[0].title} content={shoes[0].content} />
          <Product id={2} title={shoes[1].title} content={shoes[1].content} />
          <Product id={3} title={shoes[2].title} content={shoes[2].content} /> */}

      {/* <div className="col-md-4">
            <img src='https://codingapple1.github.io/shop/shoes1.jpg' width="80%" />
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].content}</p>
          </div>
          <div className="col-md-4">
            <img src='https://codingapple1.github.io/shop/shoes2.jpg' width="80%" />
            <h4>{shoes[1].title}</h4>
            <p>{shoes[1].content}</p>
          </div>
          <div className="col-md-4">
            <img src='https://codingapple1.github.io/shop/shoes3.jpg' width="80%" />
            <h4>{shoes[2].title}</h4>
            <p>{shoes[2].content}</p>
          </div> */}

      {/* </div> */}
      {/* </div > */}

    </div >
  );
}

function Product(data) {
  var url = `https://codingapple1.github.io/shop/shoes${data.num}.jpg`
  var navigator = useNavigate();
  return (
    <div className="col-md-4">
      <img src={url} width="80%" onClick={() => { navigator(`/detail/${data.id}`) }} />
      <h4>{data.title}</h4>
      <p>{data.content}</p>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h2>今日のイベント</h2>
      <Outlet></Outlet>
    </div>
  )
}

function Loading() {
  return (
    <div>
      <p>Loading</p>
    </div>
  )
}


export default App;
