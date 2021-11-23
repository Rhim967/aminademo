import React, {useState}  from 'react'
import { Form, Button } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

function SearchBox () {

    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            console.log(keyword)
            history.push(`/?keyword=${keyword}&page=1`)
        }else{
            history.push(history.push(history.location.pathname))
        }
    }

    return (
        <Form  onSubmit={submitHandler} >
            <Form.Control
                style={{display:'inline-block', width: 'auto'}}
                size='sm'
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            >
            </Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-1 m-2'
            >
                Submit
            </Button>
        </Form> 
    )
}

export default SearchBox
 
