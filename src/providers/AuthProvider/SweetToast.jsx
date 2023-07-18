import { createContext } from "react";
import Swal from "sweetalert2";


export const ToastContext = createContext(null);

// eslint-disable-next-line react/prop-types
const SweetToast = ({children}) => {
    const successToast = () => {
        return Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).fire({
                icon: 'success',
                title: 'Signed in successfully'
        })
    }
    // wrong credintial
    const wrongToast = () => {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Credentials',
            })
    }
    const wrongPurchase = () => {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Class already in the cart',
            })
    }

    const deleteToast = () => {
        return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton:true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            })

    }

    const updateToast = () => {
        return Swal.fire({
            title: 'Are you sure?',
            text: "You Can also update this classes later!",
            icon: 'info',
            showCancelButton:true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
            })

    }
    const addedToast = () => {
        // message your toy has been added
        return Swal.fire({
            icon: 'success',
            title: 'Your class has been added',
            showConfirmButton: false,
            timer: 1500
            })
    }
    const alertToast = () => {
        // message your toy has been added
        return Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).fire({
                icon: 'error',
                title: 'Fill all the fields'
        })
           

    }

    const ToastInfo={
        successToast,
        deleteToast,
        updateToast,
        addedToast,
        wrongToast,
        alertToast,
        wrongPurchase
    }

  return (
    <ToastContext.Provider value={ToastInfo}>
        {children}
        </ToastContext.Provider>
  )
}

export default SweetToast