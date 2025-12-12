import React, { useEffect, useState } from 'react'
import { SquarePen, Trash2, UserPlus } from 'lucide-react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const UserTable = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responce = await axios.get("http://localhost:8000/api/users");
                setUsers(responce.data);
            } catch (error) {
                console.log("Error While Fetching data. ", error)
            }
        };
        fetchData();
    }, []);

    const deleteUser = async (userId)=>{
        await axios.delete(`http://localhost:8000/api/delete/user/${userId}`)
        .then((responce)=> {
            setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId));  
            toast.success(responce.data.message, {position: "top-right"})
        })
        .catch((error)=> {
            console.log(error)
        });
    }
     

    return (
        <>
            <div className="container py-5">
                <Link to='/add' className="btn btn-sm btn-primary px-3 py-1 my-4">
                    <span className='fw-semibold'>Add User</span>&nbsp; <UserPlus color="white" size={20} />
                </Link>
                
                {users.length===0?
                <div className='container text-center fw-medium fs-3 text-secondary'>No Records</div> : 
                <table className="table table-bordered shadow-sm" style={{ fontSize: "18px" }}>
                    <thead className="table-success text-center">
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((users, index) => {
                            return (
                                <tr className="text-center" key={users._id}>
                                    <td>{index + 1}</td>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.address}</td>

                                    <td className="text-center">
                                         <Link to={`/update/`+users._id} className="btn btn-sm btn-success me-4">
                                            <SquarePen color="white" size={20} />
                                        </Link>
                                        
                                        <button onClick={()=>deleteUser(users._id)} className="btn btn-sm btn-danger">
                                            <Trash2 color="white" size={20} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
}
            </div>
        </>
    )
}

export default UserTable
