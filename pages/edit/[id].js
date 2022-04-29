import axios from 'axios';
import Link from 'next/link'
import { useState } from "react";
import Head from 'next/head'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Edit = () => {


  const [img, setImg] = useState([])

  const [editSwitch, setEditSWitch] = useState(true)

 const [name , setName] = useState('')
 
 const [edit, setEdit] = useState(false)

 const [imgEdit, setImgEdit] = useState( '')

  const {id} = useRouter().query;

 useEffect(() => {
  const getUser = async (id) => {
    const response = await fetch('/api/'+id)
    const data = await response.json()
    if(data.user.length > 0) {
      setName(data.user[0].name)
      setImgEdit(data.user[0].img)
      setImg(data.img)
    }
  } 
      getUser(id)
 },[id])

  const changeEditSwitch = () => {
    setEditSWitch(!editSwitch)
  }

  const changeName = (e) => {
    setName(e.target.value)
  }

  const update = async () => {

    const user = {
      name:name,
      img:imgEdit,
      id:id
    }

   const updateUser = await axios.post('/api/'+ user.name, user)
    if(updateUser.data) {
      window.history.go(-1)
    }
  }

  return (
    <div className="editUser">
      <Head>
        <title>Edit User</title>
      </Head>
         <nav className="editNav">

            <div className="editBack">
              <div>
                <span>
                  <Link href={'/' }>
                        <img src="/back.svg" alt="" />
                  </Link>
                </span>
                <h2>Change Perfil</h2>
              </div>
            </div>

            <div className="editCheck">
              <div>
                <span>
                  <img src="/check.svg" alt="" onClick={update} />
                  <a onClick={update} >Guardar</a>
                </span>
                <span>
                  <img src="/trash.svg" alt="" />
                  <a>Eliminar</a>
                </span>
              </div>
            </div>

         </nav>

         <div className="editUserBody">

            <div id="editUserBody">

                <div>
                  <div className="editUserImg">
                       <img src={imgEdit} alt="" />
                       <div className='editUserEdit'>
                         <img src="/edit.svg" alt="" onClick={()=> setEdit(!edit)}/>
                       </div>
                       <div id={edit ? 'editUserImg': ''}>
                            {img && img.map(img => (
                                <span key={img}>
                                      {edit && <img src={img} alt={"user name" + img} data-key={img} onClick={(e)=> {
                                        setImgEdit(e.target.dataset.key)
                                        setEdit(false)
                                      }} />}
                                </span>
                            ))}
                       </div>
                  </div>

                </div>
                
                <div className='editUserInput' autoFocus>
                    <input type="text"  value={name} onChange={changeName}/>

                    <div className="switch">
                        <div id="switch">
                            <span>
                               {editSwitch && <img src="/switchOff.svg" alt="" onClick={changeEditSwitch}/>}
                            </span>

                            <span>
                                {!editSwitch && <img src="/switchOn.svg" alt=""  onClick={changeEditSwitch}/>}
                            </span>
                        </div>
                        <div className="switchKid">
                           <a>Kids ?</a>
                        </div>
                    </div>

                </div>
            </div>
         </div>
    </div>
  );
}

export default Edit;