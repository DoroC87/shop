import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import styled from "styled-components";
import { Nav } from 'react-bootstrap';

import { Context1 } from '../App'
// let YellowBtn = styled.button`
// background : yellow;
// color : black;
// padding : 10px`
// let Box = styled.div`
// background : grey;
// padding : 20px`

import { useDispatch } from 'react-redux'
import { addItam } from "./../store.js"


function Detail(props) {

    let dispatch = useDispatch()

    let { abc } = useContext(Context1)

    let [count, setCount] = useState(2)
    let [alert, setAlert] = useState(true)
    let { id } = useParams();

    // 商品IDとパラメータの比較し、商品情報ピックアップ
    let product = props.shoes.find(element => element.id == id);

    // inputの値取得
    let [num, setNum] = useState('0')
    // inputの値の確認し、数字ではない場合のアラート
    let [alert2, setAlert2] = useState(true)

    // tabの表示設定
    let [tab, setTab] = useState(0)

    useEffect(() => {
        let timer = setTimeout(() => { setAlert(false) }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if (/^\d+$/.test(num)) setAlert2(false)
        else setAlert2(true)
        return () => {
            setAlert2(false)
        }
    }, [num])


    let [fade, setFade] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setFade('end')
        })

        return () => {
            setFade('')
        }
    }, [])

    // 最近見た商品をlocalStorageに保存
    useEffect(() => {
        // 過去の情報取得
        let watched = JSON.parse(localStorage.getItem('watched'))
        // 現在ページの情報追加
        watched.push(product)
        // 重複データ確認
        watched = [...new Set(watched.map(JSON.stringify))].map(JSON.parse);
        // localStorageに保存
        localStorage.setItem('watched', JSON.stringify(watched))
    }, [])

    return (
        <div className={`start ${fade}`} >
            <div className="container">
                {
                    alert == true ?
                        <div className="alert alert-warning">
                            2秒以内に購入し、割引！！
                        </div> : null
                }

                <div className="row">
                    <div className="col-md-6">
                        <img src={"https://codingapple1.github.io/shop/shoes" + (product.id + 1) + ".jpg"} width="100%" />
                    </div>
                    <div className="col-md-6">
                        {
                            alert2 == true ?
                                <div className="alert alert-warning">
                                    数字のみ入力してください
                                </div> : null

                        }
                        <input onChange={e => {
                            setNum(e.target.value)
                        }}></input>
                        <h4 className="pt-5">{product.title}</h4>
                        <p>{product.content}</p>
                        <p>{product.price}원</p>
                        {/* <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}원</p> */}
                        <button className="btn btn-danger" onClick={() => { dispatch(addItam({ id: product.id, name: product.title, count: 1 })) }}>주문하기</button>
                    </div>
                </div>

                <Nav variant="tabs" defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link eventKey="link0" onClick={() => { setTab(0) }}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link1" onClick={() => { setTab(1) }}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link2" onClick={() => { setTab(2) }}>버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab={tab} />




            </div>
        </div>
    )
}

function TabContent(props) {

    let [fade, setFade] = useState('')

    let { abc } = useContext(Context1)

    useEffect(() => {
        setTimeout(() => {
            setFade('end')
        }, 100)

        return () => {
            setFade('')
        }
    }, [props.tab])

    return (
        < div className={"start " + fade}>{
            [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]

        }</div>)


    // if (props.tab == 0) return <div>내용0</div>
    // if (props.tab == 1) return <div>내용1</div>
    // if (props.tab == 2) return <div>내용2</div>
}

export { Detail }