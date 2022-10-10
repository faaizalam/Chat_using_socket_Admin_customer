import React, { useContext } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import Alert from 'react-bootstrap/Alert';
import { Providsdata } from './Usercontext';
import { useSelector } from 'react-redux';

const Userlist = ({Alluser,isLoading,error}) => {
    // Alluser={Alluser} isLoading={isLoading} error={error}
    const {setuser}=useContext(Providsdata)
    const {Userinfo}=useSelector((state)=>state.UserSign)

const Selectuser=((x)=>{
    setuser(x)
})




  return (
    <div>
        {isLoading&&<Spinner></Spinner>}
        {error&&<Alert>{error}</Alert>}
        <div>
            {
                Alluser.filter((x)=>x._id!==Userinfo._id).map((x)=>(
                    <div  key={x._id}>

                    <div className='user'   onClick={()=>Selectuser(x)}>{x.email}</div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Userlist