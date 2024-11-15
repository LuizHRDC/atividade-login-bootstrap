const formLogin = document.getElementById("form-login");
const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("password-login");

// Alerts
const successAlert = document.getElementById("success-alert-login");
const errorAlert = document.getElementById("error-alert-login");

(() => {
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const data = {
            email: emailLogin.value,
            password: passwordLogin.value
        };
        
        try {
            const response = await api.post('/login', data);

            if(response.status === 200) {
                localStorage.setItem('userEmail', response.data.email);
                
                successAlert.classList.remove('d-none');
                errorAlert.classList.add('d-none');
                
                setTimeout(() => {
                    window.location.href = 'notes.html';
                }, 3000);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.error ?? 'Erro ao fazer login. Por favor, tente novamente.';
            errorAlert.innerText = errorMessage;
            successAlert.classList.add('d-none');
            errorAlert.classList.remove('d-none');
        }
    });
})();