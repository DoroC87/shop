import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { changeName, changeAge } from "./../store/userSlice"
import { addCount, minusCount, delItam } from "./../store.js"
import { memo, useState, useTransition } from 'react'

let Child = memo(function () {
    console.log('Landering')
    return <div>子供</div>
})

let a = new Array(10000).fill(0)
function Cart() {

    let state = useSelector((state) => state)
    let dispatch = useDispatch()
    let [name, setName] = useState()
    let [isPending, startTransition] = useTransition()

    return (
        <div>
            <Child />
            <input onChange={e => {
                startTransition(() => {
                    setName(e.target.value)
                })
            }} />{
                a.map(() => <div>{name}</div>)
            }
            {state.user.name} {state.user.age}のもの
            <button onClick={() => dispatch(changeAge(100))}>BTN</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>削除する</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((data, i) =>
                            <tr kry={i}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.count}</td>
                                <td><button onClick={() => {
                                    dispatch(addCount(data.id))
                                }}>+</button>
                                    <button onClick={() => {
                                        dispatch(minusCount(data.id))
                                    }}>-</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(delItam(data.id))
                                    }}>削除</button>
                                </td>
                            </tr>
                        )

                    }
                </tbody>
            </Table>
        </div>
    )
}



export { Cart }