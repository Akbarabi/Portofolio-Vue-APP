import { showErrorToast } from '@/helpers/alert';
import { useAuthStore } from '@/stores/pinia';
import axios from 'axios';

export function axiosInterceptors( ) {
    const auth = useAuthStore();

    axios.interceptors.request.use(config => {
        const token = auth.getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }

        config.headers['Accept'] = 'application/json';

        return config;
    }, error => {
        showErrorToast('Error', 'Terjadi kesalahan pada request');

        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        return response;
    }, async    error => {
        if(error.response && error.response.status === 403 && error.response.data.errors[0].includes("kadaluarsa")){
            await auth.refresh();
            window.location.reload();
        } else if (error.response && [403, 401].includes(error.response.status)) {
            // Menampilkan konfirmasi sebelum melakukan logout jika error 403 atau 401
            const confirmed = await showConfirmationDialog(
                'Ooops',
                error.response.data.errors[0] || 'Terjadi kesalahan pada response'
            );
            if (confirmed) {
                await auth.logout(); // Menghapus token dari Pinia store dan localStorage
                window.location.href = '/login'; // Memuat ulang halaman
            }
        } else {
            showErrorToast('Error', 'Terjadi kesalahan pada response'); // Menampilkan toast error untuk kesalahan lainnya
        }

        return Promise.reject(error);
    })
}
