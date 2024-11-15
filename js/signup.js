document.addEventListener('DOMContentLoaded', () => {
    const modalSignup = document.getElementById('modal-signup');

    const bootstrapModal = new bootstrap.Modal(modalSignup);

    const signupButton = document.querySelector('[data-bs-toggle="modal"]');
    signupButton.addEventListener('click', () => {
        bootstrapModal.show();
    });

    const formSignup = document.getElementById('form-signup');
    formSignup.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rePassword = document.getElementById('re-password').value;
        
        if (password !== rePassword) {
            document.getElementById("error-alert-signup").classList.remove('d-none');
            document.getElementById("error-alert-signup").innerText = "As senhas não coincidem.";
            return;
        }

        const data = { name, email, password };
        
        try {
            const response = await api.post('/signup', data);
            
            if (response.status === 200 || response.status === 201) {
                document.getElementById("success-alert-signup").classList.remove('d-none');
                document.getElementById("error-alert-signup").classList.add('d-none');
                
                setTimeout(() => {
                    bootstrapModal.hide();
                    formSignup.reset();
                }, 3000);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.error ?? 'Erro ao cadastrar usuário. Tente novamente.';
            document.getElementById("error-alert-signup").innerText = errorMessage;
            document.getElementById("success-alert-signup").classList.add('d-none');
            document.getElementById("error-alert-signup").classList.remove('d-none');
        }
    });
});
