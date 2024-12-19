import axios from 'axios';
import Swal from 'sweetalert2';
import baseUrl from '.';

export const notification = ({ message = 'Saved', icon = 'success' }) => {
    Swal.fire({
        // position: "top-end",
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

export const ConfirmDelete = ({ path = '' }) => {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
    }).then(async (result) => {
        /* Read more about isConfirmed */
        if (result.isConfirmed) {
            try {
                const res = await axios.delete(`${baseUrl}${path}`);
                console.log(res);

                if (res.status === 200) {
                    notification({ message: 'Your file has been deleted.' });
                }
            } catch (error) {
                console.error('Error deleting:', error);
                notification({ message: 'Failed to delete the file.', icon: 'error' });
            }

            /* Read more about handling dismissals below */
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            notification({ message: 'Your file is safety.!' })
        }
    });
}



