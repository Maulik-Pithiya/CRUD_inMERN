import { ChevronsLeft } from 'lucide-react';
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from 'axios';
import toast from 'react-hot-toast';


const Update = () => {
 
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const {id} = useParams();

    useEffect(() => {
        axios.get(`https://crud-nn05.onrender.com/api/user/${id}`)
            .then((response) => {
                 reset(response.data);
            })
            .catch((error)=>{
                console.log(error)
            })
    }, [id , reset]);
  

  const submitForm = async (data) => {
    // console.log(data)  
    await axios.put(`https://crud-nn05.onrender.com/api/update/user/${id}`, data)
      .then((response) => {
        // console.log("User Created Successfully.");
        toast.success("User updated Successfully" , {position: "top-right"});
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message , {position: "top-right"});
      })
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>

        <div className="d-block ">
          <Link to='/' className="btn btn-outline-primary px-3 py-1 my-4">
            <ChevronsLeft size={18} /> <span className='fw-semibold '>Back</span>
          </Link>
        </div>

        <h4 className="mb-3 text-center">Update User</h4>
        <form onSubmit={handleSubmit(submitForm)}>
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              {...register("name")}
              
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
              required
            />
          </div>

          {/* Address Field */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className="form-control"
              id="address"
              rows="3"
              placeholder="Enter your address"
              {...register("address")}
              required
            ></textarea>
          </div>


          <button disabled={isSubmitting} className="btn btn-primary w-100">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Update
