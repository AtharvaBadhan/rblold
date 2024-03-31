import React from 'react'
import * as styles from "../RequestTags/request.module.css";
import { useForm } from "react-hook-form";
import { WHITE_LOGO } from "../../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRequestPay = () => {
    return (
        <div className='primaryBgColor'>
            <div className={`container ${styles.conCo}`}>

                <Header />
                <Hr />
                <RequestPayForm />

            </div>

        </div>
    )
}



const RequestPayForm = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            TagId: null,
            Tid: null,
            VehicleNo: null,
            Note: null
        }
    });


    const onSubmit = (data) => {
        if (data.TagId || data.Tid || data.VehicleNo) {
            toast.success('Request Pay Added Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(data)
            return <Redirect to='/addRequestPay' /> // redirecting to Add Request Pay Page 
        }
        else {
            toast.error('Please Enter atleast one of these TagId, Tid , VehicleNo fields', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    const resetForm = () => {
        reset(); //handle reset 
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={`mt-3`}>

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <div className="row">

                    <div className="col-12 col-md-12 pb-3 pb-md-4 px-4 pt-5">
                        <div className={`${styles.text1} primaryColor2`}>
                            Kindly fill the details
                        </div>
                    </div>

                    <div className="col-12 col-md-6 px-4">
                        <div className={`${styles.formInput} form-group mb-3`}>
                            <label> TagId </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter TagId"
                                {...register("TagId")}
                            />

                        </div>
                    </div>

                    <div className="col-12 col-md-6 px-4">
                        <div className={`${styles.formInput} form-group mb-3`}>
                            <label> Tid </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the Tid"
                                {...register("Tid")}
                            />

                        </div>
                    </div>

                    <div className="col-12 col-md-6 px-4">
                        <div className={`${styles.formInput} form-group mb-3`}>
                            <label> VehicleNo </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter VehicleNo"
                                {...register("VehicleNo")}
                            />


                        </div>
                    </div>

                    <div className="col-12 col-md-6 px-4">
                        <div className={`${styles.formInput} form-group mb-3`}>
                            <label> Note </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter a Note"
                                {...register("Note")}
                            />

                        </div>
                    </div>

                    <div className="row">
                        <div className="pointer col-12 col-md-4 offset-md-4 pt-4 px-4">
                            <button type="submit" className={styles.submitBtn}>
                                Submit{" "}
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="pointer col-12 pb-5 col-md-4 offset-md-4 pt-4 px-4">
                            <div onClick={resetForm} className={styles.resetBtn}>
                                Reset{" "}
                            </div>
                        </div>
                    </div>

                </div>



            </form>
        </div>
    )

}




























const Hr = (props) => {
    return (
        <div className="row">
            <div className="col-12 px-4">
                <hr className={styles.whiteHr} />
            </div>
        </div>
    );
};

const Header = (props) => {
    let history = useHistory();
    return (
        <div className="row primaryBgColor sticky-top">
            <div className="row">
                <div className="col-12 d-flex justify-content-center justify-content-md-start">
                    <img src={WHITE_LOGO} className={`${styles.icon} img-responsive`} />
                </div>
            </div>
            <div className="col-12 px-4 pb-2">
                <div
                    role="presentation"
                    onClick={() => history.goBack()}
                    className="pointer"
                >
                    <FontAwesomeIcon color={"#ffffff"} size="lg" icon={faAngleLeft} />
                    <span className={`${styles.breadCrumb} ps-2`}> Dashboard </span>
                </div>
            </div>
        </div>
    );
};


export default AddRequestPay